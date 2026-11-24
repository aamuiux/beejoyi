import type { Metadata } from "next";
import { Suspense } from "react";
import { ContestsBrowser } from "@/components/contests/contests-browser";

export const metadata: Metadata = {
  title: "সব কনটেস্ট | বিজয়ী (Beejoyi)",
  description: "বয়স, বিষয় আর ফি দিয়ে বাংলাদেশের শিক্ষার্থীদের কনটেস্ট খুঁজুন।",
};

export default function ContestsPage() {
  return (
    <Suspense>
      <ContestsBrowser />
    </Suspense>
  );
}
