import { Container } from "@/components/ui";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border" aria-hidden="true">
      <div className="aspect-[16/10] animate-pulse bg-sky" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-border" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-border" />
        <div className="h-4 w-full animate-pulse rounded bg-border" />
      </div>
    </div>
  );
}

export function BlogListingSkeleton() {
  return (
    <div className="bg-surface py-12 md:py-16" aria-busy="true" aria-label="Loading travel stories">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.7fr)]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-11 animate-pulse rounded-full bg-border" />
            <div className="h-40 animate-pulse rounded-lg bg-border" />
            <div className="h-48 animate-pulse rounded-lg bg-border" />
          </div>
        </div>
      </Container>
    </div>
  );
}
