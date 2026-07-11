"use client";

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageProvider";

type LegalKey = "privacy" | "terms" | "cookies";

export default function LegalPage({ page }: { page: LegalKey }) {
  const { t } = useTranslation();
  const content = t.legal[page];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8 text-gradient-gold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {content.title}
        </h1>
        <div className="space-y-6 text-silver leading-relaxed text-sm sm:text-base">
          <p>{t.legal.lastUpdated}</p>
          <p>{content.intro}</p>
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-white text-xl sm:text-2xl font-light mt-8 mb-3">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/"
          className="inline-block mt-10 sm:mt-12 text-gold hover:underline"
        >
          ← {t.legal.backHome}
        </Link>
      </div>
    </div>
  );
}
