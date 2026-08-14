import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
} as const;

export type ButtonVariant = keyof typeof variantClass;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={cn("btn", variantClass[variant], className)}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span
          className="inline-block size-4 shrink-0 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin"
          aria-hidden="true"
        />
      ) : null}
      <span className={cn(isLoading && "opacity-90")}>{children}</span>
    </button>
  );
}
