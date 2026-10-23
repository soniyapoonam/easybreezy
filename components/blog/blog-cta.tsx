import Link from "next/link";
import { Container } from "@/components/ui";
import { blogPageCopy } from "@/lib/content/blog-page";

export function BlogCtaBanner({
  copy = blogPageCopy.cta,
}: {
  copy?: {
    eyebrow: string;
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
    script: string;
    imageSrc?: string;
    imageAlt?: string;
  };
}) {
  const cta = {
    imageSrc: blogPageCopy.cta.imageSrc,
    imageAlt: blogPageCopy.cta.imageAlt,
    ...copy,
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-dark"
      aria-labelledby="blog-cta-heading"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${cta.imageSrc}')` }}
        role="img"
        aria-label={cta.imageAlt}
      />
      <div className="absolute inset-0 bg-primary/60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_99_182_/_0.78)_0%,rgb(16_45_80_/_0.4)_58%,rgb(16_45_80_/_0.2)_100%)]"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-8 py-14 md:grid-cols-2 md:py-16 lg:py-20">
        <div className="max-w-xl">
          <p className="font-heading text-xs font-semibold tracking-[0.22em] text-on-dark/85 uppercase">
            {cta.eyebrow}
          </p>
          <h2 id="blog-cta-heading" className="mt-3 text-balance text-on-dark">
            {cta.heading}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-on-dark/88">
            {cta.body}
          </p>
          <Link href={cta.buttonHref} className="btn btn-primary mt-6 inline-flex">
            {cta.buttonLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="hidden justify-end md:flex">
          <p className="max-w-xs rotate-[-8deg] text-right font-serif text-4xl leading-tight text-on-dark/90 italic lg:text-5xl">
            {cta.script}
          </p>
        </div>
      </Container>
    </section>
  );
}
