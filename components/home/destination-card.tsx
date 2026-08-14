import Link from "next/link";
import { Card } from "@/components/ui";
import type { Destination } from "@/lib/content/destinations";
import { VisualPanel } from "./visual-panel";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <Link href={destination.href} className="flex h-full flex-col no-underline">
        <VisualPanel
          label={destination.imageAlt}
          tone={destination.tone}
          className="aspect-4/3 rounded-none shadow-none transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
        />
        <div className="flex flex-1 flex-col p-5">
          <p className="font-heading text-small font-medium tracking-wide text-secondary uppercase">
            {destination.region}
          </p>
          <h3 className="mt-1 font-heading text-lg font-semibold text-primary">
            {destination.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {destination.summary}
          </p>
          <span className="mt-4 text-sm font-semibold text-secondary group-hover:text-primary">
            Explore {destination.name}
          </span>
        </div>
      </Link>
    </Card>
  );
}
