import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SubmitEntry } from "@/components/contests/submit-entry";
import { contests } from "@/lib/content";

export function generateStaticParams() {
  return contests.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/contests/[id]/submit">): Promise<Metadata> {
  const { id } = await params;
  const c = contests.find((x) => x.id === id);
  return c ? { title: `জমা দাও: ${c.title.bn} | বিজয়ী (Beejoyi)` } : {};
}

async function Entry({ params }: { params: PageProps<"/contests/[id]/submit">["params"] }) {
  const { id } = await params;
  if (!contests.some((c) => c.id === id)) notFound();
  return <SubmitEntry id={id} />;
}

export default function SubmitPage({ params }: PageProps<"/contests/[id]/submit">) {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <Entry params={params} />
    </Suspense>
  );
}
