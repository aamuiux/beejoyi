import { ContestsSection } from "@/components/home/contests-section";
import { Hero } from "@/components/home/hero";
import {
  B2BBand,
  FaqSection,
  FinalCta,
  GamesSection,
  HowItWorks,
  ParentsSection,
  ShowcaseSection,
  TrustStrip,
} from "@/components/home/sections";

// Section order follows docs/homepage-strategy.md (serial position: find a contest first, join last).
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <ContestsSection />
      <HowItWorks />
      <ParentsSection />
      <GamesSection />
      <ShowcaseSection />
      <B2BBand />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
