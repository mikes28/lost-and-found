# Lost & Found API (MVP)

Base URL: `http://localhost:3000`

Minden válasz JSON.

## 1) GET /api/items
Talált tárgyak listázása (csak `status = "talalt"`).

**Példa válasz:**
```json
[
  {
    "id": 1,
    "title": "Fekete kulcscsomó",
    "description": "3 kulcs, kék kulcstartóval",
    "status": "talalt",
    "image_url": "https://example.com/item1.jpg"
  }
]
```

## 2) POST /api/items
Új talált tárgy rögzítése (**csak admin**).

**Példa kérés:**
```json
{
  "title": "Szürke pulóver",
  "description": "M-es méret, fehér felirat",
  "status": "talalt",
  "image_url": "https://example.com/pulover.jpg"
}
```

**Példa válasz:**
```json
{
  "id": 2,
  "title": "Szürke pulóver",
  "description": "M-es méret, fehér felirat",
  "status": "talalt",
  "image_url": "https://example.com/pulover.jpg"
}
```

## 3) POST /api/claims
Diák jelentkezik egy tárgyra.

**Példa kérés:**
```json
{
  "item_id": 2,
  "user_id": 15,
  "message": "Az enyém, belül a címkébe bele van írva a nevem."
}
```

**Példa válasz:**
```json
{
  "id": 7,
  "item_id": 2,
  "user_id": 15,
  "message": "Az enyém, belül a címkébe bele van írva a nevem."
}
```

## 4) PUT /api/items/:id
A titkárság a tárgy státuszát „visszaadva”-ra állítja.

**Példa kérés:**
```json
{
  "status": "visszaadva"
}
```

**Példa válasz:**
```json
{
  "id": 2,
  "status": "visszaadva"
}
```
