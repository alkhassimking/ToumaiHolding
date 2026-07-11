const SITE_URL = "https://www.toumaiholding.com";

export const SITE_TITLE = "توماي القابضة | Toumai Holding";
export const SITE_TITLE_BILINGUAL = "توماي القابضة | Toumai Holding";
export const SITE_DESCRIPTION =
  "Toumai Holding is a diversified investment and technology group headquartered in Chad, building innovative companies in fintech, logistics, telecommunications, AI, digital infrastructure, and sustainable business development across Africa.";
export const OG_DESCRIPTION =
  "Innovation • Growth • Future | ابتكار • نمو • مستقبل";
export const ASSET_VERSION = "20260711";

const LOGO_URL = `${SITE_URL}/logo.png?v=${ASSET_VERSION}`;
const LOGO_FALLBACK = `${SITE_URL}/logos/toumai-holding-logo.png?v=${ASSET_VERSION}`;
const OG_IMAGE = `${SITE_URL}/og-image.png?v=${ASSET_VERSION}`;
const FAVICON_URL = `${SITE_URL}/favicon.ico?v=${ASSET_VERSION}`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Toumai Holding",
  legalName: "Toumai Holding",
  alternateName: ["Toumai Holding", "توماي القابضة", "Toumai", "Toumai Chad"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    caption: "Toumai Holding logo",
    width: 512,
    height: 512,
    encodingFormat: "image/png",
  },
  image: [LOGO_URL, LOGO_FALLBACK, OG_IMAGE],
  description: SITE_DESCRIPTION,
  slogan: "Building Africa Through Innovation",
  foundingLocation: {
    "@type": "Place",
    name: "N'Djamena, Republic of Chad",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "N'Djamena",
    addressCountry: "TD",
  },
  areaServed: {
    "@type": "Continent",
    name: "Africa",
  },
  industry: "Technology & Investment Holding Company",
  email: "contact@toumaiholding.com",
  telephone: ["+23590907657", "+23560907657"],
  sameAs: [
    "https://www.linkedin.com/company/toumai-holding/",
    "https://twitter.com/toumaiholding",
    "https://www.facebook.com/share/1CjbbdRL95/?mibextid=wwXIfr",
    "https://instagram.com/toumaiholding",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@toumaiholding.com",
      telephone: "+23590907657",
      availableLanguage: ["English", "French", "Arabic"],
      areaServed: "Africa",
    },
    {
      "@type": "ContactPoint",
      contactType: "partnerships",
      email: "Partnership@toumaiholding.com",
      availableLanguage: ["English", "French", "Arabic"],
      areaServed: "Africa",
    },
  ],
  knowsAbout: [
    "Fintech",
    "Digital Infrastructure",
    "Artificial Intelligence",
    "Logistics",
    "Telecommunications",
    "E-commerce",
    "Investment Holding",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_TITLE_BILINGUAL,
  alternateName: ["Toumai Holding", "توماي القابضة", "Toumai"],
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["en", "fr", "ar"],
  image: LOGO_URL,
};

export const logoSchema = {
  "@type": "ImageObject",
  "@id": `${SITE_URL}/#logo`,
  url: LOGO_URL,
  contentUrl: LOGO_URL,
  caption: "Toumai Holding | توماي القابضة",
  name: "Toumai Holding Logo",
  width: 512,
  height: 512,
  encodingFormat: "image/png",
  representativeOfPage: true,
};

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

export const siteNavigationSchema = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#navigation`,
  name: "Main Navigation",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "About", url: `${SITE_URL}/#about` },
    { "@type": "SiteNavigationElement", position: 2, name: "Ecosystem", url: `${SITE_URL}/#ecosystem` },
    { "@type": "SiteNavigationElement", position: 3, name: "Mission", url: `${SITE_URL}/#mission` },
    { "@type": "SiteNavigationElement", position: 4, name: "Activities", url: `${SITE_URL}/#activities` },
    { "@type": "SiteNavigationElement", position: 5, name: "Academy", url: `${SITE_URL}/#academy` },
    { "@type": "SiteNavigationElement", position: 6, name: "Values", url: `${SITE_URL}/#why` },
    { "@type": "SiteNavigationElement", position: 7, name: "Partnership", url: `${SITE_URL}/#partnership` },
  ],
};

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    logoSchema,
    siteNavigationSchema,
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
  ],
};
