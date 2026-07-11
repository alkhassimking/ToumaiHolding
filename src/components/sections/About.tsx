"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AfricaMap from "@/components/ui/AfricaMap";
import { useTranslation } from "@/contexts/LanguageProvider";
import { Building2, Network, Layers, TrendingUp } from "lucide-react";

const factIcons = [Building2, Network, Layers, TrendingUp];

export default function About() {
  const { t } = useTranslation();

  const facts = [
    { label: t.about.headquarters, value: t.about.headquartersValue },
    { label: t.about.ecosystem, value: t.about.ecosystemValue },
    { label: t.about.industries, value: t.about.industriesValue },
    { label: t.about.investmentFocus, value: t.about.investmentFocusValue },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-light to-black" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader label={t.about.label} title={t.about.title} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-silver text-lg leading-relaxed mb-5">
              {t.about.paragraph1}
            </p>
            <p className="text-silver/65 text-base leading-relaxed mb-10">
              {t.about.paragraph2}
            </p>

            <div className="grid grid-cols-2 gap-3.5">
              {facts.map((item, i) => {
                const Icon = factIcons[i];
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    whileHover={{ y: -5 }}
                    className="glass-gold rounded-2xl p-5 hover:glow-gold transition-all duration-400 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <p className="text-gold text-[10px] tracking-[0.2em] uppercase mb-1.5 font-semibold">
                      {item.label}
                    </p>
                    <p
                      className="text-ivory text-[15px] font-light leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="relative"
          >
            <div className="glass-gold rounded-3xl p-4 sm:p-6 md:p-8 glow-gold relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              <AfricaMap label={t.about.mapLabel} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
