"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { journeyPlannerCopy } from "@/lib/content/home";

const fieldClass =
  "h-[54px] w-full rounded-[8px] border border-border bg-surface px-3.5 py-2.75 text-sm text-text shadow-sm transition-all duration-200 placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-sky/70";

const selectClass =
  "h-[54px] w-full appearance-none rounded-[8px] border border-border bg-surface px-3.5 pr-10 text-sm text-text shadow-sm transition-all duration-200 placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-sky/70";

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
      className="mx-auto rounded-[20px] border border-slate-200 bg-surface p-4 shadow-[0_22px_44px_rgba(16,42,67,0.12)] ring-1 ring-slate-200/80 md:p-5 xl:p-6"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-lg font-semibold text-primary md:text-xl">
            {journeyPlannerCopy.title}
          </p>
          <p className="mt-1 text-small text-muted">{journeyPlannerCopy.description}</p>
        </div>
      </div>

      <form className="space-y-3" onSubmit={onSubmit} noValidate={false}>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4">
          <label className="flex h-full flex-col gap-1.5 text-small font-medium text-text">
            {journeyPlannerCopy.nameLabel}
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          </label>

          <label className="flex h-full flex-col gap-1.5 text-small font-medium text-text">
            {journeyPlannerCopy.phoneLabel}
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="Phone number"
              className={fieldClass}
            />
          </label>

          <label className="flex h-full flex-col gap-1.5 text-small font-medium text-text">
            {journeyPlannerCopy.passengersLabel}
            <select name="travellers" defaultValue="2" className={fieldClass}>
              {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "traveller" : "travellers"}
                </option>
              ))}
            </select>
          </label>

          <label className="flex h-full flex-col gap-1.5 text-small font-medium text-text">
            {journeyPlannerCopy.pickupDateLabel}
            <input name="date" type="date" required className={fieldClass} />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4">
          <label className="flex h-full flex-col gap-1.5 text-small font-medium text-text">
            {journeyPlannerCopy.vehicleLabel}
            <div className="relative">
              <select
                name="vehicle"
                defaultValue=""
                className={selectClass}
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, transparent 50%, var(--color-muted) 50%), linear-gradient(135deg, var(--color-muted) 50%, transparent 50%)",
                  backgroundPosition:
                    "calc(100% - 18px) calc(50% - 2px), calc(100% - 12px) calc(50% - 2px)",
                  backgroundSize: "6px 6px, 6px 6px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="" disabled>
                  Select Your Option
                </option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="tempo-traveller">Tempo Traveller</option>
              </select>
            </div>
          </label>

          <label className="flex h-full flex-col gap-1.5 text-small font-medium text-text xl:col-span-1">
            {journeyPlannerCopy.pickupAddressLabel}
            <input
              name="pickupAddress"
              type="text"
              required
              autoComplete="street-address"
              placeholder="Pickup address"
              className={fieldClass}
            />
          </label>

          <label className="flex h-full flex-col gap-1.5 text-small font-medium text-text xl:col-span-1">
            {journeyPlannerCopy.dropoffAddressLabel}
            <input
              name="dropoffAddress"
              type="text"
              required
              autoComplete="street-address"
              placeholder="Drop off address"
              className={fieldClass}
            />
          </label>

          <div className="flex h-full items-end">
            <Button
              type="submit"
              variant="primary"
              className="h-[54px] w-full rounded-[8px] shadow-[0_10px_18px_rgba(244,122,60,0.15)]"
            >
              {journeyPlannerCopy.submitLabel}
            </Button>
          </div>
        </div>
      </form>

      <div
        className="mt-4 rounded-xl border border-sky bg-sky/70 px-4 py-3 shadow-inner shadow-sky/40"
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
