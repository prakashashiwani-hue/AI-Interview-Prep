"use client";
import Link from "next/link";
import { useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  cta?: boolean; // Sign Up  → solid teal
  ctl?: boolean; // Log In  → ghost/outlined
}

export function NavLink({ href, children, cta, ctl }: NavLinkProps) {
  const [hov, setHov] = useState(false);

  const getColor = () => {
    if (cta) return "#000";
    if (ctl) return hov ? "#00e5b0" : "#f0f2f8";
    return hov ? "#f0f2f8" : "#6b7590";
  };

  const getBackground = () => {
    if (cta) return hov ? "rgba(0,229,176,0.85)" : "#00e5b0";
    return "transparent";
  };

  const getBorder = () => {
    if (ctl) return hov
      ? "1px solid rgba(0,229,176,0.6)"
      : "1px solid rgba(255,255,255,0.18)";
    return "none";
  };

  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        color: getColor(),
        textDecoration: "none",
        fontSize: "0.88rem",
        fontWeight: cta || ctl ? 700 : 600,
        letterSpacing: "0.02em",
        padding: cta || ctl ? "0.55rem 1.3rem" : "0",
        background: getBackground(),
        border: getBorder(),
        borderRadius: cta || ctl ? 7 : 0,
        transition: "all 0.2s",
        transform: (cta || ctl) && hov ? "translateY(-1px)" : "none",
        boxShadow: cta && hov ? "0 8px 24px rgba(0,229,176,0.25)" : "none",
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
}