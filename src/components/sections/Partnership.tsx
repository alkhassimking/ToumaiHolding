"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslation } from "@/contexts/LanguageProvider";
import { partnershipEmail } from "@/data/assets";
import { ArrowRight, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Partnership() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(partnershipEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="partnership"
      className="py-20 sm:py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_65%)]" />
      <div className="absolute inset-0 noise opacity-25" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <SectionHeader
          label={t.partnership.label}
          title={t.partnership.title}
          subtitle={t.partnership.subtitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-gold rounded-3xl p-8 sm:p-10 md:p-16 glow-gold-strong"
        >
          <p className="text-silver text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {t.partnership.description}
          </p>

          <div className="mb-10">
            <p className="text-gold/70 text-[11px] tracking-[0.25em] uppercase mb-3 font-semibold">
              {t.partnership.emailLabel}
            </p>
            <a
              href={`mailto:${partnershipEmail}`}
              className="group inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl text-gradient-gold font-light break-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gold shrink-0" />
              {partnershipEmail}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-silver/60 hover:text-gold transition-colors"
              aria-label={t.partnership.copy}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? t.partnership.copied : t.partnership.copy}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={`mailto:${partnershipEmail}?subject=Partnership%20Inquiry`}
              className="group btn-gold inline-flex items-center gap-3 px-8 sm:px-9 py-4 rounded-full text-sm sm:text-[0.95rem] w-full sm:w-auto justify-center min-h-[3rem]"
            >
              <Mail className="w-4 h-4" />
              {t.partnership.getInTouch}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </a>
            <a
              href={`mailto:${partnershipEmail}?subject=Investment%20Opportunity`}
              className="btn-outline-gold inline-flex items-center gap-3 px-8 sm:px-9 py-4 rounded-full text-sm sm:text-[0.95rem] w-full sm:w-auto justify-center min-h-[3rem]"
            >
              {t.partnership.investmentInquiry}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
