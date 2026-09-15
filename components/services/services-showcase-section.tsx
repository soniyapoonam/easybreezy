import Link from "next/link";
import { Container } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import type { ServiceWithImage } from "@/lib/content/services-page";
import { siteConfig } from "@/lib/site";
import { Reveal } from "./reveal";
import { ServiceIcon } from "./service-icons";

function ServiceCta({ className }: { className?: string }) {
  return (
    <Link
      href={siteConfig.bookingHref}
      className={cn(
        "group/cta inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-secondary no-underline transition-colors hover:text-primary",
        className,
      )}
    >
      Plan this service
      <span
        className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transform-none"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}

function truncateWords(text: string, limit = 6) {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return `${words.slice(0, limit).join(" ")}...`;
}

function ServiceBlock({
  service,
  index,
  reverse = false,
}: {
  service: ServiceWithImage;
  index: number;
  reverse?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");
  const shortSummary = truncateWords(service.summary);

  return (
    <Reveal delay={index * 50} className="h-full">
      <article
        id={service.slug}
        className={cn(
          "group grid h-full min-h-[12rem] grid-cols-2 items-stretch gap-0 overflow-hidden rounded-[20px] border border-border/70 bg-surface shadow-sm transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-md motion-reduce:transform-none sm:min-h-[13rem] lg:min-h-[14rem]",
          reverse && "[&>div:first-child]:order-2 [&>div:last-child]:order-1",
        )}
      >
        <div className="relative h-full min-h-full overflow-hidden">
          <img
            src={service.imageSrc}
            alt={service.imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transform-none"
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              reverse
                ? "bg-linear-to-l from-dark/20 via-transparent to-transparent"
                : "bg-linear-to-r from-dark/20 via-transparent to-transparent",
            )}
            aria-hidden="true"
          />
        </div>

        <div className="flex h-full min-h-full flex-col p-5 lg:p-6">
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-heading text-sm font-bold tracking-[0.14em] text-secondary/45"
            >
              {number}
            </span>
            <div
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-sky text-primary transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <ServiceIcon serviceId={service.id} className="size-4" />
            </div>
          </div>
          <h3 className="mt-3 text-balance text-[20px] font-semibold leading-snug text-primary">
            {service.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {shortSummary}
          </p>
          <div className="mt-auto pt-4">
            <ServiceCta />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

type ServicesShowcaseSectionProps = {
  services: ServiceWithImage[];
};

export function ServicesShowcaseSection({
  services,
}: ServicesShowcaseSectionProps) {
  return (
    <section
      aria-labelledby="services-showcase-heading"
      className="relative overflow-hidden bg-linear-to-b from-sky/30 via-background to-background py-[var(--section-space)]"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-small font-semibold tracking-wide text-secondary uppercase">
              Our services
            </p>
            <h2 id="services-showcase-heading" className="mt-3 text-balance">
              Travel arranged the way you actually move.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Six ways we help—each described plainly, without a menu of extras
              you did not ask for.
            </p>
          </div>
        </Reveal>

        <div
          className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
        >
          {services.map((service, index) => (
            <ServiceBlock
              key={service.id}
              service={service}
              index={index}
              reverse={Math.floor(index / 3) % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
