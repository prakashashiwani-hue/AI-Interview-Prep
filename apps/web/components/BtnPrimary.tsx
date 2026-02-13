"use client";
import { useState } from "react";

interface BtnPrimaryProps { children: React.ReactNode; large?: boolean; onClick?: () => void; }

export function BtnPrimary({ children, large, onClick }: BtnPrimaryProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: "var(--accent)", color: "#000",
        padding: large ? "1rem 2.8rem" : "0.85rem 2.2rem",
        borderRadius: 8, fontSize: large ? "1.1rem" : "1rem",
        fontWeight: 700, fontFamily: "var(--ff-body)",
        border: "none", cursor: "pointer",
        transform: hov ? "translateY(-2px)" : "none",
        opacity: hov ? 0.88 : 1, transition: "all 0.2s",
        boxShadow: hov ? "0 8px 30px rgba(0,229,176,0.25)" : "none",
      }}
    >
      {children}
    </button>
  );
}