import Link from "next/link";
import { Container } from "@/components/ui";
import { blogPageCopy } from "@/lib/content/blog-page";
import {
  buildBlogPageUrl,
  getWordpressBlogListing,
  type BlogListingQuery,
} from "@/lib/wordpress/posts";
import { BlogArticleCard } from "./blog-article-card";
import { BlogPagination } from "./blog-pagination";
import { BlogSidebar } from "./blog-sidebar";
import { BlogSort } from "./blog-sort";

export async function BlogJournal({ query }: { query: BlogListingQuery }) {
  const result = await getWordpressBlogListing(query);

  if (!result.ok) {
    return (
      <div className="bg-surface py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.7fr)] lg:gap-12">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-primary">
                {blogPageCopy.errorTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-muted">{blogPageCopy.errorBody}</p>
              <Link href="/blog" className="btn btn-primary mt-6 inline-flex">
                {blogPageCopy.retryLabel}
              </Link>
            </div>
            <BlogSidebar
              categories={[]}
              recentPosts={[]}
              query={query}
              showCategoryCounts={false}
            />
          </div>
        </Container>
      </div>
    );
  }

  const hasQuery = Boolean(
    query.search?.trim() || (query.categorySlug && query.categorySlug !== "all"),
  );
  const empty = result.posts.length === 0;

  return (
    <div className="bg-surface py-12 md:py-16">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.7fr)] lg:gap-12">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                {blogPageCopy.resultsLabel} {result.rangeStart}–{result.rangeEnd}{" "}
                {blogPageCopy.ofLabel} {result.total} {blogPageCopy.articlesLabel}
              </p>
              <BlogSort query={query} />
            </div>

            {empty ? (
              <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-border bg-sky/40 p-8">
                <p className="font-heading text-lg font-semibold text-primary">
                  {hasQuery ? blogPageCopy.noResultsTitle : blogPageCopy.emptyTitle}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {hasQuery ? blogPageCopy.noResultsBody : blogPageCopy.emptyBody}
                </p>
                {hasQuery ? (
                  <Link
                    href={buildBlogPageUrl({})}
                    className="mt-4 inline-flex text-sm font-semibold text-primary no-underline hover:text-secondary"
                  >
                    {blogPageCopy.retryLabel}
                  </Link>
                ) : null}
              </div>
            ) : (
              <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {result.posts.map((post) => (
                  <li key={post.id} className="h-full">
                    <BlogArticleCard post={post} />
                  </li>
                ))}
              </ul>
            )}

            {result.showPagination ? (
              <BlogPagination
                currentPage={result.currentPage}
                totalPages={result.totalPages}
                query={query}
              />
            ) : null}
          </div>

          <BlogSidebar
            categories={result.categories}
            recentPosts={result.recentPosts}
            query={query}
            showCategoryCounts
          />
        </div>
      </Container>
    </div>
  );
}
