# Geopiguła Brain Status

## Active Focus
- Daily news cycle continues via OpenClaw. MieszkaniePolska is now a second,
  published dashboard module with active maintenance.

## System Health — 2026-08-03
| Component | Status | Notes |
|:---|:---|:---|
| **Brain folder** | ✅ Healthy | `brain/` created inside repo root — matches OmniSquash layout |
| **wiki/** | ✅ Present | Moved inside `brain/`, index created |
| **journal/** | ✅ Active | Moved inside `brain/`, all past entries preserved |
| **skills/** | ✅ New | `brain-sync`, `brain-harvest`, `brain-lint`, `brain-add-page` added |
| **agents.md** | ✅ Updated | Moved to `brain/`, rewritten in English |
| **CLAUDE.md** | ✅ Updated | Rewritten in English, points to `brain/index.md` |
| **Language** | ✅ English | All schema/skill/index files in English; daily journal entries remain in Polish (user-facing content) |
| **GitHub** | ✅ Pushed | All changes pushed to `czariaiai-cell/my-news-feed` (`main`) |

## Key Decisions Made
- **[2026-08-03]** Brain folder restructured: `wiki/`, `journal/`, `.obsidian/`, `skills/`, `agents.md`, `STATUS.md` all live inside `brain/` — project root contains only app code and output files (`index.html`, `news.html`, `land/`, `tools/`, `raw/`).
- **[2026-08-03]** `CLAUDE.md` in the repo root is a thin pointer only — all real context lives in `brain/`.
- **[2026-08-03]** All schema, skill, and index files written in English. Daily journal reports (`journal/YYYY-MM-DD.md`) remain in Polish as they are user-facing content.
- **[2026-08-03]** Symlinked into Master Brain Obsidian vault at `~/MojAgentAI/brain/projects/Pigulla News/brain` for unified cross-project view.

## Current State — 2026-09-03
- **MieszkaniePolska dashboard:** ✅ published from `main` on GitHub Pages;
  purchase and rental views load from `data/mieszkania.json` and render before
  remote comments finish loading.
- **Data freshness:** ✅ dashboard data exporter uses active-only `new today`
  counts and bypasses stale browser snapshot caching.
- **Per-listing comments:** ✅ Google Sheets-backed comments and optional
  browser dictation are live; local-browser fallback is enabled.
- **CSV comment mirror:** ⏸️ intentionally blocked until two malformed legacy
  purchase rows are repaired; the sync tool fails safely rather than dropping
  data.
- **Access control:** ⚠️ a remembered client-side password gate is live but is
  not real confidentiality on public GitHub Pages.

## Backlog / Tech Debt
- Repair the two malformed legacy purchase CSV rows, then run the comment
  schema migration and synchronizer.
- Rotate the GitHub token embedded in the local `origin` URL and replace it
  with a credential-free remote URL.
- When confidentiality is required, move the site and data behind real
  authenticated hosting; do not treat the client-side gate as protection.
