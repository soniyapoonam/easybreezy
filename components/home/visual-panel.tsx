import { cn } from "@/components/ui/cn";
import { unsplashImages } from "@/lib/content/unsplash";

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
  ridge: `url('${unsplashImages.tones.ridge}')`,
  dusk: `url('${unsplashImages.tones.dusk}')`,
  pass: `url('${unsplashImages.tones.pass}')`,
  lake: `url('${unsplashImages.tones.lake}')`,
  temple: `url('${unsplashImages.tones.temple}')`,
  forest: `url('${unsplashImages.tones.forest}')`,
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
 * Photography frame. Renders a real <img> when imageSrc is set so Unsplash
 * URLs load reliably in the browser (CSS background alone can fail silently).
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
      className={cn(
        "relative overflow-hidden bg-cover bg-center bg-no-repeat",
        !imageSrc && toneClass[tone],
        className,
        "rounded-none",
      )}
      style={
        imageSrc
          ? undefined
          : {
              backgroundImage: toneBackgroundImage[tone],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
      }
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      ) : null}

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
