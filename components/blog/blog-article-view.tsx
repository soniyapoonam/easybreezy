import { InnerPageHero } from "@/components/layout";
import { Container } from "@/components/ui";
import {
  IconCalendarCheck,
  IconClock,
} from "@/components/layout/icons";
import { blogPageCopy } from "@/lib/content/blog-page";
import type { BlogPost } from "@/lib/wordpress/posts";
import {
  getWordpressBlogListing,
  getWordpressRelatedPosts,
} from "@/lib/wordpress/posts";
import { BlogArticleCard } from "./blog-article-card";
import { BlogCtaBanner } from "./blog-cta";
import { BlogShare } from "./blog-share";
import { BlogSidebar } from "./blog-sidebar";
import { BlogTableOfContents } from "./blog-toc";

const articleBodyClass =
  "blog-article-body max-w-none text-base leading-relaxed text-text " +
  "[&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:text-secondary " +
  "[&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:text-primary " +
  "[&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:text-primary " +
  "[&_p]:mt-4 [&_p]:leading-relaxed " +
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 " +
  "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 " +
  "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-sky/50 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic " +
  "[&_img]:mt-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[var(--radius-lg)] " +
  "[&_figcaption]:mt-2 [&_figcaption]:text-small [&_figcaption]:text-muted " +
  "[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-sky [&_th]:px-3 [&_th]:py-2 [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 " +
  "[&_strong]:font-semibold [&_em]:italic";

export async function BlogArticleView({ post }: { post: BlogPost }) {
  const copy = blogPageCopy.article;
  const [related, listing] = await Promise.all([
    getWordpressRelatedPosts(post, 3),
    getWordpressBlogListing({}),
  ]);
  const categories = listing.ok ? listing.categories : [];
  const recentPosts = listing.ok ? listing.recentPosts : [];

  return (
    <div className="bg-surface">
      <InnerPageHero
        headingId="blog-article-heading"
        parentBreadcrumb={{ label: "Blog", href: "/blog" }}
        breadcrumbLabel={post.title}
        eyebrow={post.categoryName || undefined}
        heading={post.title}
        scrollCue=""
        imageSrc={post.imageSrc ?? blogPageCopy.hero.imageSrc}
        imageAlt={post.imageAlt || blogPageCopy.hero.imageAlt}
      />

      <article>
        <Container className="py-12 md:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.7fr)] lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                {post.authorName ? <span>{post.authorName}</span> : null}
                {post.dateLabel ? (
                  <span className="inline-flex items-center gap-1.5">
                    <IconCalendarCheck className="size-3.5" />
                    {copy.publishedLabel} {post.dateLabel}
                  </span>
                ) : null}
                {post.modifiedLabel ? (
                  <span>
                    {copy.updatedLabel} {post.modifiedLabel}
                  </span>
                ) : null}
                {post.readingTimeLabel ? (
                  <span className="inline-flex items-center gap-1.5">
                    <IconClock className="size-3.5" />
                    {post.readingTimeLabel}
                  </span>
                ) : null}
              </div>

              {post.excerpt ? (
                <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                  {post.excerpt}
                </p>
              ) : null}

              {post.toc.length >= 2 ? (
                <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-sky/40 p-4">
                  <BlogTableOfContents
                    items={post.toc}
                    headingId="blog-toc-heading-article"
                  />
                </div>
              ) : null}

              {post.contentHtml ? (
                <div
                  className={`mt-8 ${articleBodyClass}`}
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              ) : (
                <p className="mt-8 text-muted">{post.excerpt}</p>
              )}

              <div className="mt-10">
                <BlogShare title={post.title} path={post.href} />
              </div>
            </div>

            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              query={{}}
              showCategoryCounts
            />
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section
          className="border-t border-border/80 py-12 md:py-16"
          aria-labelledby="blog-related-heading"
        >
          <Container>
            <h2
              id="blog-related-heading"
              className="font-heading text-2xl font-semibold text-primary md:text-3xl"
            >
              {copy.relatedHeading}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="h-full">
                  <BlogArticleCard post={item} ctaLabel="Read Article" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <BlogCtaBanner copy={copy.articleCta} />
    </div>
  );
}
