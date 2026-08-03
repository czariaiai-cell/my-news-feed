# Skill: brain-harvest
> Synthesizes discoveries from the current session into the Geopiguła wiki notes and journal.
> Implements the "Knowledge Tax" protocol — no session's learnings are lost.

## Trigger
`/brain-harvest` — Arguments: `$ARGUMENTS` (optional `--file <wiki_note>` to harvest to a specific note only).

## What This Does
1. Reviews the conversation for new geopolitical facts, design decisions, crawler/model test outcomes, and user preferences.
2. Routes discoveries to the correct wiki domain under `wiki/`.
3. **Reads and updates the specific wiki notes** — this is the primary output.
4. Updates the daily log in `journal/` and the [[../STATUS]] last, as a summary.

## Step 1 — Review Session for Discoveries
- **Verified facts**: confirmed specs, sources, API endpoints.
- **Design decisions**: architectural choices, scraper/renderer updates.
- **Test outcomes**: run outcomes, credit limits/errors (e.g. Claude credit errors).
- **User preferences**: new guidelines for geopolitics, technology, or style.

## Step 2 — Update Each Wiki Note (MANDATORY)
- For each target: read it; avoid duplicates; **overwrite stale sections in place** (never append next to conflicting information).
- Formatting:
  - Invariant/fact: `- **[<date>]** <precise finding, one or two sentences.>`
  - Decision: `### <topic> — DECIDED <date>` + explanation of what/why.

**Obsidian Rules (Hard Requirements):**
- Wikilinks are **relative paths** (`[[../wiki/category/index]]`, `[[note]]` for same folder).
- Never wrap an active wikilink in backticks (e.g. ` `[[link]]` `).
- All notes must be written in **English** as per the linguistic policy.

## Step 3 — Journal + STATUS (summaries, last)
- Append summary to `journal/<today>.md`.
- Update [[../STATUS.md]] (current agent focus, debt).
