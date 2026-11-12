"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export function DepthScene({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--depth-x", `${x * 5}deg`);
      ref.current?.style.setProperty("--depth-y", `${-y * 4}deg`);
    });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--depth-x", "0deg");
    ref.current?.style.setProperty("--depth-y", "0deg");
  }
  return <div ref={ref} className={`depth-scene ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}
