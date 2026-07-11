"use client";

import { useTranslation } from "@/contexts/LanguageProvider";
import { localeNames, type Locale } from "@/i18n";

export default function LanguageSelector() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-1 border border-gold/15 bg-black/40 backdrop-blur-md"
      role="group"
      aria-label={t.ui.languageSelector}
    >
      {(Object.keys(localeNames) as Locale[]).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-full transition-all duration-300 tracking-wide ${
            locale === loc
              ? "bg-gold/20 text-gold shadow-[0_0_12px_rgba(212,175,55,0.15)]"
              : "text-silver/70 hover:text-gold"
          }`}
          aria-pressed={locale === loc}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
