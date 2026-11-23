"use client";

import { useState } from "react";

type TrekPhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function TrekPhoto({ src, alt, className = "" }: TrekPhotoProps) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return (
      <div
        className={`flex items-end bg-linear-to-br from-forest to-charcoal p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <p className="font-display text-lg text-cream/90">Himalayan trail</p>
      </div>
    );
  }

  return (
    // Native img keeps next.config.ts unchanged (no remote image domains).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasFailed(true)}
    />
  );
}
