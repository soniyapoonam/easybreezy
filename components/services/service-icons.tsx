import type { ComponentType, SVGProps } from "react";
import type { Service } from "@/lib/content/services";

type IconProps = SVGProps<SVGSVGElement>;

function baseIcon(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  };
}

function IconTourPackage(props: IconProps) {
  return (
    <svg {...baseIcon(props)}>
      <path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9z" />
      <path d="M12 4v16M4 7.5l8 3.5 8-3.5" />
    </svg>
  );
}

function IconCustomTrip(props: IconProps) {
  return (
    <svg {...baseIcon(props)}>
      <path d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.8 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.25" />
      <path d="M16.5 6.5 19 4M19 4v3M19 4h-3" />
    </svg>
  );
}

function IconCorporateTaxi(props: IconProps) {
  return (
    <svg {...baseIcon(props)}>
      <rect x="3" y="7" width="18" height="11" rx="2" />
      <path d="M7 7V5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5V7" />
      <path d="M3 12h18" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

function IconRoundTrip(props: IconProps) {
  return (
    <svg {...baseIcon(props)}>
      <path d="M7 7H4v3" />
      <path d="M4 10a8 8 0 0 1 13.5-5.5" />
      <path d="M17 17h3v-3" />
      <path d="M20 14a8 8 0 0 1-13.5 5.5" />
    </svg>
  );
}

function IconLocalTaxi(props: IconProps) {
  return (
    <svg {...baseIcon(props)}>
      <path d="M5 14.5V9.8A2.3 2.3 0 0 1 7.3 7.5h9.4A2.3 2.3 0 0 1 19 9.8v4.7" />
      <path d="M5 14.5h14v1.5A2 2 0 0 1 17 18H7a2 2 0 0 1-2-2v-1.5z" />
      <circle cx="8.2" cy="18.5" r="1.3" />
      <circle cx="15.8" cy="18.5" r="1.3" />
    </svg>
  );
}

function IconOutstationTaxi(props: IconProps) {
  return (
    <svg {...baseIcon(props)}>
      <path d="M3 17h18" />
      <path d="M6 17V9l4-3 4 3v8" />
      <path d="M14 17V11l4-2v8" />
      <path d="M10 6V4h4v2" />
    </svg>
  );
}

const iconMap: Record<Service["id"], ComponentType<IconProps>> = {
  "tour-package": IconTourPackage,
  "custom-trip": IconCustomTrip,
  "corporate-taxi": IconCorporateTaxi,
  "round-trip": IconRoundTrip,
  "local-taxi": IconLocalTaxi,
  "outstation-taxi": IconOutstationTaxi,
};

export function ServiceIcon({
  serviceId,
  className,
}: {
  serviceId: Service["id"];
  className?: string;
}) {
  const Icon = iconMap[serviceId];
  return <Icon className={className} />;
}
