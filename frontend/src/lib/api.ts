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
  user_name?: string | null;
  user_osztaly?: string | null;
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

export function submitClaim(input: { itemId: number; userId: number; message: string; userName?: string; userOsztaly?: string; }) {
  return requestJson<Claim>("/claims", {
    method: "POST",
    body: JSON.stringify({
      item_id: input.itemId,
      user_id: input.userId,
      message: input.message,
      user_name: input.userName || null,
      user_osztaly: input.userOsztaly || null,
    }),
  });
}

export function getClaims(params?: { itemId?: number; userId?: number }) {
  const qs = new URLSearchParams();
  if (params?.itemId) qs.set('item_id', String(params.itemId));
  if (params?.userId) qs.set('user_id', String(params.userId));
  const path = qs.toString() ? `/claims?${qs.toString()}` : '/claims';
  return requestJson<Claim[]>(path);
}

export function deleteClaim(id: number) {
  return requestJson<{ id: number }>(`/claims/${id}`, { method: 'DELETE' });
}

export function updateItemStatus(id: number, status: string) {
  return requestJson<Pick<Item, "id" | "status">>(`/items/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}