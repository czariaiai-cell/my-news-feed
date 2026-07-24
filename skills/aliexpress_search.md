# AliExpress Search Skill

## Description
Użyj tego skilla do wyszukiwania produktów na aliexpress.com, porównywania cen i opinii oraz analizowania czasu dostawy bez używania tabel.

## Instructions
1. Gdy użytkownik prosi o wyszukanie produktów na AliExpress:
   - **Użyj narzędzia przeglądarki (browser / navigate / click / scrape), aby wejść na AliExpress.**
   - Wyszukaj produkt i przefiltruj wyniki pod kątem wysyłki Choice / Standard Shipping.
   - Wybierz dokładnie **3 unikalne, bezpośrednie linki do konkretnych ofert (aukcji)** dla każdego z poszukiwanych produktów.
   - **BARDZO WAŻNE:** Linki muszą prowadzić bezpośrednio do ofert (muszą zawierać słowo `/item/` w URL, np. `https://pl.aliexpress.com/item/123456789.html`). **NIGDY** nie podawaj linków do stron wyszukiwania (`/wholesale?SearchText=...`).
   - Dokonaj analizy opinii międzynarodowych (szczególnie 1-3 gwiazdki), sprawdzając wady zgłaszane przez kupujących.

2. **ZAKAZ UŻYWANIA TABEL MARKDOWN:**
   - **NIGDY nie wstawiaj tabel Markdown** (z użyciem znaków `|` i `--`), ponieważ Telegram blokuje w nich klikalność linków.
   - Zamiast tego przedstaw wyniki jako **czytelną, pionową listę tekstową** dla każdego produktu z osobna.

3. **ABSOLUTNY NAKAZ STRUKTURY (3 alternatywy na produkt):**
   - Dla każdego poszukiwanego produktu przygotuj osobną sekcję zawierającą dokładnie 3 różne oferty.
   - Pierwsza oferta to zawsze opcja najbardziej rekomendowana.
   - Każda oferta musi zawierać **autentyczny, bezpośredni, klikalny link URL** w tytule oferty.

4. **FORMAT PREZENTACJI W TELEGRAMIE:**
   Użyj dokładnie poniższego formatu tekstowego (zamiast tabeli):

   ### 📊 Rekomendacje Ofert AliExpress

   * 🥜 **Orzechy Nerkowca 2kg:**
     - 🥇 1. **[Nazwa Oferty 1 z AliExpress](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] USD/PLN | Ocena: [Ocena]/5 ([ilość] opinii) | Dostawa: [Czas]
     - 🥈 2. **[Nazwa Oferty 2 z AliExpress](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] USD/PLN | Ocena: [Ocena]/5 ([ilość] opinii) | Dostawa: [Czas]
     - 🥉 3. **[Nazwa Oferty 3 z AliExpress](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] USD/PLN | Ocena: [Ocena]/5 ([ilość] opinii) | Dostawa: [Czas]

   * 🌰 **Makadamia 2kg:**
     - 🥇 1. **[Nazwa Oferty 1 z AliExpress](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] USD/PLN | Ocena: [Ocena]/5 ([ilość] opinii) | Dostawa: [Czas]
     - 🥈 2. **[Nazwa Oferty 2 z AliExpress](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] USD/PLN | Ocena: [Ocena]/5 ([ilość] opinii) | Dostawa: [Czas]
     - 🥉 3. **[Nazwa Oferty 3 z AliExpress](PEŁNY_AUTENTYCZNY_LINK_DO_OFERTY)** | Cena: [Cena] USD/PLN | Ocena: [Ocena]/5 ([ilość] opinii) | Dostawa: [Czas]

   *(Wykonaj analogicznie dla wszystkich szukanych kategorii orzechów).*

5. Pod listą ofert przygotuj sekcję analizy wad i negatywnych komentarzy międzynarodowych oraz uzasadnij wybór oferty nr 1.
