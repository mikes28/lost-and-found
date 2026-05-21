

# Lost & Found

Iskolai talált tárgy rendszer.

## Stack

- Backend: Express + SQLite
- Frontend: Next.js
- Run with Docker Compose on:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000

## Hogyan működik

1. A backend tárolja a talált tárgyakat SQLite adatbázisban.
2. A frontend listázza a tárgyakat, és az igényléseket is kezeli.
3. Az admin felületen lehet tárgyakat felvenni és státuszt módosítani.

## Fő nézetek

1. **Főoldal:** talált tárgyak listája.
2. **Bejelentkezés:** egyszerű login nézet.
3. **Admin felület:** tárgykezelés és igénylések.

## Dokumentáció

- [API leírás](docs/api.md)
- [ER-diagram](docs/er-diagram.md)
- [Jegyzetek](docs/notes.md)

## Gyors indítás

Linux / macOS:

```bash
chmod +x run.sh
./run.sh
```

Windows:

```bat
run.bat
```

## Rebuild + indítás (teljes újraépítés)

Linux / macOS:

```bash
chmod +x rebuild.sh
./rebuild.sh
```

Windows:

```bat
rebuild.bat
```

Ha Docker csoport jogosultság kell Linuxon, egyszer add hozzá a felhasználót a `docker` csoporthoz, majd jelentkezz ki és vissza.

## Futtatás lokálisan

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

## Tesztek

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
