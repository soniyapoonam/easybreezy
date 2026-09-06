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

const toneBackgroundImage: Record<VisualTone, string> = {
  ridge:
    "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
  dusk:
    "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
  pass:
    "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
  lake:
    "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
  temple:
    "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
  forest:
    "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
};

type VisualPanelProps = {
  label: string;
  tone?: VisualTone;
  className?: string;
  caption?: string;
  imageSrc?: string | null;
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
  imageSrc = null,
  cinematic = false,
}: VisualPanelProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden bg-cover bg-center bg-no-repeat",
        toneClass[tone],
        className,
        "rounded-none",
      )}
      style={{
        backgroundImage: imageSrc
          ? `url('${imageSrc}')`
          : toneBackgroundImage[tone],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
