const BASE_URL = "http://localhost:3000/api";

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(email: string, password: string, name: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  return res.json();
}

export async function getItems() {
  const res = await fetch(`${BASE_URL}/items`);
  return res.json();
}

export async function createItem(title: string, description: string, token: string) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  return res.json();
}

export async function updateItemStatus(id: number, status: string, token: string) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
}