
"use client";

import { useMemo, useState } from "react";
import { treks } from "@/data/treks";
import { SectionHeading } from "@/components/SectionHeading";

const MAX_COMPARE = 3;

function getMaximumNumber(value: string): number {
  const numbers =
    value.match(/\d[\d,]*/g)?.map((item) =>
      Number(item.replace(/,/g, ""))
    ) ?? [];

  return numbers.length > 0 ? Math.max(...numbers) : Infinity;
}

const difficultyRank: Record<string, number> = {
  Easy: 1,
  Moderate: 2,
  Challenging: 3,
};

export function CompareSection() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const selectedTreks = useMemo(
    () => selectedSlugs
      .map((slug) => treks.find((trek) => trek.slug === slug))
      .filter((trek) => trek !== undefined),
    [selectedSlugs]
  );

  const lowestBudget = Math.min(
    ...selectedTreks.map((trek) =>
      getMaximumNumber(trek.estimatedBudget)
    )
  );

  const shortestDuration = Math.min(
    ...selectedTreks.map((trek) =>
      getMaximumNumber(trek.duration)
    )
  );

  const easiestDifficulty = Math.min(
    ...selectedTreks.map(
      (trek) => difficultyRank[trek.difficulty] ?? Infinity
    )
  );

  function toggleTrek(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= MAX_COMPARE) {
        return current;
      }

      return [...current, slug];
    });
  }

  function clearSelection() {
    setSelectedSlugs([]);
  }

  return (
    <section id="compare" className="topo-bg scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Trek comparison"
          title="Compare before you choose"
          description="Not sure which trail is right for you? Select up to three treks and compare their difficulty, duration, distance, and estimated cost side by side."
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-forest">
            {selectedSlugs.length} of {MAX_COMPARE} treks selected
          </p>

          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedSlugs.length === 0}
            className="rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest transition hover:bg-forest/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear selection
          </button>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treks.map((trek) => {
            const isSelected = selectedSlugs.includes(trek.slug);
            const limitReached =
              selectedSlugs.length >= MAX_COMPARE && !isSelected;

            return (
              <article
                key={trek.slug}
                className={`overflow-hidden rounded-2xl border bg-white transition duration-200 ${
                  isSelected
                    ? "border-forest ring-2 ring-forest/20 shadow-lg"
                    : "border-forest/10 hover:border-forest/30"
                }`}
              >
                <img
                  src={trek.imageUrl}
                  alt={trek.imageAlt}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-gold">
                    {trek.location}
                  </p>

                  <h3 className="mt-2 font-display text-2xl text-forest">
                    {trek.name}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-muted">
                    <p>Difficulty: {trek.difficulty}</p>
                    <p>Duration: {trek.duration}</p>
                    <p>Budget: {trek.estimatedBudget}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTrek(trek.slug)}
                    disabled={limitReached}
                    aria-pressed={isSelected}
                    className={`mt-5 w-full rounded-full px-5 py-3 text-sm font-semibold transition ${
                      isSelected
                        ? "bg-forest text-cream hover:bg-forest-mid"
                        : "border border-forest text-forest hover:bg-forest/5"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {isSelected ? "✓ Selected" : "Add to comparison"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {selectedTreks.length > 0 && (
          <div className="mt-14" aria-live="polite">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Side-by-side analysis
                </p>

                <h3 className="mt-2 font-display text-3xl text-forest">
                  Your trek comparison
                </h3>
              </div>

              <p className="text-sm text-muted">
                Comparing {selectedTreks.length}{" "}
                {selectedTreks.length === 1 ? "trek" : "treks"}
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-forest/10 bg-white shadow-sm">
              <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-forest text-cream">
                    <th className="w-40 px-5 py-4 font-semibold">
                      Details
                    </th>

                    {selectedTreks.map((trek) => (
                      <th
                        key={trek.slug}
                        className="min-w-48 px-5 py-4 font-semibold"
                      >
                        {trek.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-forest/10">
                    <th className="px-5 py-4 font-semibold text-charcoal">
                      Location
                    </th>
                    {selectedTreks.map((trek) => (
                      <td key={trek.slug} className="px-5 py-4 text-muted">
                        {trek.location}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-forest/10">
                    <th className="px-5 py-4 font-semibold text-charcoal">
                      Difficulty
                    </th>
                    {selectedTreks.map((trek) => {
                      const isEasiest =
                        (difficultyRank[trek.difficulty] ?? Infinity) ===
                        easiestDifficulty;

                      return (
                        <td key={trek.slug} className="px-5 py-4">
                          <span className="font-medium text-charcoal">
                            {trek.difficulty}
                          </span>
                          {isEasiest && (
                            <span className="mt-1 block text-xs font-semibold text-forest">
                              Easiest option
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-forest/10">
                    <th className="px-5 py-4 font-semibold text-charcoal">
                      Duration
                    </th>
                    {selectedTreks.map((trek) => {
                      const isShortest =
                        getMaximumNumber(trek.duration) === shortestDuration;

                      return (
                        <td key={trek.slug} className="px-5 py-4">
                          <span className="text-charcoal">
                            {trek.duration}
                          </span>
                          {isShortest && (
                            <span className="mt-1 block text-xs font-semibold text-forest">
                              Shortest duration
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-forest/10">
                    <th className="px-5 py-4 font-semibold text-charcoal">
                      Distance
                    </th>
                    {selectedTreks.map((trek) => (
                      <td key={trek.slug} className="px-5 py-4 text-muted">
                        {trek.distance}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-forest/10">
                    <th className="px-5 py-4 font-semibold text-charcoal">
                      Estimated budget
                    </th>
                    {selectedTreks.map((trek) => {
                      const isLowest =
                        getMaximumNumber(trek.estimatedBudget) === lowestBudget;

                      return (
                        <td key={trek.slug} className="px-5 py-4">
                          <span className="font-medium text-charcoal">
                            {trek.estimatedBudget}
                          </span>
                          {isLowest && (
                            <span className="mt-1 block text-xs font-semibold text-forest">
                              Lowest upper estimate
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <th className="px-5 py-4 font-semibold text-charcoal">
                      Overview
                    </th>
                    {selectedTreks.map((trek) => (
                      <td
                        key={trek.slug}
                        className="px-5 py-4 leading-6 text-muted"
                      >
                        {trek.summary}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted">
              Highlights are based on the available trek data. The lowest
              budget compares the upper end of each estimated price range.
              Always verify actual costs and trail conditions before booking.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {selectedTreks.map((trek) => (
                <a
                  key={trek.slug}
                  href={`/treks/${trek.slug}`}
                  className="rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest-mid"
                >
                  Explore {trek.name} →
                </a>
              ))}
            </div>
          </div>
        )}

        {selectedTreks.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-forest/20 bg-white/70 px-6 py-10 text-center">
            <p className="font-display text-xl text-forest">
              Your comparison starts here
            </p>
            <p className="mt-2 text-sm text-muted">
              Select at least one trek above to see its details. Add two or
              three to compare them side by side.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
