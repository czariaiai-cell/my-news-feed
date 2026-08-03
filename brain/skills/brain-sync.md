# Skill: brain-sync
> Audits the vault's internal consistency (wiki, journal, skills) and reports drift/discrepancies.

## Trigger
`/brain-sync [--file <name>]` — Arguments: `$ARGUMENTS`.

## Step 0 — Skills-Layer Consistency
- Every `brain/skills/*.md` file (except index) must have a matching command stub in the repository's `.claude/commands/<name>.md` (if applicable) → otherwise report `❌ MISSING STUB`.

## Step 1 — Vault Structural Consistency
- **MOC Coverage:** every note in a `wiki/` subdirectory must be linked from that domain's `index.md`; every domain MOC must be linked from the main [[../index]].
- **Journal Archive:** every daily log in `journal/` must be linked from the journal index [[../journal/index]].
- **STATUS Freshness:** items in the [[../STATUS]] active focus list must reference existing notes.

## Step 2 — Report
```
BRAIN SYNC REPORT — <date>
Checked: skills layer, MOC indexes, journal, status.
✅ In Sync: <list>
⚠️ Drift: <file → findings>
Recommended: run /brain-harvest with these findings.
```
