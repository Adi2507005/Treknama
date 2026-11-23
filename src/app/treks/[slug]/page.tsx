import Link from "next/link";
import { notFound } from "next/navigation";
import { TrekPhoto } from "@/components/TrekPhoto";
import { getTrekBySlug, treks } from "@/data/treks";

type TrekPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return treks.map((trek) => ({ slug: trek.slug }));
}

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);

  if (!trek) {
    notFound();
  }

  return (
    <main className="topo-bg">
      <section className="relative h-[48vh] min-h-[320px]">
        <TrekPhoto
          src={trek.imageUrl}
          alt={trek.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">
              {trek.location}
            </p>
            <h1 className="mt-2 font-display text-4xl text-cream sm:text-6xl">
              {trek.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-lg leading-8 text-ink">{trek.summary}</p>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Difficulty</dt>
            <dd className="mt-1 text-lg text-charcoal">{trek.difficulty}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Duration</dt>
            <dd className="mt-1 text-lg text-charcoal">{trek.duration}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Distance</dt>
            <dd className="mt-1 text-lg text-charcoal">{trek.distance}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">
              Estimated budget
            </dt>
            <dd className="mt-1 text-lg text-charcoal">{trek.estimatedBudget}</dd>
          </div>
        </dl>

        <p className="mt-8 text-sm leading-6 text-muted">
          These figures are approximate planning ranges for a student demo.
          Confirm permits, season, and costs with a licensed operator before
          you travel.
        </p>

        <Link
          href="/#featured-treks"
          className="mt-10 inline-flex text-sm font-semibold text-forest"
        >
          ← Back to featured treks
        </Link>
      </section>
    </main>
  );
}
