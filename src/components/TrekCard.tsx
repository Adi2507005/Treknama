import Link from "next/link";
import type { Trek } from "@/types/trek";
import { TrekPhoto } from "@/components/TrekPhoto";

type TrekCardProps = {
  trek: Trek;
  featured?: boolean;
};

export function TrekCard({ trek, featured = false }: TrekCardProps) {
  return (
    <article
      className={`group flex h-full overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_18px_40px_-28px_rgba(28,25,23,0.45)] ${
        featured ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "h-64 lg:h-auto lg:w-[52%]" : "h-52"
        }`}
      >
        <TrekPhoto
          src={trek.imageUrl}
          alt={trek.imageAlt}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium uppercase tracking-wider text-forest">
          {trek.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-7">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">
          {trek.location}
        </p>
        <h3 className="mt-2 font-display text-2xl text-charcoal lg:text-3xl">
          {trek.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{trek.summary}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">
              Duration
            </dt>
            <dd className="mt-1 font-medium text-ink">{trek.duration}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">
              Approx. distance
            </dt>
            <dd className="mt-1 font-medium text-ink">{trek.distance}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs uppercase tracking-wider text-muted">
              Estimated budget
            </dt>
            <dd className="mt-1 font-medium text-ink">{trek.estimatedBudget}</dd>
          </div>
        </dl>

        <Link
          href={`/treks/${trek.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:gap-3"
        >
          View Trek
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
