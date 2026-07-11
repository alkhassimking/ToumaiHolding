"use client";

import { socialLinks } from "@/data/assets";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import OfficialXIcon from "@/components/ui/OfficialXIcon";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Linkedin,
  X: OfficialXIcon,
  Facebook,
  Instagram,
};

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 flex-wrap ${className}`}>
      {socialLinks.map((social) => {
        const Icon = iconMap[social.icon];
        if (!Icon) return null;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-silver hover:text-gold hover:border-gold/40 transition-all duration-300"
            aria-label={social.label}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
