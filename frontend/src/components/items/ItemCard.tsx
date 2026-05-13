"use client";
import Image from "next/image";
import { useState } from "react";
import type { Item } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ClaimModal from "@/components/claims/ClaimModal";

export default function ItemCard({ item }: { item: Item }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <article
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: "var(--shadow-xs)",
          transition: "box-shadow var(--ease), transform var(--ease), border-color var(--ease)",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "var(--shadow-md)";
          el.style.transform = "translateY(-2px)";
          el.style.borderColor = "var(--border-strong)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "var(--shadow-xs)";
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
        }}
      >
        {/* Image */}
        <div style={{
          width: "100%", aspectRatio: "4/3",
          background: "var(--surface-off)",
          position: "relative", overflow: "hidden",
          flexShrink: 0,
        }}>
          {item.image_url ? (
            <Image
              src={item.image_url} alt={item.title} fill
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              style={{ objectFit: "cover" }} loading="lazy"
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "var(--sp-2)", color: "var(--text-faint)",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
              <span style={{ fontSize: "var(--text-xs)" }}>Nincs kép</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: "var(--sp-4)",
          display: "flex", flexDirection: "column", gap: "var(--sp-3)", flex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--sp-3)" }}>
            <h3 style={{
              fontSize: "var(--text-base)", fontWeight: 600,
              color: "var(--text)", lineHeight: 1.3,
            }}>
              {item.title}
            </h3>
            <Badge status={item.status}/>
          </div>

          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.55, flex: 1 }}>
            {item.description}
          </p>

          {item.status === "talált" && (
            <div style={{ paddingTop: "var(--sp-1)", borderTop: "1px solid var(--divider)" }}>
              <Button variant="secondary" size="sm" onClick={() => setModal(true)}>
                Ez az enyém
              </Button>
            </div>
          )}
        </div>
      </article>

      {modal && <ClaimModal item={item} onClose={() => setModal(false)}/>}
    </>
  );
}
