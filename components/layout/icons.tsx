import type { ComponentType, SVGProps } from "react";
import type { SocialPlatform } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement>;

function baseProps(props: IconProps) {
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

export function IconMenu(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3A2.5 2.5 0 0 1 19 20 14.5 14.5 0 0 1 4 5a2.5 2.5 0 0 1 2.5-.5z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.8 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.25" />
    </svg>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <svg {...baseProps({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M14 9h2.5V6.2C16 6.1 15 6 13.8 6 11.6 6 10 7.4 10 10v2H7.5v3H10v7h3v-7h2.3l.5-3H13v-1.6c0-.9.2-1.4 1-1.4z" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconYouTube(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M22 12s0-4-0.5-5.2a2.8 2.8 0 0 0-2-2C17.8 4.4 12 4.4 12 4.4s-5.8 0-7.5.4a2.8 2.8 0 0 0-2 2C2 8 2 12 2 12s0 4 .5 5.2a2.8 2.8 0 0 0 2 2c1.7.4 7.5.4 7.5.4s5.8 0 7.5-.4a2.8 2.8 0 0 0 2-2C22 16 22 12 22 12z" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconThreads(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12.2 7.2c-3.2 0-5.2 1.9-5.2 4.8 0 3.4 2.6 5.2 5.8 5.2 1.7 0 3.2-.4 4.3-1.1" />
      <path d="M9.2 12.2c0-2.2 1.5-3.6 3.6-3.6 2.8 0 3.5 1.9 3.5 3.6 0 2.4-1 4.4-3.7 4.4-1.4 0-2.4-.6-2.9-1.5" />
      <path d="M15.8 9.1c.7-.8 1.7-1.4 3-1.6" />
    </svg>
  );
}

export function IconGoogle(props: IconProps) {
  return (
    <svg {...baseProps({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M12 11.2v2.7h4.4c-.2 1.2-1.5 3.5-4.4 3.5-2.6 0-4.8-2.2-4.8-4.9S9.4 7.6 12 7.6c1.5 0 2.5.6 3.1 1.2l2.1-2C15.8 5.4 14.1 4.6 12 4.6 7.9 4.6 4.6 7.9 4.6 12S7.9 19.4 12 19.4c4.1 0 6.8-2.9 6.8-6.9 0-.5 0-.8-.1-1.3H12z" />
    </svg>
  );
}

const socialIconMap: Record<SocialPlatform, ComponentType<IconProps>> = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  youtube: IconYouTube,
  threads: IconThreads,
  google: IconGoogle,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = socialIconMap[platform];
  return <Icon className={className} />;
}
