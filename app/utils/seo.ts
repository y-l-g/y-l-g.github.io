export const siteUrl = "https://y-l.fr";
export const siteName = "Youenn Le Gouedec";
export const portrait = `${siteUrl}/portrait.jpg`;

export const usePageSeo = (page: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile";
  jsonLd?: Record<string, unknown>;
}) => {
  const url = new URL(page.path, siteUrl).toString();

  useSeoMeta({
    title: page.title,
    description: page.description,
    ogTitle: page.title,
    ogDescription: page.description,
    ogType: page.type ?? "website",
    ogUrl: url,
    ogSiteName: siteName,
    ogImage: portrait,
    ogImageWidth: 900,
    ogImageHeight: 900,
    ogImageAlt: `Painted portrait of ${siteName}`,
    twitterCard: "summary",
  });

  useHead({
    link: [{ rel: "canonical", href: url }],
    meta: [{ name: "author", content: siteName }],
    script: page.jsonLd
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              ...page.jsonLd,
            }),
          },
        ]
      : [],
  });
};
