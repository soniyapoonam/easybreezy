import { Container } from "@/components/ui";

export default function BlogArticleLoading() {
  return (
    <div className="bg-surface" aria-busy="true" aria-label="Loading article">
      <div className="min-h-[32rem] animate-pulse bg-dark md:min-h-[38rem] lg:min-h-[42rem]" />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.7fr)]">
          <div className="space-y-4">
            <div className="h-4 w-48 animate-pulse rounded bg-border" />
            <div className="h-4 w-full animate-pulse rounded bg-border" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-border" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-border" />
            <div className="h-4 w-full animate-pulse rounded bg-border" />
          </div>
          <div className="space-y-4">
            <div className="h-12 animate-pulse rounded-full bg-border" />
            <div className="h-48 animate-pulse rounded-[var(--radius-lg)] bg-border" />
          </div>
        </div>
      </Container>
    </div>
  );
}
