
"use client";

import dynamic from "next/dynamic";

const KedarkanthaMap = dynamic(
  () => import("@/components/KedarkanthaMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-cream text-forest">
        Loading Kedarkantha interactive map...
      </div>
    ),
  }
);

export default function KedarkanthaMapLoader() {
  return <KedarkanthaMap />;
}
