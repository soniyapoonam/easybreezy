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
        "group/cta inline-flex items-center gap-2 font-heading text-sm font-semibold text-secondary no-underline transition-colors hover:text-primary",
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

  return (
    <Reveal delay={index * 50} className="h-full">
      <article
        id={service.slug}
        className={cn(
          "group grid h-full grid-cols-2 items-stretch gap-0 overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface shadow-md transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-xl motion-reduce:transform-none",
          reverse && "[&>div:first-child]:order-2 [&>div:last-child]:order-1",
        )}
      >
        <div className="relative h-full min-h-0 overflow-hidden">
          <img
            src={service.imageSrc}
            alt={service.imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transform-none"
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              reverse
                ? "bg-linear-to-l from-dark/25 via-transparent to-transparent"
                : "bg-linear-to-r from-dark/25 via-transparent to-transparent",
            )}
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col justify-center px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-8">
          <div className="flex items-center gap-4">
            <span
              className="font-heading text-sm font-bold tracking-[0.18em] text-secondary/50"
            >
              {number}
            </span>
            <div
              className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/10 bg-sky text-primary transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <ServiceIcon serviceId={service.id} className="size-5" />
            </div>
          </div>
          <h3 className="mt-5 text-balance">{service.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted lg:text-base">
            {service.summary}
          </p>
          <ServiceCta className="mt-6" />
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
  const rows = [
    services.slice(0, 2),
    services.slice(2, 4),
    services.slice(4, 6),
  ];

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

        <div className="mt-14 space-y-8 lg:mt-16">
          {rows.map((rowServices, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8"
            >
              {rowServices.map((service) => {
                const serviceIndex = services.findIndex(
                  (item) => item.id === service.id,
                );
                return (
                  <ServiceBlock
                    key={service.id}
                    service={service}
                    index={serviceIndex}
                    reverse={rowIndex % 2 === 1}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
