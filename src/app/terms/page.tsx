import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { breadcrumbSchema, SITE_DESCRIPTION } from "@/data/schema";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service — ${SITE_DESCRIPTION}`,
  alternates: { canonical: "https://www.toumaiholding.com/terms" },
  openGraph: {
    title: "Terms of Service | Toumai Holding",
    description: "Terms governing use of the Toumai Holding website.",
    url: "https://www.toumaiholding.com/terms",
  },
};

export default function TermsRoute() {
  const schema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LegalPage page="terms" />
    </>
  );
}
