import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
};

export function Section({
  as: Comp = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp className={cn("section", className)} {...props}>
      {children}
    </Comp>
  );
}
