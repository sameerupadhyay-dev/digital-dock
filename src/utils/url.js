/**
 * URL Utilities for Digital Dock
 * Provides safe URL parsing and domain extraction without throwing runtime errors.
 */

/**
 * Validates whether a given string is a valid HTTP or HTTPS URL.
 * Rejects javascript:, data:, file:, and malformed inputs.
 * @param {string} urlString
 * @returns {boolean}
 */
export function isValidWebUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  const trimmed = urlString.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Safely extracts hostname for display. Never throws.
 * @param {string} urlString
 * @returns {string} Hostname or fallback placeholder 'source-link'
 */
export function extractHostname(urlString) {
  if (!urlString || typeof urlString !== 'string') return 'source-link';
  try {
    const parsed = new URL(urlString.trim());
    return parsed.hostname.replace(/^www\./, '') || 'source-link';
  } catch {
    return 'source-link';
  }
}

/**
 * Normalizes URL string to standard trimmed format.
 * @param {string} urlString
 * @returns {string}
 */
export function normalizeUrl(urlString) {
  if (!urlString) return '';
  return urlString.trim();
}
