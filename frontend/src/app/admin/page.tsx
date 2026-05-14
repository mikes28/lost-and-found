"use client";
import { useState } from "react";

type Item = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const startItems: Item[] = [
  { id: 1, title: "Fekete kulcscsomó", description: "3 kulcs, kék kulcstartóval", status: "talált" },
  { id: 2, title: "Szürke pulóver", description: "M-es méret, fehér felirat", status: "talált" },
  { id: 3, title: "Parker toll", description: "Fekete töltőtoll, arany klipsz", status: "visszaadva" },
];

export default function AdminPage() {
  const [items, setItems] = useState<Item[]>(startItems);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = null;

  if (!token) {
    return (
      <div className="max-w-sm mx-auto mt-16 text-center">
        <p className="text-zinc-400 mb-4">Az admin felülethez bejelentkezés szükséges.</p>
        <a href="/login" className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-700">Bejelentkezés</a>
      </div>
    );
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description) {
      alert("Töltsd ki mindkét mezőt!");
      return;
    }
    const newItem: Item = { id: items.length + 1, title: title, description: description, status: "talált" };
    setItems([...items, newItem]);
    setTitle("");
    setDescription("");
  }

  function handleReturn(id: number) {
    setItems(items.map((item) => item.id === id ? { ...item, status: "visszaadva" } : item));
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">Admin</h1>
        <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 flex flex-col gap-3">
          <h2 className="font-semibold text-white">Új tárgy hozzáadása</h2>
          <input type="text" placeholder="Megnevezés" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500"/>
          <input type="text" placeholder="Leírás" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500"/>
          <button type="submit" className="bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700">Hozzáadás</button>
        </form>
      </div>

      <div>
        <h2 className="font-semibold mb-3 text-white">Tárgyak listája</h2>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-sm text-white">{item.title}</p>
                <p className="text-xs text-zinc-500">{item.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={item.status === "talált" ? "text-xs bg-green-900 text-green-400 px-2 py-1 rounded-full" : "text-xs bg-zinc-700 text-zinc-400 px-2 py-1 rounded-full"}>{item.status}</span>
                {item.status === "talált" && (
                  <button onClick={() => handleReturn(item.id)} className="text-xs text-blue-400 underline">Visszaadva</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}