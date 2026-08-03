# Skill: brain-lint
> Checks all notes for broken relative wikilinks, orphans, and structural health.

## Trigger
`/brain-lint` — Arguments: `$ARGUMENTS`.

## Step 1 — Link and File Validation
- Links must be **relative paths** from the containing note (e.g., `[[../wiki/category/index|label]]`, `[[note]]`).
- A link resolves if `<resolved>` or `<resolved>.md` exists in the vault.
- Links wrapped in backticks (e.g., ` `[[...]]` `) are treated as code syntax examples and skipped.
- **Orphan notes:** every note (except `index.md`, `STATUS.md`, templates) must be targeted by at least one link from another note.

## Step 2 — Health Score
```
score = 100 * (1 - (broken + 0.5*orphans + 2*incomplete) / total_notes)
```
- ≥95 ✅ healthy vault · 85–94 ⚠️ needs attention · <85 ❌ significant documentation debt.
- **Incomplete note:** missing `# Title`, no `##` sections, <5 lines, or containing raw `TODO`/`[TBD]` placeholders.

## Step 3 — When to Run
- After adding, renaming, or moving notes.
- At the end of a working session before closing.
- Update the health score in [[../STATUS.md]] after runs.
