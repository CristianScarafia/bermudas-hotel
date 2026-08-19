"use client";

import { useEffect, useRef, useState } from "react";

type OpenPhoto = {
  src: string;
  alt: string;
};

const excludedPhotoSelector = ".hero, .page-hero, header, [data-no-lightbox]";

function isExpandablePhoto(target: EventTarget | null): target is HTMLImageElement {
  return target instanceof HTMLImageElement
    && Boolean(target.closest("main"))
    && !target.closest(excludedPhotoSelector)
    && Boolean(target.alt.trim());
}

export function PhotoLightbox() {
  const [photo, setPhoto] = useState<OpenPhoto | null>(null);
  const triggerRef = useRef<HTMLImageElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const prepareImages = () => {
      document.querySelectorAll<HTMLImageElement>("main img").forEach((image) => {
        if (!isExpandablePhoto(image)) return;
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `Ampliar foto: ${image.alt}`);
        image.dataset.lightboxEnabled = "true";
      });
    };

    const openImage = (image: HTMLImageElement) => {
      triggerRef.current = image;
      setPhoto({
        src: image.getAttribute("src") || image.currentSrc,
        alt: image.alt,
      });
    };

    const handleClick = (event: MouseEvent) => {
      if (!isExpandablePhoto(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
      openImage(event.target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isExpandablePhoto(event.target) || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      openImage(event.target);
    };

    prepareImages();
    const observer = new MutationObserver(prepareImages);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!photo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPhoto(null);
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleDialogKeyDown);
      triggerRef.current?.focus();
    };
  }, [photo]);

  if (!photo) return null;

  return (
    <div
      className="photo-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${photo.alt}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setPhoto(null);
      }}
    >
      <button
        ref={closeButtonRef}
        className="photo-lightbox-close"
        type="button"
        aria-label="Cerrar foto ampliada"
        onClick={() => setPhoto(null)}
      >
        <span aria-hidden="true">×</span>
      </button>
      <figure className="photo-lightbox-frame">
        {/* The original local asset is shown without runtime optimization. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={photo.alt} />
        <figcaption>{photo.alt}</figcaption>
      </figure>
    </div>
  );
}
