"use client";

import { IconHeart } from "@/components/layout/icons";

export function DestinationFavoriteButton({ name }: { name: string }) {
  return (
    <button
      type="button"
      aria-label={`Save ${name} as a favourite`}
      className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-sm transition duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <IconHeart className="size-4" />
    </button>
  );
}
