"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconClose } from "@/components/layout/icons";
import { cn } from "@/components/ui/cn";
import { destinationDetailCopy } from "@/lib/content/destination-detail";

export type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

export function DestinationGallery({ images }: { images: readonly GalleryImage[] }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const active = images[index];

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = triggerRef.current;
    closeRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => Math.min(current + 1, images.length - 1));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => Math.max(current - 1, 0));
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [open, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        {images.map((image, imageIndex) => (
          <li
            key={`${image.src}-${imageIndex}`}
            className={cn(
              "relative min-h-36",
              imageIndex === 0
                ? "col-span-2 aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-full"
                : "aspect-[4/3]",
            )}
          >
            <button
              type="button"
              aria-label={`Open photo: ${image.label}`}
              className="group absolute inset-0 overflow-hidden rounded-[var(--radius-lg)] focus-visible:outline-none"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setIndex(imageIndex);
                setOpen(true);
              }}
            >
              <img
                src={image.src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                loading={imageIndex === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="absolute inset-x-0 bottom-0 bg-dark/45 px-3 py-2 text-left text-sm font-medium text-on-dark">
                {image.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-dark/70 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={destinationDetailCopy.lightboxLabel}
            className="w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-dark shadow-lg">
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[min(70vh,36rem)] w-full object-contain"
              />
              <button
                ref={closeRef}
                type="button"
                className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-surface text-primary shadow-sm"
                aria-label={destinationDetailCopy.closeLabel}
                onClick={() => setOpen(false)}
              >
                <IconClose className="size-4" />
              </button>
            </div>
            {images.length > 1 ? (
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="btn btn-outline !min-h-10 bg-surface px-4"
                  onClick={() => setIndex((current) => Math.max(current - 1, 0))}
                  disabled={index === 0}
                >
                  <IconChevronDown className="size-4 rotate-90" />
                  {destinationDetailCopy.previousLabel}
                </button>
                <p className="text-sm text-on-dark">
                  {index + 1} / {images.length}
                </p>
                <button
                  type="button"
                  className="btn btn-outline !min-h-10 bg-surface px-4"
                  onClick={() => setIndex((current) => Math.min(current + 1, images.length - 1))}
                  disabled={index === images.length - 1}
                >
                  {destinationDetailCopy.nextLabel}
                  <IconChevronDown className="size-4 -rotate-90" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
