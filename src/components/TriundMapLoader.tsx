
"use client";

import dynamic from "next/dynamic";

const TriundMap = dynamic(() => import("@/components/TriundMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl bg-cream text-forest">
      Loading Triund interactive map...
    </div>
  ),
});

export default function TriundMapLoader() {
  return <TriundMap />;
}
