import Link from "next/link";

const navLinks = [
  { href: "/#featured-treks", label: "Explore" },
  { href: "/#recommendations", label: "Smart Recommendations" },
  { href: "/#community", label: "Community" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-cream/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="group min-w-0">
          <span className="font-display text-2xl tracking-tight text-forest">
            Treknama
          </span>
          <span className="mt-0.5 block text-[11px] uppercase tracking-[0.22em] text-gold">
            Har Trek Ki Poori Kahani
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-ink/80 transition hover:text-forest"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-forest/20 text-forest">
            <span className="sr-only">Open menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-0.5 w-4 bg-forest" />
              <span className="block h-0.5 w-4 bg-forest" />
              <span className="block h-0.5 w-4 bg-forest" />
            </span>
          </summary>
          <ul className="absolute right-0 mt-3 w-56 rounded-2xl border border-forest/10 bg-cream p-3 shadow-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-ink/80 hover:bg-cream-deep hover:text-forest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
