
import type { Trek, Difficulty } from "@/types/trek";
import { treks } from "@/data/treks";

export type TrekPreferences = {
  difficulty: Difficulty | "Any";
  maxDays: number;
  maxBudget: number;
};

export type TrekRecommendation = {
  trek: Trek;
  score: number;
  reasons: string[];
};

function getMaximumDuration(duration: string): number {
  const numbers = duration.match(/\d+/g)?.map(Number) ?? [];
  return numbers.length > 0 ? Math.max(...numbers) : 0;
}

function getMaximumBudget(budget: string): number {
  const numbers =
    budget.match(/\d[\d,]*/g)?.map((value) =>
      Number(value.replace(/,/g, ""))
    ) ?? [];

  return numbers.length > 0 ? Math.max(...numbers) : 0;
}

export function recommendTreks(
  preferences: TrekPreferences
): TrekRecommendation[] {
  const recommendations = treks.map((trek) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Difficulty score: 40 points
    if (
      preferences.difficulty === "Any" ||
      trek.difficulty === preferences.difficulty
    ) {
      score += 40;
      reasons.push("Difficulty matches your preference");
    } else {
      reasons.push(
        `Difficulty is ${trek.difficulty}, while you selected ${preferences.difficulty}`
      );
    }

    // 2. Duration score: 30 points
    const trekDays = getMaximumDuration(trek.duration);

    if (trekDays > 0) {
      const durationScore =
        trekDays <= preferences.maxDays
          ? 30
          : (preferences.maxDays / trekDays) * 30;

      score += durationScore;

      if (trekDays <= preferences.maxDays) {
        reasons.push("Fits within your preferred duration");
      } else {
        reasons.push(
          `May take longer than your ${preferences.maxDays}-day preference`
        );
      }
    } else {
      reasons.push("Duration information is unavailable");
    }

    // 3. Budget score: 30 points
    const trekBudget = getMaximumBudget(trek.estimatedBudget);

    if (trekBudget > 0) {
      const budgetScore =
        trekBudget <= preferences.maxBudget
          ? 30
          : (preferences.maxBudget / trekBudget) * 30;

      score += budgetScore;

      if (trekBudget <= preferences.maxBudget) {
        reasons.push("Within your preferred budget");
      } else {
        reasons.push("Estimated cost exceeds your preferred budget");
      }
    } else {
      reasons.push("Budget information is unavailable");
    }

    return {
      trek,
      score: Math.round(score),
      reasons,
    };
  });

  // Show the highest matching treks first
  return recommendations.sort((a, b) => b.score - a.score);
}
