export const DEFAULT_LOCALE = "fr";

export const getLocalePrefix = (locale: string) =>
  locale === DEFAULT_LOCALE ? "" : `/${locale}`;

export const getLocalizedContentPath = (path: string, locale: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const prefix = getLocalePrefix(locale);

  if (!prefix) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? prefix : `${prefix}${normalizedPath}`;
};

export const getLocalizedBlogPattern = (locale: string) =>
  `${getLocalePrefix(locale)}/blog/%`;

export const getDateLocale = (locale: string) =>
  locale === DEFAULT_LOCALE ? "fr-FR" : "en-US";
