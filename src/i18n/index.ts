import type { Locale, Translations } from "./types";
import en from "./locales/en";
import fr from "./locales/fr";
import ar from "./locales/ar";

export type { Locale, Translations };

export const locales: Locale[] = ["en", "fr", "ar"];

export const localeNames: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "عربي",
};

export const translations: Record<Locale, Translations> = { en, fr, ar };

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem("toumai-locale") as Locale | null;
  if (stored && locales.includes(stored)) return stored;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("ar")) return "ar";
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
