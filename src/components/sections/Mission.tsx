"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslation } from "@/contexts/LanguageProvider";
import {
  TrendingUp,
  Server,
  Zap,
  Users,
  Leaf,
  Network,
  type LucideIcon,
} from "lucide-react";

const iconMap: LucideIcon[] = [TrendingUp, Server, Zap, Users, Leaf, Network];

export default function Mission() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section id="mission" className="py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-lighter to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label={t.mission.label} title={t.mission.title} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.mission.items.map((item, index) => {
            const Icon = iconMap[index];
            return (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group h-full"
              >
                <div className="h-full glass-gold rounded-2xl p-5 sm:p-7 md:p-8 hover:glow-gold-strong hover:border-gold/35 transition-all duration-500 cursor-default flex flex-col">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-gold/20 group-hover:scale-105 transition-all duration-400 shrink-0">
                    {Icon && <Icon className="w-5 h-5 text-gold" />}
                  </div>
                  <h3
                    className="text-lg sm:text-xl text-ivory mb-2.5 sm:mb-3 font-light leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-silver/80 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
