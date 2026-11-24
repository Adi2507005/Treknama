
import { BudgetCalculator } from "@/components/BudgetCalculator";

export default function BudgetTestPage() {
  return (
    <main className="min-h-screen bg-cream px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-3xl font-bold">
          Treknama Budget Calculator
        </h1>

        <p className="mb-8 text-gray-600">
          Test the trekking budget calculator before adding it
          to the main website.
        </p>

        <BudgetCalculator
          trekName="Hampta Pass"
          duration="5–6 days"
          estimatedBudget="₹8,000–₹15,000"
        />
      </div>
    </main>
  );
}
