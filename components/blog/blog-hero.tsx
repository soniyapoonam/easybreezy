import { Container } from "@/components/ui";
import { IconPaperPlane } from "@/components/layout/icons";
import { blogPageCopy } from "@/lib/content/blog-page";

export function BlogHero() {
  const { hero } = blogPageCopy;

  return (
    <section
      className="relative isolate overflow-hidden bg-dark"
      aria-labelledby={hero.headingId}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${hero.imageSrc}')` }}
        role="img"
        aria-label={hero.imageAlt}
      />
      <div
        className="absolute inset-0 bg-primary/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_99_182_/_0.72)_0%,rgb(16_45_80_/_0.35)_55%,rgb(16_45_80_/_0.18)_100%)]"
        aria-hidden="true"
      />

      <Container className="relative grid min-h-[18rem] items-center gap-8 py-14 md:min-h-[22rem] md:grid-cols-2 md:py-16 lg:min-h-[24rem]">
        <div className="max-w-xl">
          <p className="font-heading text-xs font-semibold tracking-[0.22em] text-on-dark/85 uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id={hero.headingId}
            className="mt-3 max-w-lg text-balance text-on-dark"
          >
            {hero.heading}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-on-dark/88">
            {hero.body}
          </p>
        </div>
        <div className="hidden justify-end md:flex">
          <p className="max-w-xs rotate-[-8deg] text-right font-serif text-4xl leading-tight text-on-dark/90 italic lg:text-5xl">
            {hero.script}
            <IconPaperPlane className="ml-2 inline size-7 text-on-dark/80" />
          </p>
        </div>
      </Container>
    </section>
  );
}
