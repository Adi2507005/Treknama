
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { packingGuides } from "@/data/packing";

type CustomItem = {
  id: string;
  name: string;
  checked: boolean;
};

type SavedChecklist = {
  checkedItems: string[];
  customItems: CustomItem[];
};

type PackingChecklistProps = {
  trekSlug: string;
  trekName: string;
};

export function PackingChecklist({
  trekSlug,
  trekName,
}: PackingChecklistProps) {
  const categories = packingGuides[trekSlug] ?? [];
  const allItems = categories.flatMap((category) => category.items);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [loadedTrekSlug, setLoadedTrekSlug] = useState<string | null>(null);

  const storageKey = `treknama-packing-${trekSlug}`;

  // Load saved checklist whenever the trek changes.
  useEffect(() => {
    setLoadedTrekSlug(null);

    try {
      const savedData = localStorage.getItem(storageKey);

      if (savedData) {
        const parsed: SavedChecklist = JSON.parse(savedData);

        setCheckedItems(
          Array.isArray(parsed.checkedItems)
            ? parsed.checkedItems.filter((id) =>
                allItems.some((item) => item.id === id)
              )
            : []
        );

        setCustomItems(
          Array.isArray(parsed.customItems)
            ? parsed.customItems.filter(
                (item) =>
                  item &&
                  typeof item.id === "string" &&
                  typeof item.name === "string" &&
                  typeof item.checked === "boolean"
              )
            : []
        );
      } else {
        setCheckedItems([]);
        setCustomItems([]);
      }
    } catch {
      setCheckedItems([]);
      setCustomItems([]);
    }

    setNewItem("");
    setLoadedTrekSlug(trekSlug);
  }, [trekSlug]);

  // Automatically save changes after the correct trek is loaded.
  useEffect(() => {
    if (loadedTrekSlug !== trekSlug) return;

    const savedData: SavedChecklist = {
      checkedItems,
      customItems,
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(savedData));
    } catch (error) {
      console.error("Could not save packing checklist:", error);
    }
  }, [checkedItems, customItems, loadedTrekSlug, storageKey, trekSlug]);

  const totalItems = allItems.length + customItems.length;

  const packedItems =
    checkedItems.length +
    customItems.filter((item) => item.checked).length;

  const progress =
    totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  function toggleItem(id: string) {
    setCheckedItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleCustomItem(id: string) {
    setCustomItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function addCustomItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = newItem.trim();

    if (!name) return;

    setCustomItems((current) => [
      ...current,
      {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        checked: false,
      },
    ]);

    setNewItem("");
  }

  function removeCustomItem(id: string) {
    setCustomItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function resetChecklist() {
    setCheckedItems([]);

    setCustomItems((current) =>
      current.map((item) => ({ ...item, checked: false }))
    );
  }

  return (
    <section className="mt-14 rounded-3xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Trek preparation
          </p>

          <h2 className="mt-2 font-display text-3xl text-forest">
            Your packing checklist
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Equipment recommendations for your {trekName} adventure.
            Tick each item as you pack it.
          </p>
        </div>

        <button
          type="button"
          onClick={resetChecklist}
          className="rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest transition hover:bg-forest/5"
        >
          Reset checklist
        </button>
      </div>

      <div className="mt-8 rounded-2xl bg-cream p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-charcoal">
              Packing progress
            </p>

            <p className="mt-1 text-xs text-muted">
              {packedItems} of {totalItems} items packed
            </p>
          </div>

          <span className="font-display text-3xl font-bold text-forest">
            {progress}%
          </span>
        </div>

        <div
          className="mt-4 h-3 overflow-hidden rounded-full bg-forest/10"
          role="progressbar"
          aria-label="Packing completion"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-forest transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {progress === 100 && totalItems > 0 && (
          <p className="mt-3 text-sm font-semibold text-forest">
            ✓ Your checklist is complete!
          </p>
        )}
      </div>

      <div className="mt-8 space-y-8">
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className="border-b border-forest/10 pb-3 font-display text-xl text-forest">
              {category.name}
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => {
                const isChecked = checkedItems.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                      isChecked
                        ? "border-forest/20 bg-forest/5"
                        : "border-forest/10 bg-white hover:bg-cream/60"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(item.id)}
                      className="mt-1 h-4 w-4 accent-[#245b43]"
                    />

                    <span
                      className={`text-sm leading-6 ${
                        isChecked
                          ? "text-muted line-through"
                          : "text-charcoal"
                      }`}
                    >
                      {item.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-forest/10 pt-7">
        <h3 className="font-display text-xl text-forest">
          Your additional items
        </h3>

        <p className="mt-1 text-sm text-muted">
          Add any personal equipment that isn't already listed.
        </p>

        <form
          onSubmit={addCustomItem}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
            placeholder="Enter an additional item..."
            className="h-12 flex-1 rounded-xl border border-forest/20 px-4 text-sm outline-none focus:ring-2 focus:ring-forest/20"
          />

          <button
            type="submit"
            className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-mid"
          >
            + Add item
          </button>
        </form>

        {customItems.length > 0 && (
          <div className="mt-4 space-y-2">
            {customItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-forest/10 p-3"
              >
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCustomItem(item.id)}
                    className="h-4 w-4 accent-[#245b43]"
                  />

                  <span
                    className={`text-sm ${
                      item.checked
                        ? "text-muted line-through"
                        : "text-charcoal"
                    }`}
                  >
                    {item.name}
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => removeCustomItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="text-sm font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-7 rounded-xl bg-cream/70 p-4 text-xs leading-5 text-muted">
        Packing suggestions are general planning guidance, not a complete
        safety assessment. Check the season, forecast, route conditions,
        operator-provided equipment, and current trek requirements before
        departure. For high-altitude treks, seek appropriate professional
        guidance.
      </p>
    </section>
  );
}
