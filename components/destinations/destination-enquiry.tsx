import { destinationDetailCopy, destinationDetailPlaceholder } from "@/lib/content/destination-detail";
import { siteConfig } from "@/lib/site";

const fieldClass =
  "h-12 w-full min-w-0 rounded-[8px] border border-border bg-surface px-3.5 text-sm text-text shadow-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-sky/70";

export function DestinationEnquiry({ slug }: { slug: string }) {
  const { contact } = siteConfig;
  const copy = destinationDetailPlaceholder;

  return (
    <aside className="min-w-0 lg:sticky lg:top-40 lg:self-start" aria-label="Booking enquiry">
      <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-md sm:p-6">
        <p className="text-sm text-muted">{destinationDetailCopy.priceLabel}</p>
        <p className="mt-1 font-heading text-3xl font-semibold tracking-tight text-primary">
          {copy.priceAmount}{" "}
          <span className="text-base font-medium text-muted">{copy.priceUnit}</span>
        </p>

        <div className="mt-5 space-y-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-text" htmlFor={`${slug}-travel-date`}>
            {destinationDetailCopy.dateLabel}
            <input id={`${slug}-travel-date`} name="date" type="date" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-text" htmlFor={`${slug}-travellers`}>
            {destinationDetailCopy.travellersLabel}
            <select id={`${slug}-travellers`} name="travellers" defaultValue="2" className={fieldClass}>
              {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn-primary w-full">
            {destinationDetailCopy.enquireLabel}
          </button>
          <button type="button" className="btn btn-outline w-full">
            {destinationDetailCopy.downloadLabel}
          </button>
          <p className="text-center text-sm leading-relaxed text-muted">{copy.enquiryNote}</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
          <span className="text-muted">{copy.preferToTalk}</span>
          <a href={contact.phoneHref} className="shrink-0 font-semibold text-primary no-underline">
            {contact.phone}
          </a>
        </div>
      </div>
    </aside>
  );
}
