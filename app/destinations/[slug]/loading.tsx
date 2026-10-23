import { Container } from "@/components/ui";

export default function DestinationDetailLoading() {
  return (
    <div className="overflow-x-clip bg-surface" aria-busy="true" aria-label="Loading destination">
      <div className="min-h-[32rem] animate-pulse bg-dark md:min-h-[38rem] lg:min-h-[42rem]" />
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_15.5rem] lg:grid-cols-[minmax(0,1fr)_18.5rem]">
          <div className="space-y-4">
            <div className="h-8 w-40 animate-pulse rounded bg-border" />
            <div className="h-4 w-full animate-pulse rounded bg-border" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-border" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-border" />
            <div className="mt-8 aspect-[16/10] animate-pulse rounded-[var(--radius-lg)] bg-border" />
          </div>
          <div className="h-80 animate-pulse rounded-[var(--radius-lg)] bg-border" />
        </div>
      </Container>
    </div>
  );
}
