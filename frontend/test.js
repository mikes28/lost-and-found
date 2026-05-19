const originalFetch = global.fetch;

function mockJsonResponse(body, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

function installFetchMock(handler) {
  global.fetch = vi.fn(handler);
}

afterEach(() => {
  global.fetch = originalFetch;
  vi.restoreAllMocks();
});

// lista lekerdezese
test('Tárgylista', async () => {
  installFetchMock(async () => mockJsonResponse([{ id: 1, title: 'Found', description: 'D', status: 'talált' }]));
  const api = await import('./src/lib/api.ts');
  const items = await api.getItems();
  expect(items).toHaveLength(1);
});

// uj targy letrehozasa
test('Új tárgy', async () => {
  installFetchMock(async (url, init) => {
    expect(init.method).toBe('POST');
    return mockJsonResponse({ id: 11, title: 'Frontend teszt', description: 'Frontend teszt', status: 'talált', image_url: 'https://example.com/front.jpg' });
  });
  const api = await import('./src/lib/api.ts');
  const createdItem = await api.createItem({
    title: 'Frontend teszt',
    description: 'Frontend teszt',
    imageUrl: 'https://example.com/front.jpg',
  });
  expect(createdItem.id).toBe(11);
});

// jelentkezest lehet letrehozni
test('Jelentkezés', async () => {
  installFetchMock(async (url, init) => {
    expect(init.method).toBe('POST');
    return mockJsonResponse({ id: 9, item_id: 11, user_id: 7, message: 'Teszt üzenet' });
  });
  const api = await import('./src/lib/api.ts');
  const claim = await api.submitClaim({
    itemId: 11,
    userId: 7,
    message: 'Teszt üzenet',
  });
  expect(claim.id).toBe(9);
});

// statusz lehet updateltni
test('Státusz váltás', async () => {
  installFetchMock(async (url, init) => {
    expect(init.method).toBe('PUT');
    return mockJsonResponse({ id: 11, status: 'visszaadva' });
  });
  const api = await import('./src/lib/api.ts');
  const updatedItem = await api.updateItemStatus(11, 'visszaadva');
  expect(updatedItem.status).toBe('visszaadva');
});

// null kep url is ok
test('Kép nélkül', async () => {
  installFetchMock(async () => mockJsonResponse({ id: 12, title: 'Nincs kép', description: 'Frontend teszt', status: 'talált', image_url: null }));
  const api = await import('./src/lib/api.ts');
  const createdItem = await api.createItem({ title: 'Nincs kép', description: 'Frontend teszt' });
  expect(createdItem.image_url).toBeNull();
});