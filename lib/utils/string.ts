// Dash to space utility function
/**
 * Converts dashes to spaces and optionally capitalizes each word
 * @param str - The input string with dashes
 * @param capitalize - Whether to capitalize each word (default: false)
 * @returns The formatted string
 *
 * @example
 * formatDashString("espresso-machines") // "espresso machines"
 * formatDashString("espresso-machines", true) // "Espresso Machines"
 */
export function formatDashString(str: string, capitalize: boolean = false): string {
  const withSpaces = str.replace(/-/g, " ");

  if (capitalize) {
    return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return withSpaces;
}
