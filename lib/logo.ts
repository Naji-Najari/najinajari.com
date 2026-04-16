const LOGO_SIZE = 64;

/**
 * Returns a cached CDN URL from logo.dev for the given domain. Used to render
 * small (16 to 32 px) brand glyphs next to stack tags, experience items,
 * contact rows, etc. Returns an empty string when the public API key is not
 * configured so callers can skip rendering gracefully.
 */
export function logoUrl(domain: string, size: number = LOGO_SIZE): string {
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY;
  if (!domain || !token) return "";
  return `https://img.logo.dev/${domain}?token=${token}&size=${size}`;
}
