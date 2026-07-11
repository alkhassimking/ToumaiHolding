import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { breadcrumbSchema, SITE_TITLE, SITE_DESCRIPTION } from "@/data/schema";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "https://www.toumaiholding.com/privacy" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
