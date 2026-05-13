export default function ItemSkeleton() {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--r-xl)", overflow: "hidden",
    }}>
      <div className="skeleton" style={{ aspectRatio: "4/3", width: "100%" }}/>
      <div style={{ padding: "var(--sp-4)", display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="skeleton" style={{ height: "1rem", width: "55%", borderRadius: "var(--r-sm)" }}/>
          <div className="skeleton" style={{ height: "1.4rem", width: "22%", borderRadius: "var(--r-full)" }}/>
        </div>
        <div className="skeleton" style={{ height: ".8rem", width: "100%", borderRadius: "var(--r-sm)" }}/>
        <div className="skeleton" style={{ height: ".8rem", width: "70%", borderRadius: "var(--r-sm)" }}/>
        <div className="skeleton" style={{ height: "2rem", width: "38%", marginTop: "var(--sp-1)", borderRadius: "var(--r-md)" }}/>
      </div>
    </div>
  );
}
