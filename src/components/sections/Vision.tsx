"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslation } from "@/contexts/LanguageProvider";
import { Eye } from "lucide-react";

export default function Vision() {
  const { t } = useTranslation();

  return (
    <section id="vision" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_55%)]"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gold/6 rounded-full blur-[160px]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 noise opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <SectionHeader label={t.vision.label} title={t.vision.title} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-gold rounded-3xl p-10 md:p-16 glow-gold-strong relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-24 -right-24 w-72 h-72 bg-gold/8 rounded-full blur-[100px]"
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-72 h-72 bg-gold/8 rounded-full blur-[100px]"
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.2 }}
          />

          <div className="absolute top-8 left-8 opacity-40">
            <Eye className="w-7 h-7 text-gold" />
          </div>

          <blockquote
            className="relative text-2xl md:text-3xl lg:text-[2.35rem] font-light leading-relaxed text-ivory/95 italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;{t.vision.quote}&rdquo;
          </blockquote>

          <div className="line-gold w-28 mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
}
