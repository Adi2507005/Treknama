
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrekPhoto } from "@/components/TrekPhoto";
import { PackingChecklist } from "@/components/PackingChecklist";
import TrekWeather from "@/components/TrekWeather";
import TrekCommunity from "@/components/TrekCommunity";
import TrekJourneyPlanner from "@/components/TrekJourneyPlanner";

import TrekMapLoader from "@/components/TrekMapLoader";
import ElevationProfile from "@/components/ElevationProfile";

import TriundMapLoader from "@/components/TriundMapLoader";
import TriundElevationProfile from "@/components/TriundElevationProfile";

import KedarkanthaMapLoader from "@/components/KedarkanthaMapLoader";
import KedarkanthaElevationProfile from "@/components/KedarkanthaElevationProfile";

import NagTibbaMapLoader from "@/components/NagTibbaMapLoader";
import NagTibbaElevationProfile from "@/components/NagTibbaElevationProfile";

import EverestBaseCampMapLoader from "@/components/EverestBaseCampMapLoader";
import EverestBaseCampElevationProfile from "@/components/EverestBaseCampElevationProfile";

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

  // Weather coordinates for all five trek destinations
  const weatherLocations: Record<
    string,
    {
      latitude: number;
      longitude: number;
      location: string;
    }
  > = {
    "hampta-pass": {
      latitude: 32.22,
      longitude: 77.35,
      location: "Hampta Pass, Himachal Pradesh",
    },

    triund: {
      latitude: 32.26,
      longitude: 76.35,
      location: "Triund, Himachal Pradesh",
    },

    kedarkantha: {
      latitude: 31.04,
      longitude: 78.18,
      location: "Kedarkantha, Uttarakhand",
    },

    "nag-tibba": {
      latitude: 30.65,
      longitude: 78.12,
      location: "Nag Tibba, Uttarakhand",
    },

    "everest-base-camp": {
      latitude: 28.00,
      longitude: 86.85,
      location: "Everest Base Camp, Nepal",
    },
  };

  const weatherLocation = weatherLocations[trek.slug];

  // Trek starting points and transportation guidance
  const journeyLocations: Record<
    string,
    {
      startPoint: string;
      travelNote: string;
    }
  > = {
    "hampta-pass": {
      startPoint: "Jobra, Himachal Pradesh, India",
      travelNote:
        "Reach the Manali area first, then arrange local road transport to Jobra, the usual starting point for the Hampta Pass trek.",
    },

    triund: {
      startPoint: "Dharamkot, Himachal Pradesh, India",
      travelNote:
        "Reach McLeod Ganj or Dharamkot in the Dharamshala area. The trek begins from the Dharamkot side.",
    },

    kedarkantha: {
      startPoint: "Sankri, Uttarakhand, India",
      travelNote:
        "Reach Sankri village, the usual base for the Kedarkantha trek. Plan your onward road journey and local transport in advance.",
    },

    "nag-tibba": {
      startPoint: "Pantwari, Uttarakhand, India",
      travelNote:
        "Reach Pantwari village, a commonly used starting point for the Nag Tibba trek. Check local road and transport arrangements before departure.",
    },

    "everest-base-camp": {
      startPoint: "Lukla, Nepal",
      travelNote:
        "Lukla is the usual gateway to the Everest Base Camp trek. Travelers generally arrange onward flights from Kathmandu or other available departure points. Verify flight schedules, permits and local travel requirements before departure.",
    },
  };

  const journeyLocation = journeyLocations[trek.slug];

  return (
    <main className="topo-bg">
      {/* Trek hero section */}
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

      {/* Trek information */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-8 text-ink">
            {trek.summary}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Difficulty
              </dt>
              <dd className="mt-1 text-lg text-charcoal">
                {trek.difficulty}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Duration
              </dt>
              <dd className="mt-1 text-lg text-charcoal">
                {trek.duration}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Distance
              </dt>
              <dd className="mt-1 text-lg text-charcoal">
                {trek.distance}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Estimated budget
              </dt>
              <dd className="mt-1 text-lg text-charcoal">
                {trek.estimatedBudget}
              </dd>
            </div>
          </dl>

          <p className="mt-8 text-sm leading-6 text-muted">
            These figures are approximate planning ranges for a student demo.
            Confirm permits, season, and costs with a licensed operator before
            you travel.
          </p>
        </div>

        {/* Journey and transportation planner */}
        {journeyLocation && (
          <TrekJourneyPlanner
            trekName={trek.name}
            startPoint={journeyLocation.startPoint}
            travelNote={journeyLocation.travelNote}
          />
        )}

        {/* Live weather integration */}
        {weatherLocation && (
          <TrekWeather
            latitude={weatherLocation.latitude}
            longitude={weatherLocation.longitude}
            location={weatherLocation.location}
          />
        )}

        {/* Interactive maps */}
        {trek.slug === "hampta-pass" && <TrekMapLoader />}

        {trek.slug === "triund" && <TriundMapLoader />}

        {trek.slug === "kedarkantha" && <KedarkanthaMapLoader />}

        {trek.slug === "nag-tibba" && <NagTibbaMapLoader />}

        {trek.slug === "everest-base-camp" && (
          <EverestBaseCampMapLoader />
        )}

        {/* Elevation profiles */}
        {trek.slug === "hampta-pass" && <ElevationProfile />}

        {trek.slug === "triund" && <TriundElevationProfile />}

        {trek.slug === "kedarkantha" && (
          <KedarkanthaElevationProfile />
        )}

        {trek.slug === "nag-tibba" && <NagTibbaElevationProfile />}

        {trek.slug === "everest-base-camp" && (
          <EverestBaseCampElevationProfile />
        )}

        {/* Trek packing checklist */}
        <div className="mx-auto max-w-3xl">
          <PackingChecklist
            trekSlug={trek.slug}
            trekName={trek.name}
          />
        </div>

        {/* Community experience section */}
        <TrekCommunity trekName={trek.name} />

        {/* Back navigation */}
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#featured-treks"
            className="mt-10 inline-flex text-sm font-semibold text-forest"
          >
            ← Back to featured treks
          </Link>
        </div>
      </section>
    </main>
  );
}
