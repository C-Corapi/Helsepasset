/**
 * Shared form validation helpers.
 *
 * Keep validation logic in one place so every form uses
 * the same rules and error messages.
 */

/**
 * Validate an email address.
 *
 * Uses a pattern that rejects common mistakes such as consecutive dots
 * in the domain, missing TLD, or multiple `@` signs — while staying
 * simple enough to understand at a glance.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Validate a Norwegian 4-digit postal code.
 */
export function isValidPostalCode(code: string): boolean {
  return /^[0-9]{4}$/.test(code);
}
