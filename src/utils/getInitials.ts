/**
 * Gets initials from a name (3 letters at most)
 * e.g. Brian Albert Thomsom -> BAT
 * @param fullName - Full name
 * @returns initials - Initials of full name
 */
export default function getInitials(fullName: string): string {
  const initials = fullName
    .split(" ")
    .slice(0, 3)
    .map((word) => word.charAt(0).toLocaleUpperCase())
    .join("");
  return initials;
}
