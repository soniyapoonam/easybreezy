import Link from "next/link";
import { Container, Section } from "@/components/ui";
import {
  destinationsPageList,
  destinationsPageMap,
} from "@/lib/content/destinations-page";
import { Reveal } from "@/components/services/reveal";

export function DestinationsMap() {
  return (
    <Section
      aria-labelledby="destinations-map-heading"
      className="bg-surface"
    >
      <Container>
        <Reveal>
          <h2 id="destinations-map-heading" className="text-balance">
            {destinationsPageMap.heading}
          </h2>
        </Reveal>

        <Reveal className="mt-10" delay={100}>
          <div
            className="relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(160deg,#eef6ff_0%,#f8fbff_45%,#edf3f9_100%)] p-6 shadow-md sm:p-8 md:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgb(11 99 182 / 0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgb(255 90 82 / 0.06), transparent 42%)",
              }}
            />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full text-primary/15"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M8 72 C 22 58, 34 64, 48 52 S 72 38, 92 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                className="destinations-map-route"
              />
              <path
                d="M18 34 C 30 42, 38 36, 52 28 S 68 56, 62 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.35"
                strokeDasharray="1.5 2"
                className="destinations-map-route"
                style={{ animationDelay: "1.2s" }}
              />
            </svg>

            <div className="relative aspect-[16/10] min-h-[16rem] sm:min-h-[20rem]">
              {destinationsPageList.map((destination) => (
                <Link
                  key={destination.slug}
                  href={destination.href}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 no-underline"
                  style={{
                    left: `${destination.mapPosition.x}%`,
                    top: `${destination.mapPosition.y}%`,
                  }}
                  aria-label={`Explore ${destination.name}`}
                >
                  <span
                    className="destinations-marker relative flex size-3 rounded-full bg-highlight shadow-[0_0_0_6px_rgb(255_90_82_/_0.18)] transition-transform duration-300 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full border border-border/70 bg-white/90 px-3 py-1 text-xs font-semibold text-primary opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:top-6 group-hover:opacity-100 group-focus-visible:top-6 group-focus-visible:opacity-100"
                  >
                    {destination.name}
                  </span>
                </Link>
              ))}

              <div
                className="destinations-float absolute bottom-4 left-4 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm shadow-md backdrop-blur-md sm:bottom-6 sm:left-6"
              >
                <p className="font-heading font-semibold text-primary">
                  {destinationsPageMap.label}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
