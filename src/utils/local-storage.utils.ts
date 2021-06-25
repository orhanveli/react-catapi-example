export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }
  return null;
}

export function setItem(key: string, val: unknown) {
  if (typeof val === 'string') {
    localStorage.setItem(key, val);
  }
  localStorage.setItem(key, JSON.stringify(val));
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
