export const formatDate = (dateString: string, locale = "en-US") => {
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
