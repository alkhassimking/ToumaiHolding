"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import HeroParticles from "@/components/ui/HeroParticles";
import TypingText from "@/components/ui/TypingText";
import { useTranslation } from "@/contexts/LanguageProvider";

export default function Hero() {
  const { t, locale } = useTranslation();
  const isArabic = locale === "ar";

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden vignette">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14)_0%,transparent_65%)]" />
        <motion.div
          className="absolute top-[15%] left-[10%] w-[18rem] sm:w-[28rem] h-[18rem] sm:h-[28rem] rounded-full bg-gold/10 blur-[140px]"
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[8%] w-[14rem] sm:w-[22rem] h-[14rem] sm:h-[22rem] rounded-full bg-gold/8 blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1], x: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] h-[min(700px,90vw)] rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(212,175,55,0.08) 20%, transparent 40%, rgba(212,175,55,0.05) 60%, transparent 80%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <HeroParticles />
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl scale-150" />
            <Image
              src="/logos/Toumai Holding.png"
              alt={t.hero.brandName}
              width={96}
              height={96}
              className="relative object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-[0_0_30px_rgba(212,175,55,0.35)]"
              priority
            />
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 1 }}
          className={`inline-block text-gold text-[11px] md:text-xs font-semibold mb-6 sm:mb-7 ${
            isArabic ? "tracking-wide" : "tracking-[0.38em] uppercase"
          }`}
        >
          {t.hero.welcome}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className={`text-gradient-gold font-light mb-6 sm:mb-7 leading-none whitespace-nowrap max-w-full mx-auto overflow-visible ${
            isArabic
              ? "tracking-normal"
              : "tracking-[0.04em] xs:tracking-[0.06em] sm:tracking-[0.08em] md:tracking-[0.1em] uppercase"
          }`}
          style={{
            fontFamily: isArabic ? "var(--font-arabic)" : "var(--font-display)",
            fontSize: isArabic
              ? "clamp(1.45rem, 0.55rem + 6.2vw, 5.25rem)"
              : "clamp(1.15rem, 0.35rem + 5.4vw, 5.25rem)",
          }}
        >
          {t.hero.brandName}
        </motion.h1>

        <div className="line-gold w-20 mx-auto mb-8" />

        <TypingText
          key={t.hero.slogan}
          text={t.hero.slogan}
          className="text-base sm:text-xl md:text-2xl lg:text-[1.65rem] text-silver font-light mb-8 tracking-wide px-2"
          delay={0.85}
          speed={32}
        />

        <motion.p
          key={t.hero.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-silver/75 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 px-1"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#ecosystem"
            className="group btn-gold inline-flex items-center gap-3 px-8 sm:px-9 py-4 sm:py-[1.125rem] rounded-full text-sm sm:text-[0.95rem] w-full sm:w-auto justify-center max-w-xs min-h-[3rem]"
          >
            {t.hero.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#about"
            className="btn-outline-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm sm:text-[0.95rem] w-full sm:w-auto justify-center max-w-xs min-h-[3rem]"
          >
            {t.nav.about}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#ecosystem" aria-label={t.nav.scrollDown}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="w-px h-8 bg-gradient-to-b from-transparent to-gold/50" />
            <ChevronDown className="w-5 h-5 text-gold/50" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
