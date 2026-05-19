"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getItems, type Item } from "@/lib/api";

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
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
          setError("Nem sikerült betölteni a talált tárgyakat.");
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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 border border-gray-300 bg-white p-5">
        <h1 className="text-2xl font-bold">Talált tárgyak</h1>
        <p className="mt-2 text-sm text-gray-700">Itt vannak a megtalált tárgyak. Ha a tiéd, kattints az EZ AZ ENYÉM! gombra.</p>
      </div>

      {loading ? (
        <div className="border border-gray-300 bg-white p-4 text-gray-600">Betöltés...</div>
      ) : error ? (
        <div className="border border-red-300 bg-red-50 p-4 text-red-700">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="border border-gray-300 bg-white p-4">
              {item.image_url ? <div className="mb-3 h-40 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${item.image_url})` }} /> : <div className="mb-3 flex h-40 items-center justify-center border border-gray-200 bg-gray-50 text-sm text-gray-500">Nincs kép</div>}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                  <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                </div>
                <span className={item.status === "talált" ? "rounded bg-green-100 px-2 py-1 text-xs text-green-800" : "rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"}>
                  {item.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs text-gray-500">Tárgy ID: {item.id}</p>
                <Link href={`/claims?${new URLSearchParams({ item_id: String(item.id), title: item.title }).toString()}`} className="rounded border border-gray-400 px-3 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100">
                  EZ AZ ENYÉM!
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
