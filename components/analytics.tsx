"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function conversionEvent(anchor: HTMLAnchorElement) {
  const href = anchor.href;
  if (href.includes("wa.me/")) return "click_whatsapp";
  if (href.startsWith("tel:")) return "click_phone";
  if (href.includes("maps.google.com") || href.includes("google.com/maps")) return "open_map";
  if (href.startsWith("mailto:")) return "click_email";
  return null;
}

export function Analytics({ measurementId }: { measurementId?: string }) {
  useEffect(() => {
    if (!measurementId) return;
    const trackClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const eventName = conversionEvent(anchor);
      if (!eventName) return;
      window.gtag?.("event", eventName, {
        link_url: anchor.href,
        page_path: window.location.pathname,
        link_text: anchor.textContent?.trim().slice(0, 100),
      });
    };
    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [measurementId]);

  if (!measurementId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
