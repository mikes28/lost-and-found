"use client";
import { useEffect, useState, useCallback } from "react";
import type { Item } from "@/types";
import { MOCK_ITEMS } from "@/lib/mock-data";
import ItemGrid from "@/components/items/ItemGrid";
import ItemFilters from "@/components/items/ItemFilters";
import ItemSkeleton from "@/components/items/ItemSkeleton";

type Filter = "all" | Item["status"];

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => { setItems(MOCK_ITEMS); setLoading(false); }, 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = items.filter(item => {
    const matchFilter = filter === "all" || item.status === filter;
    const q = search.toLowerCase().trim();
    const matchSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = {
    all: items.length,
    talált: items.filter(i => i.status === "talált").length,
    visszaadva: items.filter(i => i.status === "visszaadva").length,
  };

  return (
    <div style={{ maxWidth: "var(--w-wide)", margin: "0 auto", padding: "var(--sp-10) var(--sp-6)" }}>
      <div style={{ marginBottom: "var(--sp-8)" }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)", fontWeight: 400,
          color: "var(--text)", letterSpacing: "-0.02em",
          marginBottom: "var(--sp-2)",
        }}>
          Talált tárgyak
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Felismered valamelyik tárgyat? Kattints az <strong style={{ color: "var(--text)", fontWeight: 500 }}>„Ez az enyém"</strong> gombra és küldj be egy igénylést.
        </p>
      </div>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: "var(--sp-3)",
        alignItems: "center", marginBottom: "var(--sp-6)",
      }}>
        <ItemFilters current={filter} counts={counts} onChange={setFilter}/>

        <div style={{ position: "relative", flex: 1, minWidth: "180px", maxWidth: "320px" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{
              position: "absolute", left: "var(--sp-3)", top: "50%",
              transform: "translateY(-50%)", color: "var(--text-faint)", pointerEvents: "none",
            }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search" placeholder="Keresés…"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", height: "38px",
              padding: "0 var(--sp-3) 0 calc(var(--sp-3) + 22px)",
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--r-md)",
              fontSize: "var(--text-sm)", color: "var(--text)", outline: "none",
              transition: "border-color var(--ease), box-shadow var(--ease)",
            }}
            onFocus={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-subtle)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>

        {!loading && (
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)", fontVariantNumeric: "tabular-nums", marginLeft: "auto" }}>
            {filtered.length} tárgy
          </span>
        )}
      </div>

      {loading ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
          gap: "var(--sp-5)",
        }}>
          {Array.from({ length: 6 }).map((_, i) => <ItemSkeleton key={i}/>)}
        </div>
      ) : (
        <ItemGrid items={filtered}/>
      )}
    </div>
  );
}
