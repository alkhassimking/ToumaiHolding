"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslation } from "@/contexts/LanguageProvider";
import {
  Lightbulb,
  Shield,
  Award,
  Handshake,
  Leaf,
  Target,
  Crown,
  Zap,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: LucideIcon[] = [
  Lightbulb,
  Shield,
  Award,
  Handshake,
  Leaf,
  Target,
  Crown,
  Zap,
  HeartHandshake,
  Sparkles,
];

export default function WhyToumai() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section id="why" className="py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-black-lighter" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.04)_0%,transparent_55%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader
          label={t.why.label}
          title={t.why.title}
          subtitle={t.why.subtitle}
        />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 auto-rows-fr">
          {t.why.items.map((item, index) => {
            const Icon = iconMap[index];
            return (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group h-full min-h-0"
              >
                <article className="h-full min-h-[11.5rem] sm:min-h-[12.5rem] lg:min-h-[13.5rem] flex flex-col items-center text-center rounded-2xl glass-gold p-3.5 sm:p-5 hover:glow-gold transition-shadow duration-500">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-3 sm:mb-4 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 group-hover:scale-105 transition-all duration-400 shrink-0">
                    {Icon && (
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" aria-hidden />
                    )}
                  </div>
                  <h3
                    className="text-sm sm:text-base md:text-lg text-ivory mb-2 font-light leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-silver/75 text-[11px] sm:text-xs leading-relaxed flex-1">
                    {item.description}
                  </p>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
