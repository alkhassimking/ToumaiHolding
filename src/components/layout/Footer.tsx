"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useTranslation } from "@/contexts/LanguageProvider";
import {
  contactPhones,
  contactEmail,
  partnershipEmail,
  socialLinks,
} from "@/data/assets";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";

const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
};

export default function Footer() {
  const { t, locale } = useTranslation();
  const year = new Date().getFullYear();
  const brand = locale === "ar" ? "توماي القابضة" : "Toumai Holding";

  const quickLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.ecosystem, href: "#ecosystem" },
    { label: t.nav.mission, href: "#mission" },
    { label: t.nav.activities, href: "#activities" },
    { label: t.nav.academy, href: "#academy" },
    { label: t.why.title, href: "#why" },
    { label: t.nav.partnership, href: "#partnership" },
  ];

  const legalLinks = [
    { label: t.footer.privacy, href: "/privacy" },
    { label: t.footer.terms, href: "/terms" },
    { label: t.footer.cookies, href: "/cookies" },
  ];

  return (
    <footer className="bg-black-light border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <Logo size="sm" />
            <p className="mt-6 text-silver text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
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
          </div>

          <div>
            <h3 className="text-gold text-sm font-medium tracking-widest uppercase mb-5">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-silver text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold text-sm font-medium tracking-widest uppercase mb-5">
              {t.footer.legal}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch
                    className="text-silver text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold text-sm font-medium tracking-widest uppercase mb-5">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-silver text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>
                  {t.footer.location}
                  <br />
                  {t.footer.country}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${partnershipEmail}`}
                  className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  {partnershipEmail}
                </a>
              </li>
              {contactPhones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors"
                    dir="ltr"
                  >
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://www.toumaiholding.com"
                  className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors"
                >
                  <Globe className="w-4 h-4 text-gold shrink-0" />
                  www.toumaiholding.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="line-gold w-full mt-10 sm:mt-12 mb-6 sm:mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-silver text-sm text-center md:text-start">
          <p>
            &copy; {year} {brand}. {t.footer.rights}
          </p>
          <p className="text-xs tracking-wide">{t.footer.country}</p>
        </div>
      </div>
    </footer>
  );
}
