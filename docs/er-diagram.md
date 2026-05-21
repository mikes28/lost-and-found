# ER-diagram

A backend jelenleg 2 táblát használ. A felhasználói név és osztály nincs külön táblában, azt a frontend session tárolja.

## 1) Items
- `id`
- `title`
- `description`
- `status` (`talált` vagy `visszaadva`)
- `image_url`

## 2) Claims
- `id`
- `item_id`
- `user_id`
- `message` (a diák bizonyítéka/leírása)
- `user_name` (opcionális, megjelenítéshez)
- `user_osztaly` (opcionális, megjelenítéshez)
- `created_at`

## Kapcsolatok

- Egy **Item** több **Claim** rekordhoz kapcsolódhat.
- Minden **Claim** pontosan egy **Item**-hez tartozik.
- A diák neve és osztálya kliens oldali sessionből érkezik, nem külön adatbázis táblából.
