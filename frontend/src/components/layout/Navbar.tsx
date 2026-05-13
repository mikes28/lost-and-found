"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/",       label: "Tárgyak" },
  { href: "/claims", label: "Igénylés" },
  { href: "/admin",  label: "Admin" },
];

export default function Navbar() {
  const path = usePathname();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    document.documentElement.setAttribute("data-theme", mq.matches ? "dark" : "light");
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  };

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      height: "60px",
      background: scrolled ? "var(--surface)" : "var(--bg)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      transition: "background var(--ease), border-color var(--ease), box-shadow var(--ease)",
    }}>
      <div style={{
        maxWidth: "var(--w-wide)", margin: "0 auto",
        padding: "0 var(--sp-6)", height: "100%",
        display: "flex", alignItems: "center", gap: "var(--sp-8)",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", flexShrink: 0 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Lost & Found">
            <rect x="3" y="9" width="22" height="15" rx="3" stroke="var(--primary)" strokeWidth="1.6"/>
            <path d="M10 9V7a4 4 0 0 1 8 0v2" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="14" cy="17" r="2.2" fill="var(--primary)"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--text)", letterSpacing: "-0.01em" }}>
            Lost &amp; Found
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "var(--sp-1)", flex: 1 }}>
          {NAV.map(({ href, label }) => {
            const active = path === href;
            return (
              <Link key={href} href={href} style={{
                padding: "var(--sp-2) var(--sp-3)",
                borderRadius: "var(--r-md)",
                fontSize: "var(--text-sm)",
                fontWeight: active ? 500 : 400,
                color: active ? "var(--primary)" : "var(--text-muted)",
                background: active ? "var(--primary-subtle)" : "transparent",
              }}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Dark mode toggle */}
        <button onClick={toggle} aria-label="Téma váltás" style={{
          width: "36px", height: "36px", borderRadius: "var(--r-md)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text-muted)",
        }}>
          {dark
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>
      </div>
    </header>
  );
}
