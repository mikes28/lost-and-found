"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { alert("Töltsd ki mindkét mezőt!"); return; }
    alert("Backend még nem fut — login nem elérhető.");
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !name) { alert("Töltsd ki az összes mezőt!"); return; }
    alert("Backend még nem fut — regisztráció nem elérhető.");
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <div className="flex mb-6 border-b border-zinc-700">
        <button onClick={() => setTab("login")} className={`px-4 py-2 text-sm font-medium ${tab === "login" ? "text-white border-b-2 border-blue-500" : "text-zinc-400"}`}>
          Bejelentkezés
        </button>
        <button onClick={() => setTab("register")} className={`px-4 py-2 text-sm font-medium ${tab === "register" ? "text-white border-b-2 border-blue-500" : "text-zinc-400"}`}>
          Regisztráció
        </button>
      </div>

      {tab === "login" ? (
        <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" placeholder="pelda@iskola.hu"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Jelszó</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" placeholder="••••••••"/>
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700">Bejelentkezés</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Név</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" placeholder="Kovács Péter"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" placeholder="pelda@iskola.hu"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Jelszó</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500" placeholder="••••••••"/>
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700">Regisztráció</button>
        </form>
      )}
    </div>
  );
}