# Skill: brain-add-page
> Tworzy nową notatkę wiki we właściwym folderze według standardowego szablonu i automatycznie linkuje ją z Mapy Zawartości (MOC) danej domeny.

## Uruchomienie
`/brain-add-page --title "<Tytuł>" --domain "<kategoria>"` — Argumenty: `$ARGUMENTS`.

## Procedura
1. **Nazwa pliku**: Zamień tytuł na małe litery, zastąp spacje myślnikami (kebab-case), usuń polskie znaki diakrytyczne (np. `ą` → `a`, `ę` → `e`, `ł` → `l` itp.) dla kompatybilności ścieżek URL (np. `Rosyjskie drony` → `rosyjskie-drony.md`).
2. **Lokalizacja**: Utwórz plik w `wiki/<domain>/<nazwa-pliku>.md` (np. `wiki/analiza/rosyjskie-drony.md`).
3. **Szablon**: Wpisz domyślną strukturę:
   ```markdown
   # <Tytuł Notatki>
   
   > Krótki opis (jedno zdanie) celu i zawartości tej notatki.
   
   ## Kontekst i Dane wejściowe
   - Powiązane wpisy: [[index]]
   
   ## Stan wiedzy / Ustalenia
   - Zapisuj fakty z datami, np. `- **[2026-08-03]** Pierwsze ustalenie.`
   
   ## Otwarte Kwestie
   - [ ] Co pozostało do zbadania
   ```
4. **Rejestracja w MOC**: Otwórz plik `wiki/<domain>/index.md` (lub `wiki/<domain>/MOC.md`) i dopisz relatywny link do nowo utworzonego pliku.
