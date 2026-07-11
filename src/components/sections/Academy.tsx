"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslation } from "@/contexts/LanguageProvider";
import { Award } from "lucide-react";

export default function Academy() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="academy"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-light to-black" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader
          label={t.academy.label}
          title={t.academy.title}
          subtitle={t.academy.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-start mb-10 sm:mb-12 lg:mb-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center p-2 shrink-0">
                <Image
                  src="/logos/TAcademy.png"
                  alt="TAcademy"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-gold text-sm tracking-widest uppercase">
                  {t.academy.program}
                </p>
                <p className="text-silver text-sm">{t.academy.programNote}</p>
              </div>
            </div>

            <p className="text-silver text-base sm:text-lg leading-relaxed mb-6">
              {t.academy.paragraph1}
            </p>
            <p className="text-silver/70 leading-relaxed">
              {t.academy.paragraph2}
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: reduceMotion ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex lg:items-center lg:justify-end"
          >
            <div className="flex items-center gap-3 glass-gold rounded-full px-5 sm:px-6 py-3 w-fit max-w-full">
              <Award className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm text-silver">{t.academy.badge}</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 auto-rows-fr">
          {t.academy.focus.map((focus, index) => (
            <motion.button
              key={focus.title}
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.28),
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="group h-full text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl"
            >
              <article className="h-full min-h-[9.75rem] sm:min-h-[10.5rem] lg:min-h-[11.25rem] glass-gold rounded-xl p-3.5 sm:p-4 md:p-5 flex flex-col items-center text-center hover:glow-gold hover:border-gold/35 transition-all duration-400 cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto mb-2.5 sm:mb-3 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300 shrink-0">
                  <span className="text-gold text-[10px] sm:text-xs font-bold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p
                  className="text-xs sm:text-sm text-ivory font-light leading-snug mb-1.5 sm:mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {focus.title}
                </p>
                <p className="text-[10px] sm:text-[11px] text-silver/70 leading-relaxed flex-1">
                  {focus.description}
                </p>
              </article>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
