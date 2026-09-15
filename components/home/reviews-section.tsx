import { Card, Container, Section, SectionHeading } from "@/components/ui";
import { homeReviews } from "@/lib/content/home";

export function ReviewsSection() {
  return (
    <Section className="bg-sky/40" aria-labelledby="home-reviews-heading">
      <Container>
        <SectionHeading
          id="home-reviews-heading"
          eyebrow={homeReviews.eyebrow}
          heading={homeReviews.heading}
          description={homeReviews.description}
        />
        <Card
          elevated
          className="mt-10 border-dashed border-border bg-surface/80 p-8 md:p-10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="max-w-xl">
              <p className="font-heading text-base font-semibold text-primary">
                {homeReviews.emptyTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {homeReviews.emptyBody}
              </p>
            </div>
            <div
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-heading text-small font-semibold text-muted"
              aria-hidden="true"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-md bg-sky font-heading text-xs font-bold text-primary">
                G
              </span>
              Google Reviews
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
