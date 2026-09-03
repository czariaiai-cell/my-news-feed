# MieszkaniePolska Dashboard

## Purpose

The Pigulla News repository now also publishes a dedicated MieszkaniePolska
dashboard. It is a read-only public projection of the local purchase and
rental CSV histories, designed for fast offer review and concise daily market
interpretation.

## Architecture — DECIDED 2026-09-03

- The authoritative CSV histories remain outside this repository in
  `/home/rafal-ai/Downloads/`.
- `tools/sync_mieszkania_data.py` exports both histories into
  `data/mieszkania.json` for the static dashboard.
- The published entry point is `mieszkania.html`; the separate views are
  `mieszkania-kupno.html` and `mieszkania-najem.html`.
- The dashboard links directly to the source listing, distinguishes active
  from uncertain records, and explicitly marks a record as `new today` only
  when it is active and its `first_seen` equals the snapshot date.
- The top-level `new today` count uses the same active-only rule as the filter.

## User-facing analysis

Purchase and rental pages each present:

- a concise daily decision panel based on the snapshot;
- active/new/uncertain counts;
- search and status filters, including `new today` only;
- sortable offer cards with core economics, verification caveats and source
  links;
- a clear distinction between owner-rent and combined monthly rental amounts.

The analysis must not claim a market trend when the observation history is too
short or when listings have only been newly recorded in the database.

## Per-listing comments — DECIDED 2026-09-03

- Each offer card has an editable `My comment` field and browser speech-to-text
  for Polish dictation where the browser supports the Web Speech API.
- A saved comment is written to the existing Google Sheets feedback endpoint
  under a stable `[MIESZKANIA][market][listing_id]` identity. It is therefore
  persistent and reloadable without putting a credential in the static site.
- Text is also retained locally in the browser before remote save succeeds.
- `tools/sync_mieszkania_comments.py` is prepared to write the newest remote
  comment into a `my_comment` column in the source CSVs. It intentionally
  stops if malformed CSV rows are found, rather than rewriting and losing
  fields. Two existing purchase rows require controlled repair first.

## Publication and security

- The dashboard was published to GitHub Pages from `main` in commits
  `8cf31b6`, `f1e12b7`, `5543508`, `2522569`, `eb9c755`, `79dbc4a` and
  `b6fb290` (plus later maintenance commits).
- A remembered client-side password gate was added at the user's request. It
  is a deterrent against casual access only: GitHub Pages, source HTML and the
  JSON projection are still publicly retrievable by a technical user.
- Real protection requires moving the full site/data behind authenticated
  hosting, such as Cloudflare Access, and making the repository private.
- The local Git remote URL previously contained an embedded access token.
  Rotate/revoke it and replace the remote with a credential-free URL before a
  future security hardening pass.

Back to [[index|Wiki MOC]].
