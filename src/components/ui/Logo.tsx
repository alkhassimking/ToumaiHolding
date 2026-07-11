"use client";

import Image from "next/image";
import { useTranslation } from "@/contexts/LanguageProvider";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: {
    icon: 40,
    iconClass: "w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11",
    text: "hidden min-[380px]:inline text-[clamp(0.9rem,2.6vw,1.5rem)]",
    gap: "gap-2 sm:gap-2.5 md:gap-3.5",
  },
  md: {
    icon: 56,
    iconClass: "w-14 h-14",
    text: "text-2xl",
    gap: "gap-4",
  },
  lg: {
    icon: 72,
    iconClass: "w-[4.5rem] h-[4.5rem]",
    text: "text-3xl",
    gap: "gap-4",
  },
};

export default function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const { t, locale } = useTranslation();
  const { icon, iconClass, text, gap } = sizes[size];
  const isArabic = locale === "ar";

  return (
    <div className={`flex items-center ${gap} min-w-0 ${className}`}>
      <Image
        src="/logos/Toumai Holding.png"
        alt={t.hero.brandName}
        width={icon}
        height={icon}
        className={`object-contain shrink-0 drop-shadow-[0_0_16px_rgba(212,175,55,0.25)] ${iconClass}`}
        priority
      />
      {showText && (
        <span
          className={`${text} font-medium leading-none whitespace-nowrap ${
            isArabic
              ? "tracking-normal"
              : "tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.12em] uppercase"
          }`}
          style={{
            fontFamily: isArabic ? "var(--font-arabic)" : "var(--font-display)",
          }}
        >
          {t.hero.brandName}
        </span>
      )}
    </div>
  );
}
