# ER-diagram (MVP)

A rendszer csak 3 táblát használ.

## 1) Users
- `id`
- `name`
- `email`
- `role` (diák vagy admin)

## 2) Items
- `id`
- `title`
- `description`
- `status` (talált vagy visszaadva)
- `image_url`

## 3) Claims
- `id`
- `item_id`
- `user_id`
- `message` (a diák bizonyítéka/leírása)

## Kapcsolatok

- Egy **User** több **Claim** rekordot létrehozhat.
- Egy **Item** több **Claim** rekordhoz kapcsolódhat.
- Minden **Claim** pontosan egy **User**-hez és egy **Item**-hez tartozik.
