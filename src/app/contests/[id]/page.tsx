import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContestDetail } from "@/components/contests/contest-detail";
import { contests } from "@/lib/content";

export function generateStaticParams() {
  return contests.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/contests/[id]">): Promise<Metadata> {
  const { id } = await params;
  const c = contests.find((x) => x.id === id);
  return c ? { title: `${c.title.bn} | বিজয়ী (Beejoyi)`, description: c.prize.bn } : {};
}

async function Detail({ params }: { params: PageProps<"/contests/[id]">["params"] }) {
  const { id } = await params;
  if (!contests.some((c) => c.id === id)) notFound();
  return <ContestDetail id={id} />;
}

// params are read inside Suspense so navigation between contests stays instant.
export default function ContestPage({ params }: PageProps<"/contests/[id]">) {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <Detail params={params} />
    </Suspense>
  );
}
