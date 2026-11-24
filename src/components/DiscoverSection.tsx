
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

  const visibleTreks = useMemo(
    () => searchTreks(query),
    [query]
  );

  const showFeaturedLayout =
    query.trim() === "" && visibleTreks.length > 0;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    document.getElementById("featured-treks")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      {/* Hero Section */}
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
            Treknama is a Himalayan discovery and planning platform.
            Explore trekking destinations, compare estimated effort,
            and discover the right mountain adventure for your next journey.
          </p>

          {/* Hero Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="trek-search" className="sr-only">
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

      {/* Explore Treks Section */}
      <section
        id="featured-treks"
        className="topo-bg scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            eyebrow="Explore Treks"
            title="Find Your Next Trail"
            description="Discover trekking destinations, explore their difficulty levels, compare estimated costs, and find your next Himalayan adventure."
          />

          <p className="mt-8 text-sm text-muted">
            {query.trim()
              ? `Showing ${visibleTreks.length} matching ${
                  visibleTreks.length === 1 ? "trek" : "treks"
                } for "${query}".`
              : `Explore all ${visibleTreks.length} available treks.`}
          </p>

          {visibleTreks.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-forest/10 bg-white px-6 py-10 text-muted">
              No treks found for "{query}". Try searching for Triund,
              Kedarkantha, Hampta Pass, Nag Tibba, or Nepal.
            </p>
          ) : (
            <div
              className={
                showFeaturedLayout
                  ? "mt-6 grid gap-6 lg:grid-cols-2"
                  : "mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              }
            >
              {visibleTreks.map((trek, index) => (
                <div
                  key={trek.slug}
                  className={
                    showFeaturedLayout && index === 0
                      ? "lg:col-span-2"
                      : ""
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
