import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { breadcrumbSchema, SITE_DESCRIPTION } from "@/data/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy — ${SITE_DESCRIPTION}`,
  alternates: { canonical: "https://www.toumaiholding.com/privacy" },
  openGraph: {
    title: "Privacy Policy | Toumai Holding",
    description: "How Toumai Holding collects, uses, and protects your information.",
    url: "https://www.toumaiholding.com/privacy",
  },
};

export default function PrivacyRoute() {
  const schema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LegalPage page="privacy" />
    </>
  );
}
