"use client";

import Image from "next/image";
import { companyLogos } from "@/data/assets";

interface CompanyLogoProps {
  id: string;
  name: string;
  size?: number;
  className?: string;
}

export default function CompanyLogo({
  id,
  name,
  size = 72,
  className = "",
}: CompanyLogoProps) {
  const src = companyLogos[id];

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold font-semibold border border-gold/20 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.28 }}
        aria-hidden="true"
      >
        {name.slice(0, 2)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      quality={100}
      sizes={`${size}px`}
    />
  );
}
