import Link from "next/link";
import { Container } from "@/components/ui";
import { blogPageCopy } from "@/lib/content/blog-page";

export default function BlogArticleNotFound() {
  const copy = blogPageCopy.article;

  return (
    <div className="bg-surface py-16">
      <Container className="max-w-2xl">
        <h1 className="text-primary">{copy.notFoundTitle}</h1>
        <p className="mt-3 text-muted">{copy.notFoundBody}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/blog" className="btn btn-primary">
            Blog
          </Link>
          <Link href="/" className="btn btn-outline">
            Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
