import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  elevated?: boolean;
  interactive?: boolean;
  children: ReactNode;
};

export function Card({
  as: Comp = "div",
  elevated = false,
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Comp
      className={cn(
        "card",
        elevated && "card-elevated",
        interactive && "card-interactive",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
