import Link from "next/link";
import { Card, Container, Section, SectionHeading } from "@/components/ui";
import { homeBlog } from "@/lib/content/home";

/**
 * BlogCard — reuse when WordPress posts are available.
 * Props shape mirrors future CMS fields without inventing content now.
 */
export type BlogCardProps = {
  title: string;
  excerpt: string;
  href: string;
  dateLabel?: string;
  imageAlt?: string;
};

export function BlogCard({ title, excerpt, href, dateLabel }: BlogCardProps) {
  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <div
        className="aspect-16/10 bg-linear-to-br from-primary via-secondary to-dark"
        role="img"
        aria-label={`Featured image for ${title}`}
      />
      <div className="flex flex-1 flex-col p-5">
        {dateLabel ? (
          <p className="font-heading text-small font-medium text-muted">
            {dateLabel}
          </p>
        ) : null}
        <h3 className="mt-1 font-heading text-lg font-semibold text-primary">
          <Link href={href} className="no-underline hover:text-secondary">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {excerpt}
        </p>
      </div>
    </Card>
  );
}

export function BlogSection() {
  return (
    <Section aria-labelledby="home-blog-heading">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="home-blog-heading"
            eyebrow={homeBlog.eyebrow}
            heading={homeBlog.heading}
            description={homeBlog.description}
          />
          <Link href={homeBlog.ctaHref} className="btn btn-outline shrink-0">
            {homeBlog.ctaLabel}
          </Link>
        </div>
        <Card
          className="mt-10 border-dashed border-border bg-surface/80 p-8 md:p-10"
          elevated
        >
          <p className="font-heading text-base font-semibold text-primary">
            {homeBlog.emptyTitle}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {homeBlog.emptyBody}
          </p>
        </Card>
      </Container>
    </Section>
  );
}
