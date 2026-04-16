/**
 * Formats an ISO date string into a localised human-readable date. Used by
 * the blog card (short month) and the article page (long month).
 * Falls back to the raw input when parsing fails.
 */
export function formatDate(
  iso: string,
  locale: string,
  month: "short" | "long" = "short",
): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month,
    year: "numeric",
  }).format(date);
}
