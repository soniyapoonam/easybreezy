"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { journeyPlannerCopy } from "@/lib/content/home";

const fieldClass =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text shadow-sm transition-colors placeholder:text-muted";

export function JourneyPlanner() {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      id="plan-your-journey"
      className="rounded-xl border border-border bg-surface p-5 shadow-lg md:p-6"
    >
      <p className="font-heading text-base font-semibold text-primary">
        {journeyPlannerCopy.title}
      </p>
      <p className="mt-1 text-small text-muted">{journeyPlannerCopy.description}</p>

      <form
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
        onSubmit={onSubmit}
        noValidate={false}
      >
        <label className="flex flex-col gap-1.5 text-small font-medium text-text">
          {journeyPlannerCopy.fromLabel}
          <input
            name="from"
            type="text"
            required
            autoComplete="off"
            placeholder="Pickup city or place"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-small font-medium text-text">
          {journeyPlannerCopy.toLabel}
          <input
            name="to"
            type="text"
            required
            autoComplete="off"
            placeholder="Destination"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-small font-medium text-text">
          {journeyPlannerCopy.dateLabel}
          <input name="date" type="date" required className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-small font-medium text-text">
          {journeyPlannerCopy.travellersLabel}
          <select name="travellers" defaultValue="2" className={fieldClass}>
            {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "traveller" : "travellers"}
              </option>
            ))}
          </select>
        </label>
        <div className="sm:col-span-2">
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            {journeyPlannerCopy.submitLabel}
          </Button>
        </div>
      </form>

      <div
        className="mt-4 rounded-lg border border-border bg-sky/60 px-4 py-3"
        role="status"
        aria-live="polite"
        id={`${formId}-result`}
      >
        <p className="font-heading text-small font-semibold text-primary">
          {submitted
            ? journeyPlannerCopy.placeholderTitle
            : "Distance and time"}
        </p>
        <p className="mt-1 text-small leading-relaxed text-text">
          {journeyPlannerCopy.placeholderBody}
        </p>
      </div>
    </div>
  );
}
