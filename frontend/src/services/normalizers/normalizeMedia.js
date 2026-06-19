export function normalizeMedia(raw) {
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  if (typeof raw === "number") return "";

  return (
    raw.url
    || raw.src
    || raw.full_url
    || raw.source_url
    || raw.guid?.rendered
    || raw.sizes?.full?.url
    || raw.media_details?.sizes?.full?.source_url
    || ""
  );
}
