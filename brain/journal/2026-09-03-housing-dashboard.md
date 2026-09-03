# 2026-09-03 — MieszkaniePolska Dashboard

## Delivered

- Added a **Mieszkania Polska** entry point to the Pigulla News navigation.
- Added separate static pages for [[../mieszkania-kupno|purchase]] and
  [[../mieszkania-najem|rental]]. Each page has a succinct daily-analysis
  panel, active/uncertain status separation, search, sorting and direct links
  to the original listings.
- Added `tools/sync_mieszkania_data.py`, which turns the two authoritative CSV
  histories in `/home/rafal-ai/Downloads/` into the deployable
  `data/mieszkania.json` snapshot.
- Updated the `mieszkanie-market-update` skill: every completed CSV refresh
  must export this dashboard snapshot and validate the JSON.

## Data policy

The dashboard renders the raw fields from the current CSV snapshot. It labels
automatically fetched pages separately from uncertain records and does not turn
combined rental amounts into owner-rent-per-square-metre metrics.

## Verification

- Export completed with 18 purchase and 32 rental records.
- JavaScript syntax and exported JSON validity were checked locally.

## Follow-up reminder

Before deployment, rotate the GitHub token embedded in the local remote URL,
replace it with a credential-free remote URL, and verify the GitHub Pages or
other deployment target. No commit or push was made during this work.

Back to [[index|Journal MOC]].
