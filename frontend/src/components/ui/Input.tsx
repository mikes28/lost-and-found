"use client";
import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, hint, id, ...p }, ref) => {
  const uid = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-1)" }}>
      {label && (
        <label htmlFor={uid} style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text)" }}>
          {label}
        </label>
      )}
      <input
        ref={ref} id={uid}
        style={{
          height: "40px",
          padding: "0 var(--sp-3)",
          background: "var(--surface)",
          border: `1.5px solid ${error ? "var(--error)" : "var(--border)"}`,
          borderRadius: "var(--r-md)",
          fontSize: "var(--text-sm)",
          color: "var(--text)",
          width: "100%",
          outline: "none",
          transition: "border-color var(--ease), box-shadow var(--ease)",
        }}
        onFocus={e => { e.currentTarget.style.borderColor = error ? "var(--error)" : "var(--primary)"; e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? "var(--error-hl)" : "var(--primary-subtle)"}`; }}
        onBlur={e => { e.currentTarget.style.borderColor = error ? "var(--error)" : "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
        {...p}
      />
      {hint && !error && <span style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>{hint}</span>}
      {error && <span style={{ fontSize: "var(--text-xs)", color: "var(--error)" }}>{error}</span>}
    </div>
  );
});
Input.displayName = "Input";
export default Input;
