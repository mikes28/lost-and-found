# Lost & Found ER-diagram leírás

Az ER-diagram (Entity-Relationship diagram) egy olyan ábra, ami megmutatja, hogy az adatbázisban milyen táblák (entitások) vannak, és ezek hogyan kapcsolódnak egymáshoz. Az elveszett tárgyak igénylése és a talált tárgyak rögzítése központi szerepet kap.

---

## Táblák részletesen

### `users` tábla
- `id` (PK, integer, auto increment) – egyedi azonosító minden felhasználónak
- `name` (varchar) – felhasználó neve
- `email` (varchar, unique) – iskolai e-mail cím, nem lehet két egyforma
- `password_hash` (varchar) – a jelszó titkosított változata, nem sima szöveg
- `role` (enum: "student" | "teacher" | "admin") – a felhasználó típusa
- `created_at` (timestamp) – mikor lett regisztrálva

### `items` tábla
- `id` (PK, integer) – egyedi azonosító minden tárgynak
- `title` (varchar) – pl. „Fekete hoodie”
- `description` (text) – részletes leírás
- `type` (enum: "lost" | "found") – elveszett vagy talált
- `location` (varchar) – pl. „B2 terem”
- `date` (date vagy timestamp) – mikor veszett el vagy lett megtalálva
- `status` (enum: "open" | "matched" | "closed") – aktuális állapot
- `reported_by_user_id` (FK → users.id) – ki jelentette be
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `claims` tábla
- `id` (PK, integer) – egyedi azonosító minden igénylésnek
- `item_id` (FK → items.id) – melyik tárgyra vonatkozik
- `claimer_user_id` (FK → users.id) – ki mondja, hogy az övé
- `description` (text) – részletes leírás az igényléshez (pl. márka, szín, méret)
- `status` (enum: "pending" | "approved" | "rejected") – igénylés állapota
- `created_at` (timestamp)

---

## Kapcsolatok magyarázata

- Egy **user** több **itemet** is jelenthet be (1:N kapcsolat a `users` és az `items` között).
- Egy **itemet** több különböző user is igényelhet (`items` → `claims` = 1:N).
- Egy **user** több claimet tehet különböző itemekre (`users` → `claims` = 1:N).

---

## Indexek

Az indexek segítenek gyorsítani a keresést az adatbázisban. Például, ha csak a nyitott (open) elveszett tárgyakat akarjuk listázni, az index miatt ez gyorsabb lesz.

**Javasolt indexek:**
- `items.status`, `items.type`, `items.location` – gyors szűréshez (pl. csak a "lost" típusú, "open" státuszú tárgyak a "B2 teremben")
- `claims.item_id`, `claims.claimer_user_id` – gyorsan megtaláljuk, hogy egy tárgyra kik jelentkeztek, vagy egy user mire jelentkezett

---

Ez a leírás segít átlátni, hogy milyen adatokat tárolunk, és hogyan kapcsolódnak egymáshoz a Lost & Found rendszerben.