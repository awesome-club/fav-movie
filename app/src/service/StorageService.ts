export function setMemberId(value: string) {
  localStorage.setItem("MID", value);
}

export function getMemberId() {
  return localStorage.getItem("MID") ?? "";
}