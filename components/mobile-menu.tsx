"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileMenu({ nav, inquiryHref }: { nav: Array<{ href: string; label: string }>; inquiryHref: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  return <details className="mobile-menu" ref={details} onKeyDown={event => { if (event.key === "Escape" && details.current) { details.current.open = false; details.current.querySelector("summary")?.focus(); } }}>
    <summary aria-label="Abrir menú"><span /><span /></summary>
    <nav aria-label="Navegación móvil" onClick={event => { if ((event.target as Element).closest("a") && details.current) details.current.open = false; }}>
      {nav.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      <Link href={inquiryHref}>Consultar mi estadía</Link>
    </nav>
  </details>;
}
