#!/usr/bin/env python3
"""Export the two local MieszkaniePolska CSV histories for the static dashboard."""

import csv
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path('/home/rafal-ai/Downloads')
SOURCES = {
    'purchase': DOWNLOADS / 'rynek_kupna_mieszkan.csv',
    'rental': DOWNLOADS / 'rynek_najmu_zabrze_sosnowiec.csv',
}


def read_csv(path):
    with path.open(encoding='utf-8-sig', newline='') as handle:
        return list(csv.DictReader(handle, delimiter=';'))


def active(rows):
    return [row for row in rows if row.get('status') == 'active']


def number(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def median(values):
    values = sorted(values)
    if not values:
        return None
    middle = len(values) // 2
    return values[middle] if len(values) % 2 else round((values[middle - 1] + values[middle]) / 2, 2)


def newest(rows, field='first_seen'):
    return [row for row in rows if row.get(field) == str(date.today())]


def main():
    purchase = read_csv(SOURCES['purchase'])
    rental = read_csv(SOURCES['rental'])
    purchase_active = active(purchase)
    rental_active = active(rental)
    purchase_prices = [number(row['asking_price_pln']) for row in purchase_active]
    purchase_prices = [value for value in purchase_prices if value is not None]
    rental_rates = [number(row['rent_per_m2_pln']) for row in rental_active]
    rental_rates = [value for value in rental_rates if value is not None]
    ranked = sorted(
        (row for row in purchase_active if number(row.get('ranking_score')) is not None),
        key=lambda row: number(row['ranking_score']), reverse=True,
    )

    payload = {
        'generated_at': str(date.today()),
        'source': 'MieszkaniePolska CSV snapshot',
        'purchase': purchase,
        'rental': rental,
        'summary': {
            'purchase': {
                'total': len(purchase), 'active': len(purchase_active),
                'new_today': len(newest(purchase)),
                'median_price_pln': median(purchase_prices),
                'top_candidate_id': ranked[0]['listing_id'] if ranked else None,
            },
            'rental': {
                'total': len(rental), 'active': len(rental_active),
                'new_today': len(newest(rental)),
                'median_owner_rent_per_m2_pln': median(rental_rates),
            },
        },
    }
    output = ROOT / 'data' / 'mieszkania.json'
    output.parent.mkdir(exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Wrote {output}: {len(purchase)} purchase / {len(rental)} rental records')


if __name__ == '__main__':
    main()
