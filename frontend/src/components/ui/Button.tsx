"use client";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const styles: Record<Variant, object> = {
  primary:   { background: "var(--primary)",     color: "var(--text-inv)",  border: "1px solid transparent" },
  secondary: { background: "var(--surface-off)", color: "var(--text)",      border: "1px solid var(--border)" },
  ghost:     { background: "transparent",         color: "var(--text-muted)", border: "1px solid transparent" },
  danger:    { background: "var(--error-hl)",     color: "var(--error)",     border: "1px solid transparent" },
};

const sizes: Record<Size, object> = {
  sm: { padding: "var(--sp-1) var(--sp-3)", fontSize: "var(--text-xs)", height: "30px" },
  md: { padding: "0 var(--sp-5)",           fontSize: "var(--text-sm)", height: "38px" },
  lg: { padding: "0 var(--sp-6)",           fontSize: "var(--text-base)", height: "46px" },
};

export default function Button({ variant = "primary", size = "md", loading, disabled, children, style, ...p }: Props) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: "var(--sp-2)", borderRadius: "var(--r-md)", fontWeight: 500,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.6 : 1,
        whiteSpace: "nowrap",
        ...styles[variant], ...sizes[size], ...style,
      }}
      {...p}
    >
      {loading && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ animation: "spin 0.8s linear infinite" }}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      )}
      {children}
    </button>
  );
}
