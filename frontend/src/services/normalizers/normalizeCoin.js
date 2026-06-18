import { normalizeMedia } from "./normalizeMedia";

function asLocalized(value) {
  if (!value) return { en: "", de: "" };
  if (typeof value === "string") return { en: value, de: value };
  return {
    en: value.en || value.de || "",
    de: value.de || value.en || "",
  };
}

export function normalizeSearchResult(raw) {
  return {
    id: raw.id,
    slug: raw.slug,
    title: asLocalized(raw.title),
    country: raw.country || "",
    countryCode: raw.countryCode || "",
    year: Number(raw.year) || 0,
    series: asLocalized(raw.series),
    designer: raw.designer || "",
    mint: raw.mint || "",
    obverseImage: normalizeMedia(raw.obverseImage),
  };
}

export function normalizeCoin(raw) {
  return normalizeSearchResult(raw);
}
