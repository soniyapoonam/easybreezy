import Link from "next/link";
import { Card } from "@/components/ui";
import type { Service } from "@/lib/content/services";
import { VisualPanel } from "./visual-panel";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card
      interactive
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[32px]
        border border-primary/[0.09]
        bg-white
        shadow-[0_12px_45px_rgba(0,0,0,0.055)]
        transition-[transform,box-shadow,border-color]
        duration-700
        ease-[cubic-bezier(.16,1,.3,1)]
        hover:-translate-y-3
        hover:border-secondary/25
        hover:shadow-[0_30px_90px_rgba(0,0,0,0.12)]
      "
    >
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}

      <div
        className="
          pointer-events-none absolute
          -right-24 -top-24
          h-64 w-64 rounded-full
          bg-secondary/[0.07]
          blur-[80px]
          transition-all duration-1000
          ease-out
          group-hover:scale-[1.45]
          group-hover:bg-secondary/[0.12]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-28 -left-24
          h-72 w-72 rounded-full
          bg-primary/[0.045]
          blur-[90px]
          transition-all duration-1000
          ease-out
          group-hover:scale-[1.3]
        "
      />

      {/* =========================================================
          TOP META BAR
      ========================================================== */}

      {/* <div
        className="
          relative z-20
          flex items-center justify-between
          px-6 pt-6
          sm:px-7 sm:pt-7
        "
      >
      
        <div className="flex items-center gap-2.5">
          <span
            className="
              relative flex h-2.5 w-2.5
              items-center justify-center
            "
          >
            <span
              className="
                absolute inset-0 rounded-full
                bg-secondary/20
                blur-[3px]
                transition-all duration-500
                group-hover:scale-[2]
              "
            />

            <span
              className="
                relative h-1.5 w-1.5
                rounded-full
                bg-secondary
                transition-all duration-500
                group-hover:scale-125
              "
            />
          </span>

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-primary/45
              transition-colors duration-500
              group-hover:text-secondary
            "
          >
            Service
          </span>
        </div>

       
        <span
          className="
            font-heading
            text-[11px]
            font-semibold
            tracking-[0.18em]
            text-primary/20
            transition-all duration-500
            group-hover:text-secondary/50
          "
        >
          01
        </span>
      </div> */}

      {/* =========================================================
          VISUAL AREA
      ========================================================== */}

      <div
        className="
          relative z-10
          mx-3 mt-3
          overflow-hidden
          rounded-[24px]
          sm:mx-3
        "
      >
        {/* Outer glow */}
        <div
          className="
            pointer-events-none absolute
            -inset-2
            rounded-[28px]
            bg-secondary/[0.04]
            opacity-0
            blur-xl
            transition-all duration-700
            group-hover:opacity-100
          "
        />

        {/* Visual frame */}
        <div
          className="
            relative overflow-hidden
            rounded-[24px]
            border border-primary/[0.08]
            bg-primary/[0.025]
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]
            transition-all duration-700
            group-hover:border-secondary/15
          "
        >
          <div
            className="
              transition-transform
              duration-[1100ms]
              ease-[cubic-bezier(.16,1,.3,1)]
              group-hover:scale-[1.055]
            "
          >
            <VisualPanel
              label={service.imageAlt}
              tone={service.tone}
              className="
                aspect-16/10
                rounded-none
                shadow-none
              "
            />
          </div>

          {/* Dark/light cinematic overlay */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t
              from-primary/[0.18]
              via-transparent
              to-white/[0.08]
              opacity-40
              transition-opacity duration-700
              group-hover:opacity-70
            "
          />

          {/* Shine */}
          <div
            className="
              pointer-events-none absolute
              -left-[120%] top-[-20%]
              h-[150%] w-[55%]
              rotate-[22deg]
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
              blur-[3px]
              transition-all
              duration-[1200ms]
              ease-out
              group-hover:left-[140%]
            "
          />

          {/* Floating arrow */}
          <div
            className="
              absolute right-4 top-4
              flex h-11 w-11
              translate-y-2
              items-center justify-center
              rounded-full
              border border-white/40
              bg-white/75
              text-primary
              opacity-0
              shadow-[0_12px_35px_rgba(0,0,0,0.12)]
              backdrop-blur-xl
              transition-all duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="
                h-[18px] w-[18px]
                transition-transform duration-500
                group-hover:rotate-45
              "
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </div>

          {/* Image bottom badge */}
          <div
            className="
              absolute bottom-4 left-4
              translate-y-2
              rounded-full
              border border-white/25
              bg-white/65
              px-3 py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-primary
              opacity-0
              backdrop-blur-xl
              transition-all duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            Explore
          </div>
        </div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div
        className="
          relative z-10
          flex flex-1 flex-col
          px-6 pb-6 pt-7
          sm:px-7 sm:pb-7 sm:pt-8
        "
      >
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className="
              h-px w-7
              bg-secondary/50
              transition-all duration-500
              group-hover:w-12
              group-hover:bg-secondary
            "
          />

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-primary/40
              transition-colors duration-500
              group-hover:text-secondary
            "
          >
            Premium Solution
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            max-w-[92%]
            font-heading
            text-[21px]
            font-semibold
            leading-[1.2]
            tracking-[-0.025em]
            text-primary
            transition-all duration-500
            sm:text-[22px]
            group-hover:translate-x-0.5
          "
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="
            mt-3.5
            max-w-[95%]
            flex-1
            text-[13px]
            leading-[1.75]
            text-muted
            transition-all duration-500
            group-hover:text-primary/65
          "
        >
          {service.summary}
        </p>

        {/* =======================================================
            DIVIDER
        ======================================================== */}

        <div className="my-6 h-px w-full bg-primary/[0.07]" />

        {/* =======================================================
            FOOTER / CTA
        ======================================================== */}

        <div className="flex items-center justify-between gap-4">
          <Link
            href={service.href}
            className="
              group/link
              inline-flex
              items-center
              gap-3
              text-[13px]
              font-bold
              tracking-[-0.01em]
              text-secondary
              no-underline
              transition-all duration-500
              hover:text-primary
            "
          >
            <span className="relative">
              View {service.title}

              <span
                className="
                  absolute
                  -bottom-1
                  left-0
                  h-[1.5px]
                  w-full
                  origin-left
                  scale-x-0
                  bg-secondary
                  transition-transform duration-500
                  group-hover/link:scale-x-100
                "
              />
            </span>

            <span
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-secondary/20
                bg-secondary/[0.055]
                transition-all duration-500
                group-hover/link:translate-x-1
                group-hover/link:border-secondary
                group-hover/link:bg-secondary
                group-hover/link:text-white
                group-hover/link:shadow-[0_8px_25px_rgba(0,0,0,0.10)]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="
                  h-4 w-4
                  transition-transform duration-500
                  group-hover/link:translate-x-0.5
                "
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </Link>

          {/* Decorative orbital mark */}
          <div
            className="
              relative flex h-9 w-9
              items-center justify-center
              rounded-full
              border border-primary/[0.07]
              transition-all duration-700
              group-hover:rotate-[180deg]
              group-hover:border-secondary/20
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-primary/20
                transition-all duration-500
                group-hover:bg-secondary
              "
            />

            <span
              className="
                absolute inset-1.5
                rounded-full
                border border-dashed
                border-primary/10
                transition-all duration-700
                group-hover:border-secondary/30
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          PREMIUM BORDER ACCENT
      ========================================================== */}

      <div
        className="
          pointer-events-none absolute
          bottom-0 left-7 right-7
          h-[2px]
          origin-center
          scale-x-0
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-secondary
          to-transparent
          opacity-70
          transition-all duration-700
          group-hover:scale-x-100
        "
      />

      {/* Corner highlight */}
      <div
        className="
          pointer-events-none absolute
          right-0 top-0
          h-32 w-32
          rounded-bl-[100%]
          border-b border-l
          border-secondary/0
          transition-all duration-700
          group-hover:border-secondary/10
        "
      />
    </Card>
  );
}