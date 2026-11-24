
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { recommendTreks } from "@/lib/recommendations";
import type { Difficulty } from "@/types/trek";

export function RouteSection() {
  return (
    <section id="routes" className="scroll-mt-24 bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
        <SectionHeading
          tone="light"
          eyebrow="Interactive routes"
          title="Walk the line before you walk the trail"
          description="Explore a sample elevation profile to understand how a Himalayan route can rise toward a mountain pass. This illustration is not live GPS or surveyed route data."
        />

        <figure className="rounded-3xl border border-cream/15 bg-charcoal/30 p-6">
          <svg
            className="elevation-chart"
            viewBox="0 0 400 180"
            role="img"
            aria-label="Illustrative elevation profile rising toward a mountain pass"
          >
            <text x="8" y="18" fill="#ebe3d4" fontSize="11">
              Sample elevation profile
            </text>

            <line
              x1="24"
              y1="40"
              x2="24"
              y2="150"
              stroke="#40916c"
              strokeWidth="1"
            />

            <line
              x1="24"
              y1="150"
              x2="380"
              y2="150"
              stroke="#40916c"
              strokeWidth="1"
            />

            <polyline
              fill="none"
              stroke="#b08968"
              strokeWidth="3"
              points="24,132 80,118 130,108 180,90 230,70 280,58 330,46 380,52"
            />

            <text x="28" y="168" fill="#ebe3d4" fontSize="10">
              Day 1
            </text>

            <text x="340" y="168" fill="#ebe3d4" fontSize="10">
              Pass
            </text>
          </svg>

          <figcaption className="mt-3 text-xs text-cream/55">
            Illustrative only — not GPS data, a surveyed profile, or a
            navigation tool.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function RecommendationsSection() {
  const [difficulty, setDifficulty] = useState<Difficulty | "Any">("Any");
  const [maxDays, setMaxDays] = useState(7);
  const [maxBudget, setMaxBudget] = useState(15000);
  const [submitted, setSubmitted] = useState(false);

  const recommendedTreks = recommendTreks({
    difficulty,
    maxDays,
    maxBudget,
  });

  return (
    <section id="recommendations" className="topo-bg scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Smart recommendations"
          title="Find a trek that fits you"
          description="Choose your preferred difficulty, available time, and estimated budget to discover treks that match your requirements."
        />

        <div className="mt-10 grid gap-5 rounded-3xl border border-forest/10 bg-white p-6 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Preferred difficulty

            <select
              value={difficulty}
              onChange={(event) => {
                setDifficulty(event.target.value as Difficulty | "Any");
                setSubmitted(false);
              }}
              className="h-12 rounded-xl border border-forest/20 bg-white px-3"
            >
              <option value="Any">Any difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Available days

            <select
              value={maxDays}
              onChange={(event) => {
                setMaxDays(Number(event.target.value));
                setSubmitted(false);
              }}
              className="h-12 rounded-xl border border-forest/20 bg-white px-3"
            >
              <option value={3}>Up to 3 days</option>
              <option value={5}>Up to 5 days</option>
              <option value={7}>Up to 7 days</option>
              <option value={14}>Up to 14 days</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
            Maximum budget

            <select
              value={maxBudget}
              onChange={(event) => {
                setMaxBudget(Number(event.target.value));
                setSubmitted(false);
              }}
              className="h-12 rounded-xl border border-forest/20 bg-white px-3"
            >
              <option value={5000}>Up to ₹5,000</option>
              <option value={10000}>Up to ₹10,000</option>
              <option value={15000}>Up to ₹15,000</option>
              <option value={50000}>Up to ₹50,000</option>
              <option value={150000}>Up to ₹1,50,000</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="rounded-full bg-forest px-6 py-3 font-semibold text-cream transition hover:bg-forest-mid md:col-span-3 md:justify-self-start"
          >
            Find my trek
          </button>
        </div>

        {submitted && (
          <div className="mt-10">
            <h3 className="font-display text-2xl text-forest">
              Your recommended treks
            </h3>

            <p className="mt-2 text-sm text-muted">
              Ranked by how closely each trek matches your preferences.
            </p>

            {recommendedTreks.length === 0 ? (
              <p className="mt-5 rounded-2xl bg-white p-6 text-muted">
                No recommendations are currently available.
              </p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedTreks.map((recommendation) => {
                  const trek = recommendation.trek;

                  const matchLabel =
                    recommendation.score >= 85
                      ? "Excellent match"
                      : recommendation.score >= 65
                      ? "Good match"
                      : "Partial match";

                  return (
                    <article
                      key={trek.slug}
                      className="overflow-hidden rounded-2xl border border-forest/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <img
                        src={trek.imageUrl}
                        alt={trek.imageAlt}
                        className="h-48 w-full object-cover"
                      />

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs uppercase tracking-wider text-gold">
                            {trek.location}
                          </p>

                          <div className="shrink-0 text-right">
                            <span className="block text-2xl font-bold leading-tight text-forest">
                              {recommendation.score}%
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                              {matchLabel}
                            </span>
                          </div>
                        </div>

                        <h4 className="mt-3 font-display text-2xl text-forest">
                          {trek.name}
                        </h4>

                        <div
                          className="mt-4 h-2.5 overflow-hidden rounded-full bg-forest/10"
                          role="progressbar"
                          aria-label={`${trek.name} preference match`}
                          aria-valuenow={recommendation.score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="h-full rounded-full bg-forest transition-all duration-700 ease-out"
                            style={{
                              width: `${recommendation.score}%`,
                            }}
                          />
                        </div>

                        <div className="mt-5">
                          <p className="text-xs font-bold uppercase tracking-wider text-charcoal">
                            Why this trek matches
                          </p>

                          <ul className="mt-3 space-y-3">
                            {recommendation.reasons.map((reason, index) => {
                              const isPositive =
                                reason.includes("matches your preference") ||
                                reason.includes("Fits within") ||
                                reason.includes("Within your preferred");

                              return (
                                <li
                                  key={`${trek.slug}-reason-${index}`}
                                  className="flex items-start gap-2 text-sm leading-5 text-muted"
                                >
                                  <span
                                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                      isPositive
                                        ? "bg-forest/10 text-forest"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {isPositive ? "✓" : "!"}
                                  </span>

                                  <span>{reason}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="mt-5 space-y-2 border-t border-forest/10 pt-4 text-sm text-muted">
                          <p>Difficulty: {trek.difficulty}</p>
                          <p>Duration: {trek.duration}</p>
                          <p>Distance: {trek.distance}</p>
                          <p>Estimated budget: {trek.estimatedBudget}</p>
                        </div>

                        <a
                          href={`/treks/${trek.slug}`}
                          className="mt-5 inline-block font-semibold text-forest hover:underline"
                        >
                          Explore trek →
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section id="community" className="scroll-mt-24 bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-8 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.45)]">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            Weather awareness
          </p>

          <h2 className="mt-3 font-display text-3xl text-charcoal">
            Know the season, not a fake forecast
          </h2>

          <p className="mt-4 text-base leading-7 text-muted">
            Treknama will later surface seasonal guidance so you can see when
            snow, monsoon, or high winds typically reshape a trail. There is
            currently no live weather feed on this page.
          </p>
        </article>

        <article className="rounded-3xl bg-charcoal p-8 text-cream">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            Community trail reports
          </p>

          <h2 className="mt-3 font-display text-3xl">
            Stories from people who walked it
          </h2>

          <p className="mt-4 text-base leading-7 text-cream/75">
            A future community layer will collect trail conditions, water
            notes, and camp updates from trekkers. This feature is not yet
            connected to a live community database.
          </p>
        </article>
      </div>
    </section>
  );
}
