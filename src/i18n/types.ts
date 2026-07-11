export type Locale = "en" | "fr" | "ar";

export interface Translations {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    about: string;
    ecosystem: string;
    mission: string;
    activities: string;
    academy: string;
    partnership: string;
    partnerWithUs: string;
    skipToContent: string;
    home: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    mobileNav: string;
    scrollDown: string;
  };
  hero: {
    welcome: string;
    brandName: string;
    slogan: string;
    description: string;
    cta: string;
  };
  ecosystem: {
    label: string;
    title: string;
    subtitle: string;
    clickToVisit: string;
  };
  about: {
    label: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    headquarters: string;
    headquartersValue: string;
    ecosystem: string;
    ecosystemValue: string;
    industries: string;
    industriesValue: string;
    investmentFocus: string;
    investmentFocusValue: string;
    mapLabel: string;
    chadLabel: string;
    mapAria: string;
  };
  vision: {
    label: string;
    title: string;
    quote: string;
  };
  mission: {
    label: string;
    title: string;
    items: { title: string; description: string }[];
  };
  activities: {
    label: string;
    title: string;
    subtitle: string;
    items: string[];
  };
  academy: {
    label: string;
    title: string;
    subtitle: string;
    program: string;
    programNote: string;
    paragraph1: string;
    paragraph2: string;
    badge: string;
    focus: { title: string; description: string }[];
  };
  why: {
    label: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  statistics: {
    companies: string;
    sectors: string;
    projects: string;
    futureVision: string;
    africa: string;
  };
  partnership: {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    getInTouch: string;
    investmentInquiry: string;
    emailLabel: string;
    copy: string;
    copied: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    legal: string;
    contact: string;
    location: string;
    country: string;
    rights: string;
    privacy: string;
    terms: string;
    cookies: string;
    phone: string;
  };
  ui: {
    languageSelector: string;
  };
  legal: {
    backHome: string;
    lastUpdated: string;
    privacy: {
      title: string;
      intro: string;
      sections: { title: string; body: string }[];
    };
    terms: {
      title: string;
      intro: string;
      sections: { title: string; body: string }[];
    };
    cookies: {
      title: string;
      intro: string;
      sections: { title: string; body: string }[];
    };
  };
  subsidiaries: {
    id: string;
    name: string;
    description: string;
  }[];
}
