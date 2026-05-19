

# Lost & Found – Iskolai MVP projekt

Egyszerű talált tárgy rendszer iskolai használatra.

## Rövid működés

1. A titkárság rögzíti a talált tárgyakat.
2. A diák a főoldalon látja a talált tárgyakat, és jelentkezhet rájuk.
3. A titkárság ellenőrzi az igénylést, majd a tárgy státuszát „visszaadva”-ra állítja.

## MVP szerepkörök

- **Diák:** megnézi a talált tárgyakat, igénylést ad le.
- **Admin (titkárság):** új tárgyat rögzít, igényléseket kezel, tárgyat kiad.

## Frontend nézetek (csak ez a 3)

1. **Faliújság (főoldal):** talált tárgyak kártyás listája.
2. **Bejelentő űrlap:** új talált tárgy rögzítése (admin).
3. **Admin Dashboard:** igénylések listája és „Kiadva” gomb.

## További dokumentáció

- [API leírás](docs/api.md)
- [ER-diagram](docs/er-diagram.md)

## Futtatás

### Lokálisan

Backend:

```bash
cd backend
npm install
npm start
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

A frontend alapból a 3001-es porton fut, a backend pedig a 3000-esen.

### Dockerrel

A projekthez van `docker-compose.yml` és `docker-compose.override.yml` is.

```bash
sudo docker compose up --build
```

Hasznos parancsok:

```bash
sudo docker compose ps
sudo docker compose logs -f
sudo docker compose down
```

### Tesztek

Backend tesztek:

```bash
cd backend
npm test
```

Frontend tesztek:

```bash
cd frontend
npm test
```
