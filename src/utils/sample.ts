/**
 * Samples a random element from an array
 */
export default function sample(array: any[]): any {
  const idx = Math.floor(Math.random() * array.length);
  return array[idx];
}
