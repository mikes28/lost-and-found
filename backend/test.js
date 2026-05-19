const request = require('supertest');

const app = require('./src/app');
const db = require('./src/config/database');

function runSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

async function createItem(overrides = {}) {
  const marker = Date.now();
  const response = await request(app)
    .post('/api/items')
    .send({
      title: `Teszt tárgy ${marker}`,
      description: 'Backend teszt',
      status: 'talált',
      image_url: 'https://example.com/teszt.jpg',
      ...overrides,
    });

  return { marker, response };
}

afterEach(async () => {
  await runSql("DELETE FROM claims WHERE item_id IN (SELECT id FROM items WHERE title LIKE 'Vitest item %')");
  await runSql("DELETE FROM items WHERE title LIKE 'Vitest item %'");
});

// targyak listajahoz get kerest kuld
test('Tárgylista', async () => {
  const response = await request(app).get('/api/items');
  expect(response.status).toBe(200);
});

// targy letrehozasa 201-gyel ter vissza
test('Új tárgy', async () => {
  const { response } = await createItem();
  expect(response.status).toBe(201);
});

// cim nelkul hibauzenet jon
test('Cím nélkül', async () => {
  const response = await request(app).post('/api/items').send({ description: 'No title' });
  expect(response.status).toBe(400);
});

// jelentkezest lehet letrehozni
test('Jelentkezés', async () => {
  const { marker, response: itemResponse } = await createItem();
  const claimResponse = await request(app).post('/api/claims').send({
    item_id: itemResponse.body.id,
    user_id: marker,
    message: 'Teszt üzenet',
  });
  expect(claimResponse.status).toBe(201);
});

// hianyos mezozes hiba
test('Jelentkezés hiányosan', async () => {
  const response = await request(app).post('/api/claims').send({ message: 'Hiányzik az azonosító' });
  expect(response.status).toBe(400);
});

// statusz legyen updatelve
test('Státusz váltás', async () => {
  const { response: itemResponse } = await createItem();
  const updateResponse = await request(app).put(`/api/items/${itemResponse.body.id}`).send({ status: 'visszaadva' });
  expect(updateResponse.status).toBe(200);
});

// nem letezohöz 404
test('Ismeretlen tárgy', async () => {
  const response = await request(app).put('/api/items/999999').send({ status: 'visszaadva' });
  expect(response.status).toBe(404);
});

afterAll(async () => {
  db.close();
});