"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/responsive-image";
import { useHydrated } from "@/components/use-hydrated";
import { imageSource } from "@/lib/image-info";

type Photo = { src: string; alt: string };

function retryFullSource(image: HTMLImageElement, src: string) {
  if (image.dataset.fullSourceFallback) return;
  image.dataset.fullSourceFallback = "true";
  image.removeAttribute("srcset");
  image.src = imageSource(src);
}

export function PhotoGallery({ photos, compact = false }: { photos: Photo[]; compact?: boolean }) {
  const id = useId();
  const hydrated = useHydrated();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!hydrated) return;
    // A cached or very fast failure can happen before React attaches onError.
    thumbnails.current?.querySelectorAll("img").forEach((image, index) => {
      if (image.complete && image.naturalWidth === 0 && photos[index]) retryFullSource(image, photos[index].src);
    });
  }, [hydrated, photos]);
  if (!photos.length) return null;
  function move(delta: number) { setSelected(i => (i + delta + photos.length) % photos.length); }
  return <>
    <div ref={thumbnails} className={compact ? "gallery-thumbnails" : "explicit-gallery"} data-ready={hydrated}>
      {photos.map((photo, index) => <button type="button" className="gallery-photo" key={photo.src} disabled={!hydrated} aria-label={`Ampliar foto: ${photo.alt}`} onClick={event => { trigger.current = event.currentTarget; setSelected(index); setOpened(true); dialog.current?.showModal(); }}>
        <ResponsiveImage src={photo.src} alt={photo.alt} width={1800} height={1350} sizes={compact ? "(max-width: 480px) 90px, 112px" : "(max-width: 600px) calc(100vw - 48px), (max-width: 1228px) calc((100vw - 64px) / 2), 579px"} onError={event => retryFullSource(event.currentTarget, photo.src)} />
        <span aria-hidden="true">{compact ? "+" : "Ampliar"}</span>
      </button>)}
    </div>
    <dialog ref={dialog} className="gallery-dialog" aria-labelledby={`${id}-caption`} onClose={() => { setOpened(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}>
      <div className="gallery-dialog-inner">
        <button className="gallery-close" type="button" aria-label="Cerrar galería" onClick={() => dialog.current?.close()}>Cerrar <span aria-hidden="true">×</span></button>
        {/* Full resolution is only requested when the user opens this dialog. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {opened && <img src={imageSource(photos[selected].src)} alt={photos[selected].alt} />}
        <div className="gallery-controls"><button type="button" aria-label="Foto anterior" onClick={() => move(-1)}>←</button><p id={`${id}-caption`} aria-live="polite">{selected + 1} / {photos.length} · {photos[selected].alt}</p><button type="button" aria-label="Foto siguiente" onClick={() => move(1)}>→</button></div>
      </div>
    </dialog>
  </>;
}
