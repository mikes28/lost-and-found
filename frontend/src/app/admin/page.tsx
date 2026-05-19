"use client";
import { useEffect, useState } from "react";
import { createItem, getItems, type Item, updateItemStatus } from "@/lib/api";

export default function AdminPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

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

    loadItems();

    return () => {
      mounted = false;
    };
  }, []);

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

  async function handleReturn(id: number) {
    try {
      const updatedItem = await updateItemStatus(id, "visszaadva");
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
              </div>
              <div className="flex items-center gap-3">
                <span className={item.status === "talált" ? "rounded bg-green-100 px-2 py-1 text-xs text-green-800" : "rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"}>{item.status}</span>
                {item.status === "talált" ? (
                  <button onClick={() => handleReturn(item.id)} className="border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 hover:bg-gray-100">
                    Visszaadva
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        }
      </div>
    </div>
  );
}