
"use client";

import dynamic from "next/dynamic";

const NagTibbaMap = dynamic(
  () => import("@/components/NagTibbaMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-cream text-forest">
        Loading Nag Tibba interactive map...
      </div>
    ),
  }
);

export default function NagTibbaMapLoader() {
  return <NagTibbaMap />;
}
