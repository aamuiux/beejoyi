import { ContestsSection } from "@/components/home/contests-section";
import { Hero } from "@/components/home/hero";
import {
  B2BBand,
  FaqSection,
  FinalCta,
  GamesSection,
  HowItWorks,
  JudgesTable,
  ParentsSection,
  ShowcaseSection,
} from "@/components/home/sections";

// The stage (direction contract: .impeccable/surfaces/src-app-page-tsx.md).
// Order: the stage and its action, tonight's contests, the rounds, the open judging,
// winners with their thinking, then parents, games, organisers, questions, curtain call.
export default function Home() {
  return (
    <main>
      <Hero />
      <ContestsSection />
      <HowItWorks />
      <JudgesTable />
      <ShowcaseSection />
      <ParentsSection />
      <GamesSection />
      <B2BBand />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
