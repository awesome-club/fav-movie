export const MID = "MID";

export function set(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function get(key: string) {
  return localStorage.getItem(key) ?? "";
}