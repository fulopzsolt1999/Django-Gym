# FlexHub

Projekt futtatása:

- Klónozd a repót (amint ez megvan a flexhub mappát .gitignore-t readme.md-t és a requirements.txt file-t kell lásd)
- Ebben a mappában maradva a terminálba írd be hogy: `python -m venv .venv`
- Ez után aktiváld az env-et: `.venv/scripts/activate`
- Utána telepíts mindent a requirements-ből: `pip install -r requirements.txt`
- Ez után már csak lépj bele a flexhub mappába és futtasd az appot: `python manage.py runserver`

1. ### **Fő oldal**

   - Navbarba menüpontok az összes section-höz.
   - Statikus háttér ahogy megnyílik a főoldal.
   - Háttér kettéosztva, bal oldal regisztráció nélküli használat jobb oldal regisztráció utána megnyílt összes funkció (felsorolva mind a két esetben az összes elérhető és nem elérhető menü pont)
   - Lentebb About the Project
   - Lentebb About Us
   - Lentebb Contact Us
2. ### **Regisztráció nélküli oldal**

   - Másik statikus háttér jelenik meg felette a navbar az elérhető menü pontokkal.
   - Menü pontok:
     - Vissza a főoldalra.
     - Listázza ki az összes gymet, városonként, árkategorizálva.
     - Webshop
     - Böngészni tudja a publikusan megosztott edzésterveket.
3. ### Regisztrációt igénylő oldal

   - Megjelenik a belépési lehetőség, ami kér egy emailt és egy jelszót és egy gomb belépés felirattal. Alatta link a regisztrációs felülethez külön edzős és külön sima felhasználó. Edzőknek város és gym kiválasztás kép megadás és admin jóváhagyásra várás.
   - Megjelennek azok a menü pontok, amik a regisztráció nélküli oldalon, plusz:
     - Edző edzett kapcsolattartás
     - Edzésterv és étrend megosztás egyénileg csoportosan vagy publikusan. /Fizetős megnézni a terveket./
     - Makró számolás (fehérje, zsír, szénhidrát)
     - Profil oldal
     - Chat funkció azokkal akikkel az oldalon korábban már felvetted a kapcsolatot. (jelölés vagy követés, engedélyezve vagy viszonozva mind a két fél részéről) + blokkolás (ekkor nem látja a blokkolt személy semmi megosztott tartalmát)
