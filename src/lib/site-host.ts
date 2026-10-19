/** Canonical published address for the SYNCLAB website. */
export const CANONICAL_HOST = "synclab-sound-smith.lovable.app";

/**
 * Addresses this site was published under before the current name.
 * Visitors arriving from an old bookmark or link must be forwarded to
 * CANONICAL_HOST so the retired name never stays in the address bar.
 */
export const LEGACY_HOSTS = ["synclab-vocal-forge.lovable.app"] as const;

/**
 * Returns the URL to forward a visitor to when they arrived on a retired
 * address, or null when the current address is already the right one.
 * The path, query string and in-page section are preserved.
 */
export function legacySiteRedirect(
  hostname: string,
  pathname = "/",
  search = "",
  hash = ""
): string | null {
  if (!LEGACY_HOSTS.includes(hostname as (typeof LEGACY_HOSTS)[number])) return null;
  return `https://${CANONICAL_HOST}${pathname}${search}${hash}`;
}
