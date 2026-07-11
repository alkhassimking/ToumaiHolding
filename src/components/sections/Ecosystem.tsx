"use client";

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import CompanyLogo from "@/components/ui/CompanyLogo";
import { useTranslation } from "@/contexts/LanguageProvider";
import { subsidiaryAngles, subsidiaryUrls } from "@/data/assets";
import { ExternalLink } from "lucide-react";

const EcosystemBackground = dynamic(() => import("./EcosystemBackground"), {
  ssr: false,
  loading: () => null,
});

const RADIUS = 340;
const CENTER = 420;

function getPosition(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export default function Ecosystem() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickingId, setClickingId] = useState<string | null>(null);

  const companies = t.subsidiaries;

  const handleClick = useCallback((id: string, url: string) => {
    setClickingId(id);
    setActiveId(id);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setClickingId(null);
    }, 400);
  }, []);

  const positions = useMemo(
    () =>
      companies.map((c) => {
        const angle = subsidiaryAngles[c.id] ?? 0;
        return { id: c.id, angle, ...getPosition(angle, RADIUS) };
      }),
    [companies]
  );

  return (
    <section id="ecosystem" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
      <EcosystemBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label={t.ecosystem.label}
          title={t.ecosystem.title}
          subtitle={t.ecosystem.subtitle}
        />

        {/* Desktop / tablet radial layout */}
        <div
          className="relative mx-auto hidden lg:block"
          style={{ maxWidth: 860, height: 860 }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
            aria-hidden="true"
          >
            <defs>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {positions.map((pos) => {
              const isLit = activeId === pos.id || hoveredId === pos.id;
              return (
                <g key={pos.id}>
                  <line
                    x1={CENTER}
                    y1={CENTER}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={
                      isLit ? "rgba(212,175,55,0.9)" : "rgba(212,175,55,0.14)"
                    }
                    strokeWidth={isLit ? 2.5 : 1}
                    filter={isLit ? "url(#lineGlow)" : undefined}
                    style={{ transition: "all 0.45s ease" }}
                  />
                  <circle r="3.5" fill="#f0d78c" opacity={isLit ? 1 : 0.5}>
                    <animateMotion
                      dur={`${2.4 + pos.angle / 100}s`}
                      repeatCount="indefinite"
                      path={`M${CENTER},${CENTER} L${pos.x},${pos.y}`}
                    />
                  </circle>
                </g>
              );
            })}

            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="rgba(212,175,55,0.07)"
              strokeWidth="1"
              strokeDasharray="4 12"
            />
          </svg>

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ width: 176, height: 176 }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full rounded-full glass-gold glow-gold-strong flex items-center justify-center p-4 relative"
            >
              <div className="absolute inset-0 rounded-full border border-gold/20" />
              <div className="absolute -inset-3 rounded-full border border-gold/10" />
              <Image
                src="/logos/Toumai Holding.png"
                alt={t.hero.brandName}
                width={128}
                height={128}
                quality={100}
                className="object-contain relative z-10"
                priority
              />
            </motion.div>
          </div>

          {companies.map((company) => {
            const pos = positions.find((p) => p.id === company.id);
            if (!pos) return null;
            const left = (pos.x / (CENTER * 2)) * 100;
            const top = (pos.y / (CENTER * 2)) * 100;
            const isHovered = hoveredId === company.id;
            const isClicking = clickingId === company.id;
            const lit = activeId === company.id || isHovered;

            return (
              <motion.button
                key={company.id}
                type="button"
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
                style={{ left: `${left}%`, top: `${top}%` }}
                onMouseEnter={() => setHoveredId(company.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  handleClick(company.id, subsidiaryUrls[company.id])
                }
                animate={{
                  y: isHovered ? -8 : 0,
                  scale: isClicking ? 0.94 : isHovered ? 1.06 : 1,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                aria-label={`${company.name} - ${company.description}`}
              >
                <div
                  className={`rounded-2xl p-4 xl:p-5 w-[12.5rem] xl:w-52 transition-all duration-400 ${
                    lit
                      ? "glass-gold glow-gold-strong border-gold/45"
                      : "glass border border-gold/10"
                  } ${isClicking ? "ring-2 ring-gold/50" : ""}`}
                >
                  <div className="flex justify-center mb-3 h-[4.5rem] items-center">
                    <CompanyLogo id={company.id} name={company.name} size={72} />
                  </div>
                  <p className="text-gold text-sm font-semibold text-center tracking-wide mb-1.5">
                    {company.name}
                  </p>
                  <p className="text-silver/55 text-[11px] text-center leading-snug line-clamp-2">
                    {company.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {(hoveredId || activeId) && (
            <motion.div
              key={hoveredId || activeId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="hidden lg:block mt-10 max-w-md mx-auto text-center glass-gold rounded-2xl p-7 glow-gold"
            >
              {(() => {
                const company = companies.find(
                  (c) => c.id === (hoveredId || activeId)
                );
                if (!company) return null;
                return (
                  <>
                    <div className="flex justify-center mb-3">
                      <CompanyLogo id={company.id} name={company.name} size={88} />
                    </div>
                    <h3
                      className="text-2xl text-gold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {company.name}
                    </h3>
                    <p className="text-silver text-sm mb-4">{company.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold/80 text-xs font-medium">
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t.ecosystem.clickToVisit}
                    </span>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile / tablet grid — always balanced */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:hidden">
          {companies.map((company) => (
            <motion.button
              key={company.id}
              type="button"
              onClick={() =>
                handleClick(company.id, subsidiaryUrls[company.id])
              }
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="glass-gold rounded-2xl p-4 sm:p-5 text-center hover:glow-gold transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center"
            >
              <div className="flex justify-center mb-3 h-16 items-center">
                <CompanyLogo id={company.id} name={company.name} size={64} />
              </div>
              <p className="text-gold text-xs sm:text-sm font-semibold mb-1">
                {company.name}
              </p>
              <p className="text-silver/55 text-[10px] sm:text-[11px] leading-tight line-clamp-2">
                {company.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
