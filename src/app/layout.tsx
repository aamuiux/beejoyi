import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";
import { MobileTabBar, SiteFooter } from "@/components/home/sections";
import { SiteHeader } from "@/components/home/site-header";
import { HomeProvider } from "@/lib/home-state";
import "./globals.css";

// Anek Bangla is the single typeface for the whole site (Bangla + Latin, variable weight and width).
const anek = Anek_Bangla({
  variable: "--font-anek",
  subsets: ["bengali", "latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "বিজয়ী (Beejoyi): শিক্ষার্থীদের কনটেস্ট, গেম আর সার্টিফিকেট",
  description:
    "প্রি-স্কুল থেকে এইচএসসি: বাংলাদেশের শিক্ষার্থীদের জন্য কনটেস্ট, গেম আর সার্টিফিকেট, এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${anek.variable} h-full`}>
      <body className="min-h-full isolate">
        <HomeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileTabBar />
        </HomeProvider>
      </body>
    </html>
  );
}
