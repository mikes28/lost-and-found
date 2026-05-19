"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/session";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [osztaly, setOsztaly] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !osztaly) {
      alert("Töltsd ki a nevet es az osztalyt!");
      return;
    }

    signIn(name, osztaly);
    router.push("/");
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl border border-gray-300 bg-white p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Bejelentkezés</h1>
        <p className="mt-2 text-sm text-gray-700">Előbb be kell jelentkezni, utána lehet használni az oldalt.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-gray-300 bg-gray-50 p-4">
          <h2 className="text-base font-bold text-gray-900">Bejelentkezés / Regisztráció</h2>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Név</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" placeholder="Kovács Péter" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Osztály</label>
            <input type="text" value={osztaly} onChange={(e) => setOsztaly(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" placeholder="10.A" />
          </div>
          <button type="submit" className="border border-gray-400 bg-white px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100">Folytatás</button>
        </form>
      </div>
    </div>
  );
}