"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl mb-12 sm:mb-16 md:mb-20 px-1 ${alignClass}`}
    >
      {label && (
        <span className="inline-block text-gold text-[11px] md:text-xs font-semibold tracking-[0.25em] sm:tracking-[0.35em] uppercase mb-4 sm:mb-5">
          {label}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight text-ivory mb-4 sm:mb-5 leading-[1.15]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-silver text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`line-gold w-16 mt-6 sm:mt-8 ${align === "center" ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
