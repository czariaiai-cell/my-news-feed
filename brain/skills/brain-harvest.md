# Skill: brain-harvest
> Syntetyzuje wnioski z bieżącej sesji i zapisuje je w notatkach wiki i dzienniku Geopiguły.
> Wdrożenie protokołu "Knowledge Tax" (Podatku od Wiedzy) – żadne wnioski z sesji nie mogą zostać zgubione.

## Uruchomienie
`/brain-harvest` — Argumenty: `$ARGUMENTS` (opcjonalnie `--file <nazwa_notatki>` aby ograniczyć zapis do konkretnej strony).

## Działanie
1. Analizuje konwersację pod kątem nowych faktów geopolitycznych, decyzji projektowych, wyników testów scraperów/modeli, i preferencji użytkownika.
2. Kieruje wnioski do odpowiednich domen wiki w folderze `wiki/`.
3. **Aktualizuje konkretne notatki wiki** – to jest główny cel.
4. Aktualizuje dziennik cykli w `journal/` oraz główny plik [[../STATUS]] jako podsumowanie sesji.

## Krok 1 — Przegląd Sesji pod kątem Odkryć
- **Zweryfikowane fakty**: Sprawdzone źródła, statystyki, linki API.
- **Decyzje projektowe**: Wybory architektoniczne, zmiany w kodzie scrapera/renderera.
- **Wyniki testów**: Wyniki uruchomień cykli Geopiguły, logi błędów API (np. brak kredytów Claude).
- **Preferencje użytkownika**: Nowe wytyczne dotyczące tematów (np. geopolityka, technologia).

## Krok 2 — Aktualizacja Notatek Wiki (Wymagane)
- Dla każdej notatki docelowej: przeczytaj ją, unikaj duplikatów, **nadpisuj przestarzałe sekcje w miejscu** (nigdy nie dopisuj poprawnych informacji obok błędnych).
- Format wpisów:
  - Specyfikacja/Fakt: `- **[<data>]** <precyzyjny wniosek, 1-2 zdania.>`
  - Decyzja: `### <temat> — ZDECYDOWANO <data>` + wyjaśnienie co/dlaczego.

**Zasady Obsidian (twarde wymagania):**
- Linki wiki to **ścieżki relatywne** (`[[../wiki/kategoria/indeks]]`, `[[notatka]]` w tym samym folderze).
- Nigdy nie owijaj aktywnych linków wiki w backticks (znaki grawisu: ` `).
- Notatki muszą być pisane w języku **polskim** zgodnie z polityką językową projektu.

## Krok 3 — Dziennik i STATUS (podsumowanie)
- Dopisz podsumowanie do dzisiejszego wpisu w `journal/` (np. `journal/2026-08-03.md`).
- Zaktualizuj [[../STATUS.md]] w repozytorium (aktualny focus bota, dług technologiczny).
