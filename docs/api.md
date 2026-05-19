# Lost & Found API

Base URL helyben: `http://localhost:3000/api`

Minden válasz JSON.

## 1) GET /items
A még elérhető tárgyak listázása.

**Példa válasz:**
```json
[
  {
    "id": 1,
    "title": "Fekete kulcscsomó",
    "description": "3 kulcs, kék kulcstartóval",
    "status": "talált",
    "image_url": "https://example.com/item1.jpg"
  }
]
```

## 2) POST /items
Új tárgy rögzítése az admin felületről.

**Példa kérés:**
```json
{
  "title": "Szürke pulóver",
  "description": "M-es méret, fehér felirat",
  "status": "talált",
  "image_url": "https://example.com/pulover.jpg"
}
```

**Példa válasz:**
```json
{
  "id": 2,
  "title": "Szürke pulóver",
  "description": "M-es méret, fehér felirat",
  "status": "talált",
  "image_url": "https://example.com/pulover.jpg"
}
```

## 3) GET /claims
Az összes igénylés listázása. Az admin oldalon ez jelenik meg tárgyanként csoportosítva.

**Példa válasz:**
```json
[
  {
    "id": 7,
    "item_id": 2,
    "user_id": 15,
    "message": "Az enyém, belül a címkébe bele van írva a nevem.",
    "user_name": "Teszt Elek",
    "user_osztaly": "10.c"
  }
]
```

## 4) POST /claims
Diák jelentkezik egy tárgyra.

**Példa kérés:**
```json
{
  "item_id": 2,
  "user_id": 15,
  "message": "Az enyém, belül a címkébe bele van írva a nevem.",
  "user_name": "Teszt Elek",
  "user_osztaly": "10.c"
}
```

**Példa válasz:**
```json
{
  "id": 7,
  "item_id": 2,
  "user_id": 15,
  "message": "Az enyém, belül a címkébe bele van írva a nevem.",
  "user_name": "Teszt Elek",
  "user_osztaly": "10.c"
}
```

## 5) DELETE /claims/:id
Egy igénylés törlése. A főoldalon a saját igényléshez ez kapcsolódik a „Mégsem” gomb.

**Példa válasz:**
```json
{
  "id": 7
}
```

## 6) PUT /items/:id
A tárgy státuszának módosítása.

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

## Megjegyzés a kliens oldali bejelentkezésről

Az alkalmazásban a diák neve és osztálya a frontend session-ben van tárolva, nem külön users táblában. Az admin belépés jelenleg kliens oldali jelszóval védett.
