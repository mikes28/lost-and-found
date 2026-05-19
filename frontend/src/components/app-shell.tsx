"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { clearSession, getSession, type SessionUser } from "@/lib/session";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
    setReady(true);

    if (pathname !== "/login" && !currentSession) {
      router.replace("/login");
    }

    if (pathname === "/login" && currentSession) {
      router.replace("/");
    }
  }, [pathname, router]);

  const isLoginPage = pathname === "/login";

  const navLinks = useMemo(
    () => [
      { href: "/", label: "Tárgyak" },
      { href: "/admin", label: "Admin" },
    ],
    [],
  );

  if (!ready) {
    return <div className="min-h-screen bg-white" />;
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  if (!session) {
    return <div className="flex min-h-screen items-center justify-center bg-white text-gray-600">Átirányítás a bejelentkezéshez...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-300 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <div>
            <p className="text-sm font-bold">Lost & Found</p>
            <p className="text-xs text-gray-600">Bejelentkezve: {session.name} ({session.id})</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                clearSession();
                setSession(null);
                router.replace("/login");
              }}
              className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              Kijelentkezés
            </button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}