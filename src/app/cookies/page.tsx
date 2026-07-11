import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { breadcrumbSchema, SITE_DESCRIPTION } from "@/data/schema";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy — ${SITE_DESCRIPTION}`,
  alternates: { canonical: "https://www.toumaiholding.com/cookies" },
  openGraph: {
    title: "Cookie Policy | Toumai Holding",
    description: "How Toumai Holding uses cookies and similar technologies.",
    url: "https://www.toumaiholding.com/cookies",
  },
};

export default function CookiesRoute() {
  const schema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Cookie Policy", path: "/cookies" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LegalPage page="cookies" />
    </>
  );
}
