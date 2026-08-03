# Skill: brain-add-page
> Creates a new wiki note in the correct folder using a standard template and automatically registers it in the domain's Map of Content (MOC).

## Trigger
`/brain-add-page --title "<Title>" --domain "<category>"` — Arguments: `$ARGUMENTS`.

## Procedure
1. **Filename**: Convert title to lowercase, replace spaces with hyphens (kebab-case), and remove special characters (e.g. `Russian drones` ➔ `russian-drones.md`).
2. **Location**: Create the file under `wiki/<domain>/<filename>.md` (e.g. `wiki/analysis/russian-drones.md`).
3. **Template**: Populate the file with standard template layout:
   ```markdown
   # <Note Title>
   
   > Short description (one sentence) of the purpose and contents of this note.
   
   ## Context & Inputs
   - Related: [[index]]
   
   ## Current Understanding / Findings
   - Record dated findings, e.g. `- **[2026-08-03]** Initial discovery.`
   
   ## Open Items
   - [ ] What remains to be researched
   ```
4. **MOC Registration**: Open `wiki/<domain>/index.md` (or `wiki/<domain>/MOC.md`) and append a relative link to the newly created page.
