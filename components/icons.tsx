import type { ReactNode, SVGProps } from "react";

type IconName =
  | "wifi"
  | "coffee"
  | "snow"
  | "safe"
  | "tv"
  | "bed"
  | "bath"
  | "map"
  | "phone"
  | "mail"
  | "whatsapp"
  | "arrow-right"
  | "arrow-up-right";

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  focusable: false,
  "aria-hidden": true,
};

export function SvgIcon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const paths: Record<IconName, ReactNode> = {
    wifi: <><path d="M3.5 9a13 13 0 0 1 17 0"/><path d="M6.8 12.3a8.2 8.2 0 0 1 10.4 0"/><path d="M10 15.5a3.2 3.2 0 0 1 4 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></>,
    coffee: <><path d="M5 9h11v5.2A4.8 4.8 0 0 1 11.2 19H9.8A4.8 4.8 0 0 1 5 14.2V9Z"/><path d="M16 11h1.7a2.3 2.3 0 0 1 0 4.6H16"/><path d="M8 6.2c0-1 1-1.2 1-2.2M12 6.2c0-1 1-1.2 1-2.2"/><path d="M4 21h15"/></>,
    snow: <><path d="M12 2.7v18.6M4 7.3l16 9.4M4 16.7l16-9.4"/><path d="m9.5 4.2 2.5 2.3 2.5-2.3M9.5 19.8l2.5-2.3 2.5 2.3M4.5 10.3 7.7 9.5 7 6.3M19.5 13.7l-3.2.8.7 3.2M4.5 13.7l3.2.8-.7 3.2M19.5 10.3l-3.2-.8.7-3.2"/></>,
    safe: <><rect x="3.5" y="4" width="17" height="16" rx="2"/><rect x="6.5" y="7" width="11" height="10" rx="1"/><circle cx="12" cy="12" r="2.3"/><path d="M12 9.7v4.6M9.7 12h4.6M17.5 8.5h1.2M17.5 15.5h1.2"/></>,
    tv: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="m8.5 2.8 3.5 3.1 3.5-3.1M8.5 22h7"/></>,
    bed: <><path d="M3 19V8M21 19v-6.2a2 2 0 0 0-2-2H8.5A2.5 2.5 0 0 0 6 13.3V16"/><path d="M3 16h18M6 10.8V8.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 12 8.5v2.3"/></>,
    bath: <><path d="M3 12h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2Z"/><path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4 2.5 2.5 0 0 1 11 6.5M9.5 6.5H12M7 20v2M17 20v2"/></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <path d="M8.2 3.5 10 7.8 7.8 9.4a15.3 15.3 0 0 0 6.8 6.8L16.2 14l4.3 1.8-.5 4a2 2 0 0 1-2 1.7C9.4 21.5 2.5 14.6 2.5 6a2 2 0 0 1 1.7-2l4-.5Z"/>,
    mail: <><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    whatsapp: <><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z"/><path d="M8.3 7.5c.3-.4.7-.4 1-.1l1 1.7c.2.3.1.7-.1.9l-.7.7a7.4 7.4 0 0 0 3.8 3.8l.7-.8c.3-.3.6-.3 1-.1l1.7 1c.3.2.4.6.2.9-.6 1-1.5 1.4-2.6 1.2-4-.7-7.8-4.4-8.4-8.3-.2-1.1.5-1.7 1.4-2Z"/></>,
    "arrow-right": <><path d="M4 12h16M14 6l6 6-6 6"/></>,
    "arrow-up-right": <><path d="M6 18 18 6M9 6h9v9"/></>,
  };

  return <svg {...common} {...props}>{paths[name]}</svg>;
}

export type { IconName };
