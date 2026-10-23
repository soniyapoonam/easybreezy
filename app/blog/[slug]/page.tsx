import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/blog/blog-article-view";
import { Container } from "@/components/ui";
import { blogPageCopy } from "@/lib/content/blog-page";
import { siteConfig } from "@/lib/site";
import { getWordpressPostBySlug } from "@/lib/wordpress/posts";

export const dynamic = "force-dynamic";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const lookup = await getWordpressPostBySlug(slug);
  if (!lookup.ok) {
    return { title: `Blog | ${siteConfig.name}` };
  }
  return {
    title: `${lookup.post.title} | ${siteConfig.name}`,
    description: lookup.post.excerpt || undefined,
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const lookup = await getWordpressPostBySlug(slug);

  if (!lookup.ok && lookup.reason === "missing") {
    notFound();
  }

  if (!lookup.ok) {
    return (
      <div className="bg-surface py-16">
        <Container className="max-w-2xl">
          <h1 className="text-primary">{blogPageCopy.article.errorTitle}</h1>
          <p className="mt-3 text-muted">{blogPageCopy.article.errorBody}</p>
          <Link href={`/blog/${slug}`} className="btn btn-primary mt-6 inline-flex">
            {blogPageCopy.retryLabel}
          </Link>
        </Container>
      </div>
    );
  }

  return <BlogArticleView post={lookup.post} />;
}
