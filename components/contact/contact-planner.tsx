"use client";

import { useId, useState, type FormEvent } from "react";
import { Button, Container, Section } from "@/components/ui";
import { contactPlanner } from "@/lib/content/contact";
import { useContactInView } from "./use-contact-in-view";

const inputClass =
  "peer h-20 w-full border-0 border-b border-border bg-transparent px-0 pt-8 text-text outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-transparent focus:border-secondary";

const textareaClass =
  "peer min-h-36 w-full resize-y border-0 border-b border-border bg-transparent px-0 pt-8 text-text outline-none transition-[border-color] duration-200 placeholder:text-transparent focus:border-secondary";

const floatLabelClass = "pointer-events-none absolute left-0 top-0 text-text";

const raisedLabelClass = "pointer-events-none absolute left-0 top-0 text-text";

export function ContactPlanner() {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useContactInView<HTMLDivElement>();
  const visualRef = useContactInView<HTMLDivElement>();
  const formRef = useContactInView<HTMLFormElement>();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const name = String(data.get("name") ?? "").trim();
    const destination = String(data.get("destination") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !phone || !destination || !message) {
      setError("Please complete every field before sending the enquiry.");
      setSubmitted(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      setSubmitted(false);
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid phone number.");
      setSubmitted(false);
      return;
    }

    setError(null);
    setSubmitted(true);
  }

  return (
    <Section id="contact-planner" aria-labelledby="contact-planner-heading">
      <Container>
        <div className="contact-in max-w-2xl" ref={headingRef}>
          <p className="font-heading text-small font-semibold tracking-[0.14em] text-secondary uppercase">
            Travel enquiry
          </p>
          <h2 id="contact-planner-heading" className="mt-3 text-balance">
            {contactPlanner.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {contactPlanner.body}
          </p>
        </div>

        <div className="mt-12 grid items-start gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-6">
          <form
            ref={formRef}
            className="contact-in relative z-10 bg-surface p-5 shadow-[0_22px_44px_rgba(16,42,67,0.1)] sm:p-8 xl:-mr-16 xl:p-10"
            onSubmit={onSubmit}
            noValidate
            aria-describedby={error ? `${formId}-error` : `${formId}-status`}
          >
            <ol className="space-y-10">
              <li className="contact-field-in contact-reveal">
                <p className="font-heading text-xs font-semibold tracking-[0.16em] text-highlight uppercase">
                  {contactPlanner.steps[0].id} · {contactPlanner.steps[0].title}
                </p>
                <div className="mt-2 grid gap-6 sm:grid-cols-2">
                  <div className="relative sm:col-span-2">
                    <input
                      id={`${formId}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={contactPlanner.fields.name}
                      className={inputClass}
                    />
                    <label htmlFor={`${formId}-name`} className={floatLabelClass}>
                      {contactPlanner.fields.name}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={contactPlanner.fields.email}
                      className={inputClass}
                    />
                    <label htmlFor={`${formId}-email`} className={floatLabelClass}>
                      {contactPlanner.fields.email}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={contactPlanner.fields.phone}
                      className={inputClass}
                    />
                    <label htmlFor={`${formId}-phone`} className={floatLabelClass}>
                      {contactPlanner.fields.phone}
                    </label>
                  </div>
                </div>
              </li>

              <li className="contact-field-in contact-reveal contact-reveal-delay-1">
                <p className="font-heading text-xs font-semibold tracking-[0.16em] text-highlight uppercase">
                  {contactPlanner.steps[1].id} · {contactPlanner.steps[1].title}
                </p>
                <div className="mt-2 grid gap-6 sm:grid-cols-2">
                  <div className="relative sm:col-span-2">
                    <input
                      id={`${formId}-destination`}
                      name="destination"
                      type="text"
                      required
                      placeholder={contactPlanner.fields.destination}
                      className={inputClass}
                    />
                    <label htmlFor={`${formId}-destination`} className={floatLabelClass}>
                      {contactPlanner.fields.destination}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id={`${formId}-date`}
                      name="date"
                      type="date"
                      required
                      className={inputClass}
                    />
                    <label htmlFor={`${formId}-date`} className={raisedLabelClass}>
                      {contactPlanner.fields.date}
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      id={`${formId}-travellers`}
                      name="travellers"
                      defaultValue="2"
                      className={`${inputClass} appearance-none`}
                    >
                      {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? "traveller" : "travellers"}
                        </option>
                      ))}
                    </select>
                    <label htmlFor={`${formId}-travellers`} className={raisedLabelClass}>
                      {contactPlanner.fields.travellers}
                    </label>
                  </div>
                </div>
              </li>

              <li className="contact-field-in contact-reveal contact-reveal-delay-2">
                <p className="font-heading text-xs font-semibold tracking-[0.16em] text-highlight uppercase">
                  {contactPlanner.steps[2].id} · {contactPlanner.steps[2].title}
                </p>
                <div className="relative mt-5">
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    rows={4}
                    placeholder={contactPlanner.fields.message}
                    className={textareaClass}
                  />
                  <label htmlFor={`${formId}-message`} className={floatLabelClass}>
                    {contactPlanner.fields.message}
                  </label>
                </div>
              </li>
            </ol>

            {error ? (
              <p
                id={`${formId}-error`}
                className="mt-6 text-small text-accent"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="primary" className="mt-8 min-w-44">
              {contactPlanner.submitLabel}
            </Button>

            <div
              id={`${formId}-status`}
              className="mt-5 text-small leading-relaxed text-muted"
              role="status"
              aria-live="polite"
            >
              {submitted ? (
                <>
                  <p className="font-heading font-semibold text-primary">
                    {contactPlanner.successTitle}
                  </p>
                  <p className="mt-1">{contactPlanner.successBody}</p>
                </>
              ) : (
                <p>No fare is shown at this step. We reply using the details on this site.</p>
              )}
            </div>
          </form>

          <div
            ref={visualRef}
            className="contact-in relative min-h-[22rem] overflow-hidden md:min-h-[32rem] xl:min-h-[42rem]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${contactPlanner.visual.imageSrc}')` }}
              role="img"
              aria-label={contactPlanner.visual.imageAlt}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_45_80_/_0.1),rgb(16_45_80_/_0.55))]" />

            <div
              className="contact-float absolute left-[8%] top-[12%] max-w-[14rem] border border-white/20 bg-dark/45 px-4 py-3 text-on-dark backdrop-blur-sm"
              aria-hidden="true"
            >
              <p className="font-heading text-xs tracking-[0.14em] text-highlight uppercase">
                Route desk
              </p>
              <p className="mt-1 text-sm font-medium">{contactPlanner.visual.kicker}</p>
            </div>

            <div
              className="contact-float-slow absolute bottom-[18%] right-[8%] border border-white/20 bg-surface/95 px-4 py-3 text-primary shadow-md"
              aria-hidden="true"
            >
              <p className="font-heading text-xs tracking-[0.12em] text-secondary uppercase">
                Atmosphere
              </p>
              <p className="mt-1 text-small">{contactPlanner.visual.tags}</p>
            </div>

            <div
              className="contact-float absolute bottom-[8%] left-[10%] hidden h-28 w-36 bg-cover bg-center shadow-lg md:block"
              style={{ backgroundImage: `url('${contactPlanner.visual.insetSrc}')` }}
              role="img"
              aria-label={contactPlanner.visual.insetAlt}
            />

            <span
              className="contact-pulse absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 rounded-full bg-highlight"
              aria-hidden="true"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
