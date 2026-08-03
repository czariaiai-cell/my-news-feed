# Skill: brain-lint
> Sprawdza notatki bazy pod kątem uszkodzonych linków relatywnych, osieroconych plików i czystości strukturalnej.

## Uruchomienie
`/brain-lint` — Argumenty: `$ARGUMENTS`.

## Krok 1 — Walidacja Linków i Plików
- Linki muszą być **ścieżkami relatywnymi** od notatki zawierającej (np. `[[../wiki/kategoria/index|etykieta]]`, `[[notatka]]`).
- Cel linku jest poprawny, jeśli w bazie istnieje plik `<nazwa>` lub `<nazwa>.md`.
- Linki owinięte w backticks (` `[[...]]` `) są traktowane jako przykłady kodu i pomijane.
- **Notatki osierocone**: Każda notatka (poza głównym `index.md`, `STATUS.md` i szablonami) musi być celem przynajmniej jednego linku z innej notatki.

## Krok 2 — Ocena Kondycji (Health Score)
```
score = 100 * (1 - (uszkodzone + 0.5*sieroty + 2*niekompletne) / wszystkie_notatki)
```
- ≥95 ✅ zdrowa baza · 85–94 ⚠️ wymagana uwaga · <85 ❌ spory dług dokumentacyjny.
- **Niekompletna notatka**: Brak nagłówka `# Tytuł`, brak sekcji `##`, mniej niż 5 linii, lub obecność surowych znaczników `TODO`/`[TBD]`.

## Krok 3 — Kiedy uruchamiać
- Po dodaniu, zmianie nazwy lub przeniesieniu notatek.
- Na koniec sesji roboczej przed zakończeniem prac.
- Wynik (Health Score) powinien być wpisywany w pliku [[../STATUS.md]].
