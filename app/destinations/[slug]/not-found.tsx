import Link from "next/link";
import { Container } from "@/components/ui";
import { destinationDetailCopy } from "@/lib/content/destination-detail";

export default function DestinationNotFound() {
  return (
    <div className="bg-surface py-16">
      <Container className="max-w-2xl">
        <h1 className="text-primary">{destinationDetailCopy.notFoundTitle}</h1>
        <p className="mt-3 text-muted">{destinationDetailCopy.notFoundBody}</p>
        <Link href="/destinations" className="btn btn-primary mt-6 inline-flex">
          {destinationDetailCopy.notFoundCta}
        </Link>
      </Container>
    </div>
  );
}
