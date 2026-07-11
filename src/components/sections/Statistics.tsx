"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useTranslation } from "@/contexts/LanguageProvider";

export default function Statistics() {
  const { t } = useTranslation();

  const stats = [
    { label: t.statistics.companies, value: 10, suffix: "+" },
    { label: t.statistics.sectors, value: 20, suffix: "+" },
    { label: t.statistics.projects, value: 50, suffix: "+" },
    {
      label: t.statistics.futureVision,
      value: 1,
      suffix: "",
      text: t.statistics.africa,
    },
  ];

  return (
    <section id="statistics" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-gold rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 glow-gold-strong relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 relative">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                className="text-center"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  text={stat.text}
                />
                <p className="mt-3 text-silver/80 text-xs md:text-sm tracking-[0.25em] uppercase font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
