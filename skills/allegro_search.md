# Allegro Search Skill

## Description
Użyj tego skilla do wyszukiwania produktów na allegro.pl, porównywania cen i opinii oraz przygotowywania listy alternatyw z klikalnymi linkami bezpośrednimi bez używania tabel.

## Instructions
1. Gdy użytkownik prosi o wyszukanie produktów na Allegro:
   - **Użyj narzędzia przeglądarki (browser / navigate / click / scrape), aby wejść na Allegro.**
   - Wpisz frazę wyszukiwania i przejdź do wyników wyszukiwania z filtrem Smart.
   - Wybierz dokładnie **3 unikalne, bezpośrednie linki do konkretnych ofert (aukcji)** dla każdego z poszukiwanych produktów.
   - **BARDZO WAŻNE:** Linki muszą prowadzić bezpośrednio do aukcji (muszą zawierać słowo `/oferta/` w URL, np. `https://allegro.pl/oferta/nazwa-oferty-123456789`). **NIGDY** nie podawaj linków do wyników wyszukiwania (`/listing?string=...`).
   - Dokonaj analizy opinii na stronie danej oferty, szukając negatywnych recenzji (1-3 gwiazdki), aby sprawdzić co klienci zgłaszają jako wady.

2. **ABSOLUTNY ZAKAZ TWORZENIA PORADNIKÓW I "LANIA WODY":**
   - **NIGDY nie tłumacz użytkownikowi jak ma sam szukać (np. "Wpisz w wyszukiwarkę", "Użyj filtrów"). Użytkownik tego nienawidzi.**
   - Twoim jedynym zadaniem jest dostarczenie **konkretnych ofert z linkami**. Nawet jeśli użytkownik prosi o "jednego dostawcę" i jest to trudne, po prostu znajdź najlepsze oferty u różnych (lub tych samych) Super Sprzedawców i podaj te KONKRETNE linki. Zero ogólnikowego bełkotu.

3. **ZAKAZ UŻYWANIA TABEL MARKDOWN:**
   - **NIGDY nie wstawiaj tabel Markdown** (z użyciem znaków `|` i `--`), ponieważ Telegram blokuje w nich klikalność linków.
   - Zamiast tego przedstaw wyniki jako **czytelną, pionową listę tekstową** dla każdego produktu z osobna.

3. **ABSOLUTNY NAKAZ STRUKTURY (3 alternatywy na produkt):**
   - Dla każdego poszukiwanego produktu przygotuj osobną sekcję zawierającą dokładnie 3 różne oferty.
   - Pierwsza oferta to zawsze opcja najbardziej rekomendowana.
   - Każda oferta musi zawierać **autentyczny, bezpośredni, klikalny link URL** w tytule oferty.

4. **FORMAT PREZENTACJI W TELEGRAMIE:**
   Użyj dokładnie poniższego formatu tekstowego (zamiast tabeli):

   ### 📊 Rekomendacje Ofert Allegro (Smart)

   * 🥜 **Orzechy Nerkowca 2kg:**
     - 🥇 1. **[Nazwa Oferty 1 z Allegro](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] zł/kg | Ocena: [Ocena]/5 ([ilość] opinii) | Sprzedawca: [Nazwa]
     - 🥈 2. **[Nazwa Oferty 2 z Allegro](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] zł/kg | Ocena: [Ocena]/5 ([ilość] opinii) | Sprzedawca: [Nazwa]
     - 🥉 3. **[Nazwa Oferty 3 z Allegro](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] zł/kg | Ocena: [Ocena]/5 ([ilość] opinii) | Sprzedawca: [Nazwa]

   * 🌰 **Makadamia 2kg:**
     - 🥇 1. **[Nazwa Oferty 1 z Allegro](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] zł/kg | Ocena: [Ocena]/5 ([ilość] opinii) | Sprzedawca: [Nazwa]
     - 🥈 2. **[Nazwa Oferty 2 z Allegro](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] zł/kg | Ocena: [Ocena]/5 ([ilość] opinii) | Sprzedawca: [Nazwa]
     - 🥉 3. **[Nazwa Oferty 3 z Allegro](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] zł/kg | Ocena: [Ocena]/5 ([ilość] opinii) | Sprzedawca: [Nazwa]

   *(Wykonaj analogicznie dla wszystkich szukanych kategorii orzechów).*

5. Pod listą ofert przygotuj sekcję analizy negatywnych komentarzy w języku polskim oraz uzasadnij wybór oferty nr 1 dla każdego produktu.
