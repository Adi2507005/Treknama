
"use client";

import dynamic from "next/dynamic";

const TrekMap = dynamic(() => import("@/components/TrekMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl bg-cream text-forest">
      Loading interactive trek map...
    </div>
  ),
});

export default function TrekMapLoader() {
  return <TrekMap />;
}
