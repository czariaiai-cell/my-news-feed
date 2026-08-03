# Skill: brain-sync
> Audytuje wewnętrzną spójność bazy wiedzy Geopiguły (wiki, dziennik, umiejętności) i raportuje rozbieżności.

## Uruchomienie
`/brain-sync [--file <nazwa>]` — Argumenty: `$ARGUMENTS`.

## Krok 0 — Spójność Warstwy Umiejętności
- Każdy plik `brain/skills/*.md` (poza index) musi mieć odpowiadający mu plik komendy w repozytorium `.claude/commands/<nazwa>.md` (jeśli dotyczy) → w przeciwnym razie zgłoś `❌ BRAK SZABLONU`.

## Krok 1 — Spójność Strukturalna Bazy
- **Pokrycie MOC (Map of Content):** Każda notatka w podfolderach `wiki/` musi być podlinkowana w odpowiednim pliku `index.md` danej domeny; MOC każdej domeny musi być podlinkowany w głównym pliku [[../index]].
- **Archiwum Dziennika:** Każdy wpis w `journal/` musi być podlinkowany w indeksie dziennika [[../journal/index]].
- **Świeżość STATUSu:** Cele i priorytety w [[../STATUS]] muszą odwoływać się do istniejących notatek.

## Krok 2 — Raport
```
RAPORT SYNC MÓZGU — <data>
Sprawdzono: warstwę umiejętności, indeksy MOC, dziennik, status.
✅ Zsynchronizowane: <lista>
⚠️ Rozbieżności: <plik → szczegóły>
Zalecane: uruchomienie /brain-harvest w celu aktualizacji.
```
