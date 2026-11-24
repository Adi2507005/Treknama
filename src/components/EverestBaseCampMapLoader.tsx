
"use client";

import dynamic from "next/dynamic";

const EverestBaseCampMap = dynamic(
  () => import("@/components/EverestBaseCampMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] items-center justify-center rounded-2xl bg-cream text-forest">
        Loading Everest Base Camp interactive map...
      </div>
    ),
  }
);

export default function EverestBaseCampMapLoader() {
  return <EverestBaseCampMap />;
}
