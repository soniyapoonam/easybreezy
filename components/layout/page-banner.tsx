"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui";
import { homeHero } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

const bannerImageSrc =
  homeHero.slides[0]?.imageSrc ??
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80";

function pageLabelFromPath(pathname: string): string | null {
  if (pathname === "/") return null;

  const navMatch = [...siteConfig.mainNav]
    .filter((item) => item.href !== "/")
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    );

  if (navMatch) return navMatch.label;

  if (
    pathname === siteConfig.bookingHref ||
    pathname.startsWith(`${siteConfig.bookingHref}/`)
  ) {
    return "Book Now";
  }

  const segment = pathname.split("/").filter(Boolean).at(-1);
  if (!segment) return null;
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function PageBanner() {
  const pathname = usePathname();
  const pageName = pageLabelFromPath(pathname);

  if (!pageName) return null;

  return (
    <section
      id="inner-page-banner"
      className="relative overflow-hidden bg-dark"
      aria-label={`${pageName} page banner`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bannerImageSrc}')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-dark/65"
        aria-hidden="true"
      />
      <Container className="relative flex min-h-48 flex-col items-center justify-center py-14 text-center md:min-h-56 md:py-16 lg:min-h-64 lg:py-20">
        <h1 className="text-on-dark">
          {pageName}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-3">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-small text-on-dark/85">
            <li>
              <Link href="/" className="text-on-dark/85 no-underline hover:text-highlight">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-on-dark" aria-current="page">
              {pageName}
            </li>
          </ol>
        </nav>
      </Container>
    </section>
  );
}
