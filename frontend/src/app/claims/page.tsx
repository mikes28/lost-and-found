"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { createClaim } from "@/lib/api";

type State = "idle" | "loading" | "success" | "error";

export default function ClaimsPage() {
  const [form, setForm] = useState({ itemId: "", userId: "", message: "" });
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.itemId || isNaN(Number(form.itemId)) || Number(form.itemId) <= 0) e.itemId = "Érvényes tárgy ID szükséges";
    if (!form.userId || isNaN(Number(form.userId)) || Number(form.userId) <= 0) e.userId = "Érvényes felhasználói ID szükséges";
    if (!form.message.trim() || form.message.length < 10) e.message = "Legalább 10 karakter szükséges";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    try {
      await createClaim({ item_id: Number(form.itemId), user_id: Number(form.userId), message: form.message });
      setState("success");
      setForm({ itemId: "", userId: "", message: "" });
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div style={{
        maxWidth: "var(--w-narrow)", margin: "0 auto",
        padding: "var(--sp-24) var(--sp-6)",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", gap: "var(--sp-4)",
      }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%",
          background: "var(--success-hl)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--success)",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--text)", marginBottom: "var(--sp-2)" }}>
            Igénylés elküldve!
          </h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            A titkárság átnézi az igénylésedet és hamarosan felveszi veled a kapcsolatot.
          </p>
        </div>
        <Button variant="secondary" onClick={() => setState("idle")} style={{ marginTop: "var(--sp-2)" }}>
          Újabb igénylés
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "var(--w-narrow)", margin: "0 auto", padding: "var(--sp-10) var(--sp-6)" }}>
      <div style={{ marginBottom: "var(--sp-8)" }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)", fontWeight: 400,
          color: "var(--text)", letterSpacing: "-0.02em", marginBottom: "var(--sp-2)",
        }}>
          Tárgy igénylése
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Ha felismered valamelyik talált tárgyat, töltsd ki az alábbi űrlapot. A titkárság ellenőrzi az igénylést.
        </p>
      </div>

      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--r-2xl)", padding: "var(--sp-6)", boxShadow: "var(--shadow-sm)",
      }}>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-5)" }}>
          <Input
            label="Tárgy azonosítója"
            type="number" min="1" placeholder="pl. 3"
            value={form.itemId} onChange={e => setForm({ ...form, itemId: e.target.value })}
            error={errors.itemId}
            hint="Az ID a tárgy kártyáján látható"
          />
          <Input
            label="Felhasználói ID"
            type="number" min="1" placeholder="pl. 42"
            value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })}
            error={errors.userId}
            hint="Az iskolai rendszerben kiosztott azonosítód"
          />
          <Textarea
            label="Bizonyíték / leírás"
            placeholder="Írd le pontosan, mi alapján azonosítod a tárgyat. Pl. milyen felirat, jel, sérülés van rajta, hol és mikor vesztetted el…"
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            error={errors.message}
          />

          {state === "error" && (
            <div style={{
              background: "var(--error-hl)", color: "var(--error)",
              padding: "var(--sp-3) var(--sp-4)", borderRadius: "var(--r-md)",
              fontSize: "var(--text-sm)", display: "flex", alignItems: "center", gap: "var(--sp-2)",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              Hiba történt. Kérjük próbáld újra.
            </div>
          )}

          <Button type="submit" loading={state === "loading"} style={{ marginTop: "var(--sp-1)" }}>
            Igénylés elküldése
          </Button>
        </form>
      </div>
    </div>
  );
}
