"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type Locale,
  translations,
  detectLocale,
  getDir,
  locales,
} from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  t: (typeof translations)["en"];
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!locales.includes(newLocale)) return;
    setLocaleState(newLocale);
    localStorage.setItem("toumai-locale", newLocale);
  }, []);

  const t = translations[locale];
  const dir = getDir(locale);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.title = "توماي القابضة | Toumai Holding";
  }, [locale, dir, mounted]);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}
