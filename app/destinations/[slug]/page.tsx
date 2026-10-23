import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetailView } from "@/components/destinations/destination-detail-view";
import { getDestinationDetailView } from "@/lib/content/destination-detail";
import { siteConfig } from "@/lib/site";

type DestinationDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: DestinationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getDestinationDetailView(slug);
  if (!model) return { title: `Destinations | ${siteConfig.name}` };

  return {
    title: `${model.name} | ${siteConfig.name}`,
    description: model.summary || undefined,
  };
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { slug } = await params;
  const model = getDestinationDetailView(slug);
  if (!model) notFound();

  return <DestinationDetailView model={model} slug={slug} />;
}
