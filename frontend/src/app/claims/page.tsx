"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitClaim } from "@/lib/api";
import { getSession } from "@/lib/session";

export default function ClaimsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [itemId, setItemId] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const queryItemId = searchParams.get("item_id") ?? "";
    const queryTitle = searchParams.get("title") ?? "";
    const session = getSession();

    setItemId(queryItemId);
    setItemTitle(queryTitle);
    setUserId(session ? String(session.id) : "");
  }, [searchParams]);

  const itemLabel = useMemo(() => itemTitle || (itemId ? `Tárgy #${itemId}` : "Választott tárgy"), [itemId, itemTitle]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!itemId || !userId || !message) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    setSending(true);
    setError("");

    try {
      await submitClaim({
        itemId: Number(itemId),
        userId: Number(userId),
        message,
      });
      setSent(true);
    } catch {
      setError("Nem sikerült elküldeni az igénylést.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto mt-10 max-w-md border border-gray-300 bg-white p-6 text-center">
        <p className="text-lg font-bold text-green-700">Igénylés elküldve!</p>
        <p className="mt-2 text-sm text-gray-700">A titkárság hamarosan felveszi veled a kapcsolatot.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => setSent(false)} className="border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900">
            Új igénylés
          </button>
          <button onClick={() => router.push("/")} className="border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900">
            Vissza a listához
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 border border-gray-300 bg-white p-5">
        <h1 className="text-2xl font-bold">Igénylés</h1>
        <p className="mt-2 text-sm text-gray-700">A tárgy és a felhasználói ID zárolva van, csak a bizonyítékot kell megadnod.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-gray-300 bg-white p-5">
        <div>
          <label className="mb-1 block text-sm text-gray-700">Tárgy</label>
          <input value={itemLabel} readOnly className="w-full border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-700">Felhasználói ID</label>
          <input value={userId} readOnly className="w-full border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-700">Miért gondolod, hogy a tiéd?</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-32 w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" rows={6} placeholder="Írd le a felismerhető részleteket." />
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button type="submit" disabled={sending} className="border border-gray-400 bg-white px-4 py-2 text-sm font-bold text-gray-900 disabled:opacity-60">
          {sending ? "Küldés..." : "Elküldés"}
        </button>
      </form>
    </div>
  );
}
