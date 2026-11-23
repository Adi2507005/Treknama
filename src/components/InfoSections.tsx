import { SectionHeading } from "@/components/SectionHeading";

export function RouteSection() {
  return (
    <section id="routes" className="scroll-mt-24 bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
        <SectionHeading
          tone="light"
          eyebrow="Interactive routes"
          title="Walk the line before you walk the trail"
          description="Later versions of Treknama will show an interactive map and an elevation profile for each trek. You will be able to see steep days, gentler forest stretches, and roughly where camps sit along the route."
        />

        <figure className="rounded-3xl border border-cream/15 bg-charcoal/30 p-6">
          <svg
            className="elevation-chart"
            viewBox="0 0 400 180"
            role="img"
            aria-label="Sample elevation profile rising then easing toward a pass"
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
            Illustrative only — this is not GPS data, a surveyed profile, or a
            navigation tool. Real coordinates will arrive in a later sprint.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function RecommendationsSection() {
  const profiles = [
    {
      title: "Weekend starter",
      detail:
        "Shorter walks such as Triund or Nag Tibba, with modest altitude gain.",
    },
    {
      title: "First Himalayan pass",
      detail: "Multi-day moderate treks like Hampta Pass or Kedarkantha.",
    },
    {
      title: "High-commitment journey",
      detail:
        "Long, high routes such as Everest Base Camp that need extra planning.",
    },
  ];

  return (
    <section id="recommendations" className="topo-bg scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Smart recommendations"
          title="A trek that fits the trekker"
          description="Personalised suitability scoring is planned next. The idea is simple: match duration, difficulty, budget, and season to a trekker’s fitness and time — without pretending an algorithm knows the mountain better than a local guide."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {profiles.map((profile) => (
            <article
              key={profile.title}
              className="rounded-2xl border border-forest/10 bg-white p-6"
            >
              <h3 className="font-display text-2xl text-forest">
                {profile.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {profile.detail}
              </p>
              <p className="mt-5 text-xs uppercase tracking-wider text-gold">
                Coming in a later version
              </p>
            </article>
          ))}
        </div>
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
            snow, monsoon, or high winds typically reshape a trail. There is no
            live weather feed on this page, and we will not invent readings to
            look complete.
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
            A future community layer will collect trail conditions, water notes,
            and camp updates from trekkers. Until that exists, this space stays
            empty on purpose — no placeholder reviews, no invented voices.
          </p>
        </article>
      </div>
    </section>
  );
}
