const BASE_URL = "http://localhost:3000/api";

export type Item = {
  id: number;
  title: string;
  description: string;
  status: string;
  image_url?: string | null;
};

export type Claim = {
  id: number;
  item_id: number;
  user_id: number;
  message: string;
};

async function requestJson<T>(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function getItems() {
  return requestJson<Item[]>("/items");
}

export function createItem(input: { title: string; description: string; imageUrl?: string }) {
  return requestJson<Item>("/items", {
    method: "POST",
    body: JSON.stringify({
      title: input.title,
      description: input.description,
      status: "talált",
      image_url: input.imageUrl || null,
    }),
  });
}

export function submitClaim(input: { itemId: number; userId: number; message: string }) {
  return requestJson<Claim>("/claims", {
    method: "POST",
    body: JSON.stringify({
      item_id: input.itemId,
      user_id: input.userId,
      message: input.message,
    }),
  });
}

export function updateItemStatus(id: number, status: string) {
  return requestJson<Pick<Item, "id" | "status">>(`/items/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}