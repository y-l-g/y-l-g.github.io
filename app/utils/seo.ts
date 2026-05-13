export const siteUrl = "https://y-l.fr";
export const siteName = "Youenn Le Gouedec";
export const defaultSeoImage = `${siteUrl}/profile.png`;

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
