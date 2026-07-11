"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";
import africaMap from "@/data/africa-map.json";
import { useTranslation } from "@/contexts/LanguageProvider";

interface AfricaMapProps {
  label?: string;
}

export default function AfricaMap({ label }: AfricaMapProps) {
  const { t, locale } = useTranslation();
  const uid = useId().replace(/:/g, "");
  const { viewBox, countries, chad, nodes } = africaMap;
  const isArabic = locale === "ar";

  const otherCountries = useMemo(
    () => countries.filter((c) => !c.isChad),
    [countries]
  );

  return (
    <div className="relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[400px] flex flex-col items-center justify-center">
      <svg
        viewBox={viewBox}
        className="w-full max-w-lg h-auto"
        aria-label={label || t.about.mapAria}
        role="img"
      >
        <defs>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.14)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </radialGradient>
          <linearGradient id={`stroke-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d78c" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a8892a" />
          </linearGradient>
          <linearGradient id={`line-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212,175,55,0)" />
            <stop offset="40%" stopColor="rgba(240,215,140,0.85)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0.15)" />
          </linearGradient>
          <filter id={`chadGlow-${uid}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`softGlow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx="400"
          cy="420"
          rx="340"
          ry="380"
          fill={`url(#glow-${uid})`}
        />

        {/* Continent countries — geographically accurate outlines */}
        <g
          fill="rgba(212,175,55,0.035)"
          stroke={`url(#stroke-${uid})`}
          strokeWidth="0.9"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {otherCountries.map((country) => (
            <motion.path
              key={country.name}
              d={country.d}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          ))}
        </g>

        {/* Chad — highlighted origin */}
        <motion.path
          d={chad.d}
          fill="rgba(212,175,55,0.32)"
          stroke="#d4af37"
          strokeWidth="1.6"
          strokeLinejoin="round"
          filter={`url(#chadGlow-${uid})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Expansion lines from Chad across Africa */}
        <g fill="none" strokeLinecap="round">
          {nodes.map((node, i) => (
            <motion.path
              key={`line-${node.name}`}
              d={`M${chad.cx} ${chad.cy} L${node.x} ${node.y}`}
              stroke={`url(#line-${uid})`}
              strokeWidth="1.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
                times: [0, 0.35, 0.7, 1],
              }}
            />
          ))}
        </g>

        {/* Traveling light particles along expansion paths */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`pulse-${node.name}`}
            r="2.2"
            fill="#f0d78c"
            filter={`url(#softGlow-${uid})`}
            animate={{
              cx: [chad.cx, node.x, node.x],
              cy: [chad.cy, node.y, node.y],
              opacity: [0, 1, 0],
              scale: [0.6, 1.2, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
              times: [0, 0.45, 1],
            }}
          />
        ))}

        {/* Destination nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${node.name}`}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="rgba(212,175,55,0.55)"
            stroke="rgba(240,215,140,0.7)"
            strokeWidth="0.8"
            animate={{
              opacity: [0.25, 0.9, 0.25],
              r: [2.2, 3.4, 2.2],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2 + i * 0.2,
            }}
          />
        ))}

        {/* Chad origin marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <motion.circle
            cx={chad.cx}
            cy={chad.cy}
            r="18"
            fill="none"
            stroke="rgba(212,175,55,0.5)"
            strokeWidth="1.2"
            animate={{ r: [14, 34], opacity: [0.65, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx={chad.cx}
            cy={chad.cy}
            r="18"
            fill="none"
            stroke="rgba(240,215,140,0.35)"
            strokeWidth="1"
            animate={{ r: [14, 46], opacity: [0.45, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
          <circle
            cx={chad.cx}
            cy={chad.cy}
            r="7"
            fill="#d4af37"
            filter={`url(#chadGlow-${uid})`}
          />
          <circle cx={chad.cx} cy={chad.cy} r="3" fill="#f0d78c" />
        </motion.g>

        <text
          x={chad.cx}
          y={chad.cy + 36}
          textAnchor="middle"
          fill="#d4af37"
          fontSize={isArabic ? "16" : "15"}
          fontFamily={isArabic ? "var(--font-arabic)" : "var(--font-display)"}
          fontWeight="500"
          letterSpacing={isArabic ? "0" : "0.28em"}
        >
          {t.about.chadLabel}
        </text>
      </svg>

      {label && (
        <p
          className={`mt-3 text-gold/70 text-[10px] sm:text-xs text-center px-4 max-w-sm ${
            isArabic ? "tracking-wide" : "tracking-[0.2em] uppercase"
          }`}
        >
          {label}
        </p>
      )}
    </div>
  );
}
