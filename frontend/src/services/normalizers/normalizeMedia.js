export function normalizeMedia(raw) {
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  return raw.url || raw.src || "";
}
