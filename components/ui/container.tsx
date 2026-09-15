import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
};

export function Container({
  as: Comp = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp className={cn("container-page", className)} {...props}>
      {children}
    </Comp>
  );
}
