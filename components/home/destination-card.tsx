import Link from "next/link";
import type { Destination } from "@/lib/content/destinations";
import { VisualPanel } from "./visual-panel";

export function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Link
      href={destination.href}
      className="group relative block h-[250px] overflow-hidden no-underline"
    >
      {/* Destination image / visual */}
      <VisualPanel
        label={destination.imageAlt}
        tone={destination.tone}
        className="absolute inset-0 h-full w-full rounded-none shadow-none transition-transform duration-700 ease-out motion-safe:group-hover:scale-110"
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15" />

      {/* Destination name */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-heading text-lg font-semibold leading-tight text-white drop-shadow-md">
          {destination.name}
        </h3>

        <p className="mt-1 max-h-0 overflow-hidden text-xs text-white/90 opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100">
          {destination.region}
        </p>
      </div>

      {/* Small hover arrow */}
      <span className="absolute bottom-4 right-4 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/15 text-sm text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}