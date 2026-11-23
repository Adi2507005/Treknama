import { DiscoverSection } from "@/components/DiscoverSection";
import {
  CommunitySection,
  RecommendationsSection,
  RouteSection,
} from "@/components/InfoSections";

export default function Home() {
  return (
    <main>
      <DiscoverSection />
      <RouteSection />
      <RecommendationsSection />
      <CommunitySection />
    </main>
  );
}
