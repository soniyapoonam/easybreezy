import { cn } from "@/components/ui/cn";

export type VisualTone =
  | "ridge"
  | "dusk"
  | "pass"
  | "lake"
  | "temple"
  | "forest";

const toneClass: Record<VisualTone, string> = {
  ridge: "from-primary via-secondary to-dark",
  dusk: "from-dark via-primary to-secondary",
  pass: "from-secondary via-primary to-dark",
  lake: "from-secondary to-dark",
  temple: "from-primary to-dark",
  forest: "from-dark via-secondary to-primary",
};

type VisualPanelProps = {
  label: string;
  tone?: VisualTone;
  className?: string;
  caption?: string;
  /** Stronger vignette for hero / cinematic frames */
  cinematic?: boolean;
};

/**
 * Photography-ready frame. When imageSrc is supplied later, swap the
 * inner gradient for next/image without changing section layout.
 */
export function VisualPanel({
  label,
  tone = "ridge",
  className,
  caption,
  cinematic = false,
}: VisualPanelProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden bg-linear-to-br",
        toneClass[tone],
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-highlight/12 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 size-80 rounded-full bg-sky/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 2px, rgb(255 255 255 / 0.4) 2px, rgb(255 255 255 / 0.4) 3px)",
        }}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          cinematic
            ? "bg-linear-to-t from-dark/70 via-dark/20 to-dark/10"
            : "bg-linear-to-t from-dark/55 via-transparent to-transparent",
        )}
        aria-hidden="true"
      />
      {caption ? (
        <p className="absolute bottom-5 left-5 font-heading text-small font-medium tracking-wide text-on-dark/90 drop-shadow-sm">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
