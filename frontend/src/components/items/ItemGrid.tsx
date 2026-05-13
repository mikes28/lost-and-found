import type { Item } from "@/types";
import ItemCard from "./ItemCard";

export default function ItemGrid({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "var(--sp-24) var(--sp-8)",
        color: "var(--text-muted)", textAlign: "center", gap: "var(--sp-3)",
      }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
          style={{ color: "var(--text-faint)" }}>
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <div>
          <p style={{ fontWeight: 500, color: "var(--text)", marginBottom: "4px" }}>Nincs találat</p>
          <p style={{ fontSize: "var(--text-sm)" }}>Próbálj más keresési feltételeket.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
      gap: "var(--sp-5)",
    }}>
      {items.map(item => <ItemCard key={item.id} item={item}/>)}
    </div>
  );
}
