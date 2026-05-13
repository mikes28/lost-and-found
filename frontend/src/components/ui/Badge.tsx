import type { Item } from "@/types";

export default function Badge({ status }: { status: Item["status"] }) {
  const found = status === "talált";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px var(--sp-2)",
      borderRadius: "var(--r-full)",
      fontSize: "var(--text-xs)", fontWeight: 500,
      background: found ? "var(--success-hl)" : "var(--surface-dyn)",
      color: found ? "var(--success)" : "var(--text-muted)",
    }}>
      <span style={{
        width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
        background: found ? "var(--success)" : "var(--text-faint)",
      }}/>
      {status}
    </span>
  );
}
