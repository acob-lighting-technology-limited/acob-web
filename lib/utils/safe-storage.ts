// localStorage throws in some private modes and when storage is blocked or
// full. These wrappers treat any failure as "nothing stored" so a UI nicety
// (a dismissed banner, a message counter) never takes the page down with it.

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Not persisted; the in-memory state still applies for this visit.
  }
}

export function removeStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}
