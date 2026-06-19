function stripHtml(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function getText(value, lang = "en") {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((v) => getText(v, lang)).filter(Boolean).join(" ");
  if (typeof value === "object") return value[lang] || value.en || value.de || "";
  return "";
}

export function getParagraphs(value, lang = "en") {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.flatMap((entry) => getParagraphs(entry, lang)).filter(Boolean);
  }

  const text = stripHtml(getText(value, lang));
  if (!text) return [];

  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function getImageUrl(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value.url || value.src || value.full_url || value.source_url || "";
  }
  return "";
}

export function hasContent(value, lang = "en") {
  if (value == null) return false;
  if (typeof value === "string" || typeof value === "number") return String(value).trim().length > 0;
  if (Array.isArray(value)) return value.some((entry) => hasContent(entry, lang));
  if (typeof value === "object") {
    if (value.url || value.src) return true;
    return hasContent(getText(value, lang), lang);
  }
  return false;
}
