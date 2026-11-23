import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Treknama</p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold">
            Har Trek Ki Poori Kahani
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-cream/70">
            A student-built discovery platform for planning Himalayan treks with
            clearer stories, estimated costs, and honest limits on what we know
            today.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Explore</p>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li>
              <Link href="/#featured-treks" className="hover:text-cream">
                Featured treks
              </Link>
            </li>
            <li>
              <Link href="/#routes" className="hover:text-cream">
                Route visualisation
              </Link>
            </li>
            <li>
              <Link href="/#recommendations" className="hover:text-cream">
                Smart recommendations
              </Link>
            </li>
            <li>
              <Link href="/#community" className="hover:text-cream">
                Weather & community
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Note</p>
          <p className="mt-4 text-sm leading-7 text-cream/70">
            Budgets, distances, and durations on Treknama are approximate
            planning ranges. They are not live quotes, GPS tracks, or official
            permit figures.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-cream/50">
          © 2026 Treknama · Final-year Computer Science
          project
        </p>
      </div>
    </footer>
  );
}
