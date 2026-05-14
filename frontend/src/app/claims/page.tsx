"use client";
import { useState } from "react";

export default function ClaimsPage() {
  const [itemId, setItemId] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!itemId || !userId || !message) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="max-w-md mx-auto text-center mt-10">
        <p className="text-lg font-semibold text-green-400">Igénylés elküldve!</p>
        <p className="text-zinc-400 text-sm mt-2">A titkárság hamarosan felveszi veled a kapcsolatot.</p>
        <button onClick={() => setSent(false)} className="mt-4 text-sm text-blue-400 underline">Új igénylés</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Tárgy igénylése</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Tárgy ID</label>
          <input type="number" value={itemId} onChange={(e) => setItemId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" placeholder="pl. 2"/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Felhasználói ID</label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" placeholder="pl. 15"/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Leírás</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" rows={4} placeholder="Miért gondolod, hogy a tiéd?"/>
        </div>
        <button type="submit" className="bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700">Elküldés</button>
      </form>
    </div>
  );
}
