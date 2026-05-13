"use client";
import { useEffect, useState } from "react";
import type { Item } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { createClaim } from "@/lib/api";

type State = "idle" | "loading" | "success" | "error";

export default function ClaimModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!userId.trim() || isNaN(Number(userId)) || Number(userId) <= 0) e.userId = "Érvényes felhasználói ID szükséges";
    if (!message.trim() || message.length < 10) e.message = "Legalább 10 karakter szükséges";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    try {
      await createClaim({ item_id: item.id, user_id: Number(userId), message });
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <div
      role="dialog" aria-modal="true" aria-labelledby="modal-title"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "var(--sp-4)",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--r-2xl)", boxShadow: "var(--shadow-xl)",
        width: "100%", maxWidth: "460px",
        padding: "var(--sp-6)",
        animation: "slideUp 0.2s ease",
        display: "flex", flexDirection: "column", gap: "var(--sp-5)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 id="modal-title" style={{ fontSize: "var(--text-base)", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>
              Ez az enyém
            </h2>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{item.title}</p>
          </div>
          <button onClick={onClose} aria-label="Bezárás" style={{
            width: "32px", height: "32px", borderRadius: "var(--r-md)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-muted)", flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--divider)", margin: "calc(-1 * var(--sp-2)) 0" }}/>

        {state === "success" ? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", padding: "var(--sp-8) var(--sp-4)", gap: "var(--sp-3)",
          }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: "var(--success-hl)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--success)",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>Igénylés elküldve!</p>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                A titkárság hamarosan felveszi veled a kapcsolatot.
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={onClose} style={{ marginTop: "var(--sp-2)" }}>
              Bezárás
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
            <Input
              label="Felhasználói ID"
              type="number" min="1"
              placeholder="pl. 42"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              error={errors.userId}
              hint="Az iskolai rendszerben kiosztott azonosítód"
            />
            <Textarea
              label="Bizonyíték / leírás"
              placeholder="Írd le, hogyan azonosítod a tárgyat. Pl. milyen felirat van rajta, hol vesztetted el…"
              value={message}
              onChange={e => setMessage(e.target.value)}
              error={errors.message}
            />
            {state === "error" && (
              <div style={{
                background: "var(--error-hl)", color: "var(--error)",
                padding: "var(--sp-3)", borderRadius: "var(--r-md)", fontSize: "var(--text-sm)",
                display: "flex", alignItems: "center", gap: "var(--sp-2)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                Hiba történt. Kérjük próbáld újra.
              </div>
            )}
            <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "flex-end", paddingTop: "var(--sp-1)" }}>
              <Button variant="ghost" type="button" onClick={onClose}>Mégse</Button>
              <Button variant="primary" type="submit" loading={state === "loading"}>
                Elküldés
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
