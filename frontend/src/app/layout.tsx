import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Iskolai Lost & Found",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <nav className="bg-zinc-900 border-b border-zinc-700 px-6 py-3 flex gap-6">
          <Link href="/" className="font-semibold text-white hover:text-blue-400">Tárgyak</Link>
          <Link href="/claims" className="text-zinc-400 hover:text-blue-400">Igénylés</Link>
          <Link href="/admin" className="text-zinc-400 hover:text-blue-400">Admin</Link>
          <Link href="/login" className="text-zinc-400 hover:text-blue-400 ml-auto">Bejelentkezés</Link>
        </nav>
        <main className="p-6">{props.children}</main>
      </body>
    </html>
  );
}
