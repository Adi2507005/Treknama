type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
}: SectionHeadingProps) {
  const titleColor = tone === "light" ? "text-cream" : "text-charcoal";
  const textColor = tone === "light" ? "text-cream/80" : "text-muted";

  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl leading-tight ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 ${textColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
