export function getRandomNumber(min: number, max: number): number {
  const preResult = min + Math.random() * (max + 1 - min);
  return Math.floor(preResult);
}
