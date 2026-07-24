# Allegro Cart Skill

## Description
Użyj tego skilla, gdy użytkownik wskazał konkretne linki lub wybrane alternatywy z tabeli produktów, które chce dodać do koszyka na allegro.pl.

## Instructions
1. Gdy użytkownik wskaże wybrane pozycje do dodania do koszyka (np. podając linki bezpośrednie lub numery alternatyw z poprzedniej tabeli):
   - Uruchom narzędzie przeglądarki (`browser`).
   - Dla każdego wybranego produktu przejdź **bezpośrednio pod jego pełny adres URL** (np. `https://allegro.pl/oferta/xyz`). Nie trać tokenów na wyszukiwanie na stronie głównej Allegro!
   - Poczekaj na załadowanie oferty.
   - Sprawdź, czy wybrany jest właściwy wariant/ilość (np. 2kg).
   - Kliknij przycisk **"Dodaj do koszyka"** (lub "kup teraz" / "dodaj do koszyka" w zależności od stanu strony).
   - Jeśli wyskoczy pop-up/okienko z propozycją ubezpieczenia lub usług dodatkowych, kliknij "dalej" lub zamknij je.
   
2. Po dodaniu wszystkich pozycji do koszyka, zrób zrzut ekranu koszyka jako potwierdzenie i poinformuj użytkownika o sukcesie:
   > 🛒 *Pomyślnie dodałem wybrane produkty do koszyka! Możesz teraz sfinalizować zakupy w swojej przeglądarce.*
