"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslation } from "@/contexts/LanguageProvider";
import {
  Landmark,
  Globe,
  Radio,
  Monitor,
  Code,
  Brain,
  Shield,
  Cloud,
  HardDrive,
  Network,
  Wallet,
  CreditCard,
  ShoppingCart,
  Mail,
  Package,
  Truck,
  PackageCheck,
  Zap,
  Briefcase,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

const activityIcons: LucideIcon[] = [
  Landmark,
  Globe,
  Radio,
  Monitor,
  Code,
  Brain,
  Shield,
  Cloud,
  HardDrive,
  Network,
  Wallet,
  CreditCard,
  ShoppingCart,
  Mail,
  Package,
  Truck,
  PackageCheck,
  Zap,
  Briefcase,
  GraduationCap,
];

export default function BusinessActivities() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="activities"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader
          label={t.activities.label}
          title={t.activities.title}
          subtitle={t.activities.subtitle}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {t.activities.items.map((name, index) => {
            const Icon = activityIcons[index];
            return (
              <motion.div
                key={name}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: reduceMotion ? 0 : Math.min(index * 0.02, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <div className="h-full min-h-[7.5rem] sm:min-h-[8.5rem] glass rounded-xl p-3.5 sm:p-4 md:p-5 text-center group hover:glass-gold hover:glow-gold transition-all duration-400 cursor-default flex flex-col items-center justify-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2.5 sm:mb-3 rounded-lg bg-gold/5 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300 shrink-0">
                    {Icon && (
                      <Icon className="w-4 h-4 sm:w-[1.15rem] sm:h-[1.15rem] text-gold" />
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-[13px] text-silver/85 group-hover:text-ivory transition-colors leading-snug">
                    {name}
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
