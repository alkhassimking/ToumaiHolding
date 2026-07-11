"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useTranslation } from "@/contexts/LanguageProvider";

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.ecosystem, href: "#ecosystem" },
    { label: t.nav.mission, href: "#mission" },
    { label: t.nav.activities, href: "#activities" },
    { label: t.nav.academy, href: "#academy" },
    { label: t.why.label, href: "#why" },
    { label: t.nav.partnership, href: "#partnership" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 border-b border-gold/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
        <a href="#" aria-label={t.nav.home} className="shrink-0 min-w-0">
          <Logo size="sm" />
        </a>

        <nav
            className="hidden xl:flex items-center gap-0.5"
          aria-label={t.nav.mainNav}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-2 text-[13px] text-silver/90 hover:text-gold transition-colors duration-300 tracking-wide group"
            >
              {link.label}
              <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <LanguageSelector />
          <a
            href="#partnership"
            className="btn-outline-gold inline-flex items-center px-5 py-2 text-[13px] font-medium rounded-full whitespace-nowrap"
          >
            {t.nav.partnerWithUs}
          </a>
        </div>

        <div className="xl:hidden flex items-center gap-3">
          <LanguageSelector />
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-gold transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="xl:hidden glass absolute top-full left-0 right-0 border-t border-gold/10"
          >
            <nav
              className="flex flex-col p-6 gap-1"
              aria-label={t.nav.mobileNav}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base text-silver hover:text-gold transition-colors py-3 border-b border-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#partnership"
                className="mt-5 btn-outline-gold inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.partnerWithUs}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
