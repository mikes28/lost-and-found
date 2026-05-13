"use client";
import type { Item } from "@/types";

type Filter = "all" | Item["status"];

interface Props {
  current: Filter;
  counts: { all: number; talált: number; visszaadva: number };
  onChange: (f: Filter) => void;
}

const OPTIONS: [string, Filter][] = [
  ["Összes", "all"],
  ["Talált", "talált"],
  ["Visszaadva", "visszaadva"],
];

export default function ItemFilters({ current, counts, onChange }: Props) {
  return (
    <div style={{
      display: "flex", gap: "2px",
      background: "var(--surface-off)",
      padding: "3px", borderRadius: "var(--r-lg)",
    }}>
      {OPTIONS.map(([label, val]) => {
        const active = current === val;
        return (
          <button key={val} onClick={() => onChange(val)} style={{
            padding: "var(--sp-2) var(--sp-4)",
            borderRadius: "calc(var(--r-lg) - 3px)",
            fontSize: "var(--text-sm)", fontWeight: active ? 500 : 400,
            color: active ? "var(--text)" : "var(--text-muted)",
            background: active ? "var(--surface)" : "transparent",
            boxShadow: active ? "var(--shadow-sm)" : "none",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "var(--sp-2)",
            transition: "all var(--ease)",
          }}>
            {label}
            <span style={{
              fontSize: "11px", fontVariantNumeric: "tabular-nums", fontWeight: 500,
              background: active ? "var(--primary-subtle)" : "transparent",
              color: active ? "var(--primary)" : "var(--text-faint)",
              padding: "0 6px", borderRadius: "var(--r-full)",
              minWidth: "20px", textAlign: "center",
            }}>
              {counts[val]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
