import { DEFAULT_LOCALE } from "~/composables/useLocaleContent";

export const siteUrl = "https://y-l.fr";
export const siteName = "Youenn Le Gouedec";
export const defaultSeoImage = `${siteUrl}/profile.png`;
export const defaultSeoImageWidth = 1024;
export const defaultSeoImageHeight = 1024;

export const personId = `${siteUrl}/#youenn-le-gouedec`;
export const websiteId = `${siteUrl}/#website`;

export const languageFromLocale = (locale: string) =>
  locale === DEFAULT_LOCALE ? "fr-FR" : "en-US";

export const withSiteUrl = (path = "/") => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
};

export const jsonLdScript = (value: unknown) => ({
  type: "application/ld+json",
  innerHTML: JSON.stringify(value),
});

type BreadcrumbItem = {
  name: string;
  path: string;
};

export const personJsonLd = () => ({
  "@type": "Person",
  "@id": personId,
  name: siteName,
  url: siteUrl,
  image: defaultSeoImage,
  jobTitle: "Développeur freelance Laravel, Vue et Nuxt",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Bretagne",
    addressCountry: "FR",
  },
  sameAs: [
    "https://github.com/y-l-g",
    "https://x.com/_y_l_g_",
    "https://www.malt.fr/profile/youennlegouedec",
  ],
  knowsAbout: [
    "Laravel",
    "Vue",
    "Nuxt",
    "SaaS",
    "GitOps",
    "k3s",
    "PostgreSQL",
    "Docker",
  ],
});

export const breadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: withSiteUrl(item.path),
  })),
});
