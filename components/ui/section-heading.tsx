import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type SectionHeadingAlign = "left" | "center";

export type SectionHeadingProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> & {
  eyebrow?: ReactNode;
  heading: ReactNode;
  description?: ReactNode;
  align?: SectionHeadingAlign;
  /** Heading level for the main title. Defaults to h2. */
  as?: "h1" | "h2" | "h3" | "h4";
};

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  as: HeadingTag = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        align === "left" && "items-start text-left",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="font-heading text-small font-semibold tracking-wide text-secondary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag className="text-balance">{heading}</HeadingTag>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
