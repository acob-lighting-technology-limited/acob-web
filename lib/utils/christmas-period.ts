/**
 * Checks if the current date is within the Christmas period
 * Christmas period: December 1st to January 10th
 */
export function isChristmasPeriod(): boolean {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() returns 0-11, so +1 for 1-12
  const day = now.getDate();

  // December 1st to December 31st
  if (month === 12 && day >= 1) {
    return true;
  }

  // January 1st to January 10th
  if (month === 1 && day <= 10) {
    return true;
  }

  return false;
}
