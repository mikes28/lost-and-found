import type { Item, Claim } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

async function req<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const getItems   = ()                             => req<Item[]>("/api/items");
export const createItem = (d: Omit<Item, "id">)          => req<Item>("/api/items", { method: "POST", body: JSON.stringify(d) });
export const updateItem = (id: number, status: Item["status"]) =>
  req<Pick<Item,"id"|"status">>(`/api/items/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
export const createClaim = (d: Omit<Claim,"id">)         => req<Claim>("/api/claims", { method: "POST", body: JSON.stringify(d) });
