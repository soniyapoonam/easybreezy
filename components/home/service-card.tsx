import Link from "next/link";
import { Card } from "@/components/ui";
import type { Service } from "@/lib/content/services";
import { VisualPanel } from "./visual-panel";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <VisualPanel
        label={service.imageAlt}
        tone={service.tone}
        className="aspect-16/10 rounded-none shadow-none"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold text-primary">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {service.summary}
        </p>
        <Link
          href={service.href}
          className="mt-4 text-sm font-semibold text-secondary no-underline hover:text-primary"
        >
          View {service.title}
        </Link>
      </div>
    </Card>
  );
}
