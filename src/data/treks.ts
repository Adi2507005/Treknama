import type { Trek } from "@/types/trek";

/**
 * Static sample treks for the first homepage version.
 * Distances, durations, and budgets are approximate student-project
 * estimates, not official operator quotes.
 */
export const treks: Trek[] = [
  {
    slug: "hampta-pass",
    name: "Hampta Pass",
    location: "Kullu–Lahaul, Himachal Pradesh",
    difficulty: "Moderate",
    duration: "5–6 days",
    distance: "About 26 km",
    estimatedBudget: "₹8,000–₹15,000",
    imageUrl:
      "/images/hampta-pass.webp",
    imageAlt: "High Himalayan valley with steep ridges and a winding trail",
    summary:
      "A classic crossover from green Kullu meadows into the drier Lahaul valley, often chosen as a first high Himalayan pass.",
  },
  {
    slug: "triund",
    name: "Triund",
    location: "Dharamshala, Himachal Pradesh",
    difficulty: "Easy",
    duration: "1–2 days",
    distance: "About 9 km",
    estimatedBudget: "₹2,000–₹5,000",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Mountain ridgeline above forested hills under a clear sky",
    summary:
      "A short ridge walk above McLeod Ganj with Dhauladhar views — a popular weekend introduction to Himalayan trails.",
  },
  {
    slug: "kedarkantha",
    name: "Kedarkantha",
    location: "Govind Wildlife Sanctuary, Uttarakhand",
    difficulty: "Moderate",
    duration: "5–6 days",
    distance: "About 20 km",
    estimatedBudget: "₹7,000–₹12,000",
    imageUrl:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Snow-covered Himalayan peak catching morning light",
    summary:
      "A winter-favourite summit trek known for pine forests, snow camps, and a wide 360-degree ridge view on a clear morning.",
  },
  {
    slug: "nag-tibba",
    name: "Nag Tibba",
    location: "Tehri Garhwal, Uttarakhand",
    difficulty: "Easy",
    duration: "2–3 days",
    distance: "About 15 km",
    estimatedBudget: "₹3,000–₹7,000",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Sunlight filtering through a dense mountain forest",
    summary:
      "The ‘Serpent’s Peak’ is a compact Garhwal trek with oak and rhododendron forest and a gentle summit ridge.",
  },
  {
    slug: "everest-base-camp",
    name: "Everest Base Camp",
    location: "Khumbu, Nepal",
    difficulty: "Challenging",
    duration: "12–14 days",
    distance: "About 130 km",
    estimatedBudget: "₹80,000–₹1,50,000",
    imageUrl:
      "/images/everest-base-camp.jpg",
    imageAlt: "Himalayan peaks rising above a high mountain valley in Nepal",
    summary:
      "A long, high-altitude journey through Sherpa villages and glacier country. Plan extra days, permits, and acclimatisation.",
  },
];

export function getTrekBySlug(slug: string): Trek | undefined {
  return treks.find((trek) => trek.slug === slug);
}

export function searchTreks(query: string): Trek[] {
  const normalised = query.trim().toLowerCase();

  if (!normalised) {
    return treks;
  }

  return treks.filter((trek) => {
    return (
      trek.name.toLowerCase().includes(normalised) ||
      trek.location.toLowerCase().includes(normalised)
    );
  });
}
