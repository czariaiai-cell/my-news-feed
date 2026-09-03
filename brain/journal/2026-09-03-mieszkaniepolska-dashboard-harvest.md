# 2026-09-03 — MieszkaniePolska Dashboard Harvest

## Recorded decisions

- Published the cross-project MieszkaniePolska dashboard on GitHub Pages.
- Established the CSV-to-JSON export as the only static-site data path.
- Added active-only new-listing status/filter semantics and stale-cache
  bypassing.
- Added Google Sheets-backed per-listing notes, Polish browser dictation and
  a local fallback.
- Added a remembered client-side password gate at the user's request, with an
  explicit record that it is not server-side confidentiality.

## Follow-up

See [[../wiki/mieszkaniepolska-dashboard]] for architecture, known limits and
the safe CSV-comment synchronization boundary.

Back to [[index|Journal MOC]].
