# Lost & Found API v1

Ez az API segít az iskolában elveszett vagy talált tárgyakat bejelenteni, keresni és kezelni. A cél, hogy a titkárság egyszerűen tudja rögzíteni a talált dolgokat, és az elveszett tárgyak igényléseit gyorsan összekapcsolhassa a megfelelő bejelentésekkel.

---

## Technikai összefoglaló

- **Base URL:** `http://localhost:3000/api`
- **Minden válasz:** JSON formátum

### HTTP státuszkódok röviden
- **200 OK:** Sikeres lekérdezés vagy módosítás.
- **201 Created:** Sikeres létrehozás (pl. új tárgy).
- **400 Bad Request:** Hibás kérés (pl. hiányzó adat).
- **401 Unauthorized:** Nincs bejelentkezve vagy nincs jogosultság.
- **404 Not Found:** Nem található (pl. nincs ilyen tárgy).
- **500 Server Error:** Szerverhiba, váratlan hiba történt.

---

## Fő entitások

- **User:** Diák vagy tanár, aki bejelentést tesz.
- **Item (tárgy):** Elveszett vagy talált dolog.
- **Claim/Request (igénylés):** Ha valaki azt mondja, hogy az adott tárgy az övé, részletes leírást ad róla.

---

## API végpontok

### 1. GET /health
- **Mire jó:** Ellenőrzi, hogy fut-e a szerver.
- **Példa válasz:**
```json
{
  "status": "ok"
}
```
- **Tipikus hibakód:** 500 (ha nem működik a szerver)

---

### 2. GET /items
- **Leírás:** Listázza az összes talált tárgyat (csak titkársági felhasználóknak).
- **Query paraméterek:**
  - `type`: `lost` vagy `found` (pl. csak elveszett vagy csak talált)
  - `status`: `open`, `matched`, `closed` (pl. csak nyitott bejegyzések)
  - `q`: szöveges keresés cím/leírás alapján
- **Példa URL-ek:**
  - `/api/items?type=lost&status=open`
  - `/api/items?q=kulcstartó`
- **Példa válasz:**
```json
[
  {
    "id": 1,
    "title": "Fekete hoodie",
    "type": "lost",
    "status": "open",
    "location": "B2 terem",
    "date": "2026-04-10",
    "reported_by": {
      "id": 5,
      "name": "Kiss Anna"
    }
  }
]
```
- **Tipikus hibakódok:** 400 (rossz paraméter), 500 (szerverhiba)

---

### 3. POST /claims
- **Leírás:** Elveszett tárgy igénylése részletes leírással.
- **Request body mezők:**
  - `item_id` (kötelező): Az igényelt tárgy azonosítója.
  - `description` (kötelező): Részletes leírás (pl. márka, szín, méret, egyedi ismertetőjegyek).
- **Példa kérés body:**
```json
{
  "item_id": 1,
  "description": "Fekete hoodie, fehér cipzárral, B2 teremben veszett el."
}
```
- **Példa válasz (201):**
```json
{
  "claim_id": 3,
  "status": "pending"
}
```
- **Tipikus hibakódok:** 400 (hiányzó adat), 404 (nincs ilyen tárgy), 500 (szerverhiba)

---

## Hibakódok összefoglaló
- **200 OK:** Sikeres kérés
- **201 Created:** Sikeres létrehozás
- **400 Bad Request:** Hibás kérés
- **401 Unauthorized:** Nincs jogosultság
- **404 Not Found:** Nem található
- **500 Server Error:** Szerverhiba
