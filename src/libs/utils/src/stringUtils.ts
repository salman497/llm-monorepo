/**
 * String utility functions
 */

/**
 * Reverses a string
 * @param str - The string to reverse
 * @returns The reversed string
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Checks if a string is a palindrome
 * @param str - The string to check
 * @returns True if the string is a palindrome, false otherwise
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverseString(cleaned);
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
} 