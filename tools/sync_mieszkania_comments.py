#!/usr/bin/env python3
"""Copy latest per-listing notes from the Pigulla feedback sheet into both CSVs."""
import csv
import json
import re
import urllib.request
from pathlib import Path

ENDPOINT = 'https://script.google.com/macros/s/AKfycbxDCHUE8sx7QxCZe7c4LKZZ6f7RRykXUvLleGtwkyTGc-j5Ab9oOpuMDbpg1JDXGBemhg/exec?cb=mieszkania-sync'
SOURCES = {
    'purchase': Path('/home/rafal-ai/Downloads/rynek_kupna_mieszkan.csv'),
    'rental': Path('/home/rafal-ai/Downloads/rynek_najmu_zabrze_sosnowiec.csv'),
}
PATTERN = re.compile(r'^\[MIESZKANIA\]\[(purchase|rental)\]\[(.+)\]$')


def comments():
    request = urllib.request.Request(ENDPOINT, headers={'User-Agent': 'MieszkaniePolska sync'})
    with urllib.request.urlopen(request, timeout=30) as response:
        entries = json.loads(response.read().decode('utf-8'))
    latest = {}
    for item in entries:
        match = PATTERN.match(str(item.get('newsTitle', '')))
        if not match:
            continue
        key = (match.group(1), match.group(2))
        if key not in latest or str(item.get('timestamp', '')) > str(latest[key].get('timestamp', '')):
            latest[key] = item
    return latest


def update(path, market, latest):
    with path.open(encoding='utf-8-sig', newline='') as handle:
        reader = csv.DictReader(handle, delimiter=';')
        fields = reader.fieldnames or []
        rows = list(reader)
    malformed = [row.get('listing_id', '<unknown>') for row in rows if row.get(None)]
    if malformed:
        raise RuntimeError(f'{path.name} has malformed rows; repair before comment migration: {", ".join(malformed)}')
    if 'my_comment' not in fields:
        fields.append('my_comment')
    changed = 0
    for row in rows:
        item = latest.get((market, row.get('listing_id', '')))
        if item and row.get('my_comment') != item.get('comment', ''):
            row['my_comment'] = item.get('comment', '')
            changed += 1
    temporary = path.with_suffix(path.suffix + '.tmp')
    with temporary.open('w', encoding='utf-8-sig', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, delimiter=';', extrasaction='ignore')
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(path)
    return changed


def main():
    latest = comments()
    for market, path in SOURCES.items():
        print(f'{path.name}: {update(path, market, latest)} comment(s) updated')


if __name__ == '__main__':
    main()
