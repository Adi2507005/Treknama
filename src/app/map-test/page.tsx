
import TrekMapLoader from "@/components/TrekMapLoader";

export default function MapTestPage() {
  return (
    <main className="min-h-screen bg-cream px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 font-display text-4xl text-forest">
          Treknama Map Preview
        </h1>

        <p className="mb-8 text-muted">
          Testing the interactive Hampta Pass route map.
        </p>

        <TrekMapLoader />
      </div>
    </main>
  );
}
