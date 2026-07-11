"use client";

import { useTranslation } from "@/contexts/LanguageProvider";

export default function SkipLink() {
  const { t } = useTranslation();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-black focus:rounded"
    >
      {t.nav.skipToContent}
    </a>
  );
}
