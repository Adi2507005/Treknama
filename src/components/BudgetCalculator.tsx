
"use client";

import { useState } from "react";

type BudgetCalculatorProps = {
  trekName: string;
  duration: string;
  estimatedBudget: string;
};

function getDays(duration: string): number {
  const numbers = duration.match(/\d+/g)?.map(Number) ?? [];
  return numbers.length > 0 ? Math.max(...numbers) : 1;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BudgetCalculator({
  trekName,
  duration,
  estimatedBudget,
}: BudgetCalculatorProps) {
  const [people, setPeople] = useState(1);
  const [days, setDays] = useState(() => getDays(duration));

  const [transport, setTransport] = useState(0);
  const [accommodation, setAccommodation] = useState(0);
  const [food, setFood] = useState(0);
  const [permits, setPermits] = useState(0);
  const [equipment, setEquipment] = useState(0);
  const [miscellaneous, setMiscellaneous] = useState(0);

  const dailyCost = accommodation + food;

  const costPerPerson =
    transport +
    dailyCost * days +
    permits +
    equipment +
    miscellaneous;

  const groupTotal = costPerPerson * people;

  const fields = [
    {
      label: "Transportation",
      description: "Total travel cost per person",
      value: transport,
      setter: setTransport,
    },
    {
      label: "Accommodation",
      description: "Cost per person per night",
      value: accommodation,
      setter: setAccommodation,
    },
    {
      label: "Food and meals",
      description: "Food cost per person per day",
      value: food,
      setter: setFood,
    },
    {
      label: "Permits and entry fees",
      description: "Total cost per person",
      value: permits,
      setter: setPermits,
    },
    {
      label: "Equipment rental",
      description: "Total rental cost per person",
      value: equipment,
      setter: setEquipment,
    },
    {
      label: "Miscellaneous",
      description: "Other expenses per person",
      value: miscellaneous,
      setter: setMiscellaneous,
    },
  ];

  function resetBudget() {
    setPeople(1);
    setDays(getDays(duration));
    setTransport(0);
    setAccommodation(0);
    setFood(0);
    setPermits(0);
    setEquipment(0);
    setMiscellaneous(0);
  }

  return (
    <section className="mt-12 rounded-3xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Trip planning
          </p>

          <h2 className="mt-2 font-display text-3xl text-forest">
            Trek Budget Calculator
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Estimate your expenses for {trekName}. Adjust the values to
            create a budget that suits your trip.
          </p>
        </div>

        <button
          type="button"
          onClick={resetBudget}
          className="rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest transition hover:bg-forest/5"
        >
          Reset budget
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Number of people

          <input
            type="number"
            min="1"
            max="50"
            value={people}
            onChange={(event) =>
              setPeople(
                Math.min(50, Math.max(1, Number(event.target.value) || 1))
              )
            }
            className="h-12 rounded-xl border border-forest/20 px-4 outline-none focus:ring-2 focus:ring-forest/20"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Trip duration (days)

          <input
            type="number"
            min="1"
            max="60"
            value={days}
            onChange={(event) =>
              setDays(
                Math.min(60, Math.max(1, Number(event.target.value) || 1))
              )
            }
            className="h-12 rounded-xl border border-forest/20 px-4 outline-none focus:ring-2 focus:ring-forest/20"
          />
        </label>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-xl text-forest">
          Expense breakdown
        </h3>

        <p className="mt-1 text-sm text-muted">
          Enter your estimated costs in Indian rupees.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label
              key={field.label}
              className="flex flex-col gap-2 rounded-xl border border-forest/10 p-4"
            >
              <span className="font-semibold text-charcoal">
                {field.label}
              </span>

              <span className="text-xs text-muted">
                {field.description}
              </span>

              <div className="flex items-center rounded-lg border border-forest/20 px-3">
                <span className="text-muted">₹</span>

                <input
                  type="number"
                  min="0"
                  value={field.value}
                  onChange={(event) =>
                    field.setter(
                      Math.max(0, Number(event.target.value) || 0)
                    )
                  }
                  className="h-11 w-full bg-transparent px-2 text-sm text-charcoal outline-none"
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-cream p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">
          Your estimated trip budget
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted">
              Estimated cost per person
            </p>

            <p className="mt-1 font-display text-3xl font-bold text-forest">
              {formatCurrency(costPerPerson)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">
              Total cost for {people} {people === 1 ? "person" : "people"}
            </p>

            <p className="mt-1 font-display text-3xl font-bold text-forest">
              {formatCurrency(groupTotal)}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-forest/10 pt-4 text-sm text-muted">
          <div className="flex justify-between gap-3">
            <span>Accommodation and food</span>
            <span className="font-semibold text-charcoal">
              {formatCurrency(dailyCost * days * people)}
            </span>
          </div>

          <div className="mt-2 flex justify-between gap-3">
            <span>Other expenses</span>
            <span className="font-semibold text-charcoal">
              {formatCurrency(
                (transport + permits + equipment + miscellaneous) * people
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-forest/10 p-4">
        <p className="text-sm font-semibold text-charcoal">
          Published trek budget
        </p>

        <p className="mt-1 text-lg font-bold text-forest">
          {estimatedBudget}
        </p>

        <p className="mt-2 text-xs leading-5 text-muted">
          This is the existing estimated budget range for {trekName}.
          Your calculator result is a separate user-entered estimate and
          may not include every operator or travel expense.
        </p>
      </div>

      <p className="mt-5 text-xs leading-5 text-muted">
        This calculator provides planning estimates, not live prices or
        booking quotations. Verify transport, accommodation, permits,
        meals and operator inclusions before travelling.
      </p>
    </section>
  );
}
