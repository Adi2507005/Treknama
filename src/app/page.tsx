
import { DiscoverSection } from "@/components/DiscoverSection";
import { CompareSection } from "@/components/CompareSection";
import {
  CommunitySection,
  RecommendationsSection,
  RouteSection,
} from "@/components/InfoSections";

export default function Home() {
  return (
    <main>
      <DiscoverSection />
      <CompareSection />
      <RouteSection />
      <RecommendationsSection />
      <CommunitySection />
    </main>
  );
}
