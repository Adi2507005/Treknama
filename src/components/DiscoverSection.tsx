"use client";

import { FormEvent, useMemo, useState } from "react";
import { searchTreks } from "@/data/treks";
import { SectionHeading } from "@/components/SectionHeading";
import { TrekCard } from "@/components/TrekCard";
import { TrekPhoto } from "@/components/TrekPhoto";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=80";

export function DiscoverSection() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [duration, setDuration] = useState("Any");
  const [maxBudget, setMaxBudget] = useState("Any");

  const visibleTreks = useMemo(() => {
    return searchTreks(query).filter((trek) => {
      const difficultyMatch =
        difficulty === "All" || trek.difficulty === difficulty;
  
      const durationNumbers = trek.duration.match(/\d+/g)?.map(Number) ?? [];
      const trekDays = durationNumbers[durationNumbers.length - 1] ?? 0;
  
      const durationMatch =
        duration === "Any" ||
        (duration === "Short" && trekDays <= 3) ||
        (duration === "Medium" && trekDays >= 4 && trekDays <= 7) ||
        (duration === "Long" && trekDays >= 8);
  
      
const budgetNumbers =
trek.estimatedBudget.match(/\d[\d,]*/g)?.map((value) =>
  Number(value.replace(/,/g, ""))
) ?? [];

  
      const estimatedMaximum =
        budgetNumbers[budgetNumbers.length - 1] ?? 0;
  
      const budgetMatch =
        maxBudget === "Any" || estimatedMaximum <= Number(maxBudget);
  
      return difficultyMatch && durationMatch && budgetMatch;
    });
  }, [query, difficulty, duration, maxBudget]);
  
  const showFeaturedLayout =
    query.trim() === "" &&
    difficulty === "All" &&
    duration === "Any" &&
    maxBudget === "Any" &&
    visibleTreks.length > 0;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("featured-treks")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <TrekPhoto
          src={HERO_IMAGE}
          alt="Snow-capped Himalayan peaks above a dark ridgeline"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal/85 via-charcoal/55 to-charcoal/20" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:pb-24">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">
            Har Trek Ki Poori Kahani
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-6xl">
            See the trek before you trek it.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-cream/85 sm:text-lg">
            Treknama is a Himalayan discovery and planning platform. Browse
            featured trails, estimated effort, and honest cost ranges — so the
            mountain is less of a surprise.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="trek-search">
              Search treks by name or location
            </label>
            <input
              id="trek-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Hampta, Triund, Nepal..."
              className="h-12 flex-1 rounded-full border border-cream/20 bg-cream/95 px-5 text-sm text-charcoal outline-none ring-forest/30 placeholder:text-muted focus:ring-2"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-forest px-6 text-sm font-semibold text-cream transition hover:bg-forest-mid"
            >
              Find a trek
            </button>
          </form>
        </div>
      </section>

      <section id="featured-treks" className="topo-bg scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            eyebrow="Explore"
            title="Five trails to start the story"
            description="Each card lists location, difficulty, duration, approximate distance, and an estimated budget. These figures are planning ranges, not official prices."
          />
          <div className="mt-8 grid gap-4 rounded-2xl border border-forest/10 bg-white p-5 sm:grid-cols-3">
  <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
    Difficulty
    <select
      value={difficulty}
      onChange={(event) => setDifficulty(event.target.value)}
      className="h-11 rounded-xl border border-forest/20 bg-white px-3"
    >
      <option value="All">All difficulties</option>
      <option value="Easy">Easy</option>
      <option value="Moderate">Moderate</option>
      <option value="Challenging">Challenging</option>
    </select>
  </label>

  <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
    Duration
    <select
      value={duration}
      onChange={(event) => setDuration(event.target.value)}
      className="h-11 rounded-xl border border-forest/20 bg-white px-3"
    >
      <option value="Any">Any duration</option>
      <option value="Short">1–3 days</option>
      <option value="Medium">4–7 days</option>
      <option value="Long">8+ days</option>
    </select>
  </label>

  <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
    Maximum estimated budget
    <select
      value={maxBudget}
      onChange={(event) => setMaxBudget(event.target.value)}
      className="h-11 rounded-xl border border-forest/20 bg-white px-3"
    >
      <option value="Any">Any budget</option>
      <option value="5000">Up to ₹5,000</option>
      <option value="10000">Up to ₹10,000</option>
      <option value="15000">Up to ₹15,000</option>
      <option value="50000">Up to ₹50,000</option>
      <option value="150000">Up to ₹1,50,000</option>
    </select>
  </label>

  <button
    type="button"
    onClick={() => {
      setDifficulty("All");
      setDuration("Any");
      setMaxBudget("Any");
      setQuery("");
    }}
    className="rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest transition hover:bg-forest/5 sm:col-span-3 sm:justify-self-start"
  >
    Clear all filters
  </button>
</div>

<p className="mt-5 text-sm text-muted">
  Showing {visibleTreks.length} {visibleTreks.length === 1 ? "trek" : "treks"} matching your search and filters.
</p>

          {visibleTreks.length === 0 ? (
            <p className="mt-12 rounded-2xl border border-forest/10 bg-white px-6 py-10 text-muted">
              No featured treks match “{query}”. Try a name like Kedarkantha or
              a place like Himachal.
            </p>
          ) : (
            <div
              className={
                showFeaturedLayout
                  ? "mt-12 grid gap-6 lg:grid-cols-2"
                  : "mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              }
            >
              {visibleTreks.map((trek, index) => (
                <div
                  key={trek.slug}
                  className={
                    showFeaturedLayout && index === 0 ? "lg:col-span-2" : ""
                  }
                >
                  <TrekCard
                    trek={trek}
                    featured={showFeaturedLayout && index === 0}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
