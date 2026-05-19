"use client";
import { useEffect, useState } from "react";
import { createItem, getItems, getClaims, type Item, updateItemStatus } from "@/lib/api";
import { getSession, setSession, deriveUserId, type SessionUser } from "@/lib/session";

export default function AdminPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [claimsMap, setClaimsMap] = useState<Record<number, Array<{ id: number; item_id: number; user_id: number; message: string }>>>({});
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    let mounted = true;

    const current = getSession();
    if (current && current.isAdmin) setAdminAuthorized(true);

    async function loadItems() {
      try {
        const data = await getItems();

        if (mounted) {
          setItems(data);
        }
      } catch {
        if (mounted) {
          setError("Nem sikerült betölteni a tárgyakat.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    async function loadAll() {
      await loadItems();
      try {
        const claims = await getClaims();
        const map: Record<number, any[]> = {};
        for (const c of claims) {
          if (!map[c.item_id]) map[c.item_id] = [];
          map[c.item_id].push(c);
        }
        if (mounted) setClaimsMap(map);
      } catch {
        // ignore claims fetch error
      }
    }

    if (adminAuthorized) loadAll();

    return () => {
      mounted = false;
    };
  }, [adminAuthorized]);

  function authorizeAdmin(e: React.FormEvent) {
    e.preventDefault();
    if (adminPassword === "admin") {
      const current = getSession();
      if (current) {
        const updated: SessionUser = { ...current, isAdmin: true };
        setSession(updated);
      } else {
        const adminSession: SessionUser = { id: deriveUserId("admin|"), name: "Admin", osztaly: "", isAdmin: true };
        setSession(adminSession);
      }
      setAdminAuthorized(true);
      setAdminPassword("");
      setError("");
    } else {
      setError("Helytelen admin jelszo.");
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description) {
      alert("Töltsd ki mindkét mezőt!");
      return;
    }

    try {
      const createdItem = await createItem({
        title,
        description,
        imageUrl,
      });

      setItems((currentItems) => [...currentItems, createdItem]);
      setTitle("");
      setDescription("");
      setImageUrl("");
      setError("");
    } catch {
      setError("Nem sikerült hozzáadni az új tárgyat.");
    }
  }

  async function handleToggleReturn(id: number, toStatus: string) {
    try {
      const updatedItem = await updateItemStatus(id, toStatus);
      setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, status: updatedItem.status } : item));
      setError("");
    } catch {
      setError("Nem sikerült módosítani a tárgy státuszát.");
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div className="border border-gray-300 bg-white p-5">
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="mt-2 text-sm text-gray-700">Az új tárgyak és a státuszváltás is az API-n keresztül történik.</p>
      </div>

      {!adminAuthorized ? (
        <form onSubmit={authorizeAdmin} className="flex flex-col gap-3 border border-gray-300 bg-white p-5 max-w-md">
          <h2 className="text-base font-bold text-gray-900">Admin belépés</h2>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Jelszó</label>
            <input type="password" placeholder="Admin jelszo" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
          </div>
          <button type="submit" className="border border-gray-400 bg-white px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100">Belépés</button>
          {error ? <div className="text-red-700">{error}</div> : null}
        </form>
      ) : (
        <>
          <form onSubmit={handleAdd} className="flex flex-col gap-3 border border-gray-300 bg-white p-5">
            <h2 className="text-base font-bold text-gray-900">Új tárgy hozzáadása</h2>
            <input type="text" placeholder="Megnevezés" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
            <input type="text" placeholder="Leírás" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
            <input type="text" placeholder="Kép URL (opcionális)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
            <button type="submit" className="border border-gray-400 bg-white px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100">Hozzáadás</button>
          </form>

          <div>
            <h2 className="mb-3 text-lg font-bold text-gray-900">Tárgyak listája</h2>
            {loading ? <div className="border border-gray-300 bg-white p-4 text-gray-600">Betöltés...</div> : error ? <div className="border border-red-300 bg-red-50 p-4 text-red-700">{error}</div> : <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 border border-gray-300 bg-white p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-700">{item.description}</p>
                    {item.image_url ? <p className="mt-1 text-xs text-gray-500">{item.image_url}</p> : null}
                    {claimsMap[item.id] && claimsMap[item.id].length ? (
                      <div className="mt-2 rounded border border-yellow-200 bg-yellow-50 p-2 text-xs text-yellow-900">
                        <div className="font-semibold">Igénylések: {claimsMap[item.id].length}</div>
                        <ul className="mt-1 list-inside list-disc">
                          {claimsMap[item.id].map((c) => (
                            <li key={c.id}>{c.user_name ? `${c.user_name} (${c.user_osztaly || '-'})` : `Felhasználó ${c.user_id}`}: {c.message || <em>nincs üzenet</em>}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={item.status === "talált" ? "rounded bg-green-100 px-2 py-1 text-xs text-green-800" : "rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"}>{item.status}</span>
                    {item.status === "talált" ? (
                      <button onClick={() => handleToggleReturn(item.id, 'visszaadva')} className="border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 hover:bg-gray-100">
                        Visszaadva
                      </button>
                    ) : item.status === 'visszaadva' ? (
                      <button onClick={() => handleToggleReturn(item.id, 'talált')} className="border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 hover:bg-gray-100">
                        Visszavonás
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            }
          </div>
        </>
      )}
    </div>
  );
}