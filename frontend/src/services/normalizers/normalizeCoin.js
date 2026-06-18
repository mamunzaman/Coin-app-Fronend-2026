import { normalizeMedia } from "./normalizeMedia";

const SPECS_DEFAULT = {
  diameter: "25.75 mm",
  weight: "8.50 g",
  thickness: "2.20 mm",
  composition: "Bi-metal · CuNi / Ni-brass",
  edge: { en: "Reeded with inscription", de: "Geriffelt mit Inschrift" },
};

function asLocalized(value) {
  if (!value) return { en: "", de: "" };
  if (typeof value === "string") return { en: value, de: value };
  return {
    en: value.en || value.de || "",
    de: value.de || value.en || "",
  };
}

function normalizeGallery(raw, obverse, reverse) {
  if (Array.isArray(raw)) return raw.map(normalizeMedia).filter(Boolean);
  const fallback = [obverse, reverse].filter(Boolean);
  return fallback.length ? fallback : [];
}

function normalizeSpecifications(raw) {
  if (!raw || typeof raw !== "object") return SPECS_DEFAULT;
  return {
    diameter: raw.diameter || SPECS_DEFAULT.diameter,
    weight: raw.weight || SPECS_DEFAULT.weight,
    thickness: raw.thickness || SPECS_DEFAULT.thickness,
    composition: raw.composition || SPECS_DEFAULT.composition,
    edge: asLocalized(raw.edge || SPECS_DEFAULT.edge),
  };
}

function normalizeHistoricalBackground(raw) {
  if (!raw) return { en: [], de: [] };
  if (Array.isArray(raw)) return { en: raw, de: raw };
  return {
    en: Array.isArray(raw.en) ? raw.en : raw.en ? [raw.en] : [],
    de: Array.isArray(raw.de) ? raw.de : raw.de ? [raw.de] : [],
  };
}

export function normalizeCoinCard(raw) {
  const obverseImage = normalizeMedia(raw?.obverseImage);
  const reverseImage = normalizeMedia(raw?.reverseImage);

  return {
    id: raw?.id,
    slug: raw?.slug || "",
    title: asLocalized(raw?.title),
    country: raw?.country || "",
    countryCode: raw?.countryCode || "",
    year: Number(raw?.year) || 0,
    mint: raw?.mint || "",
    mintMarks: Array.isArray(raw?.mintMarks) ? raw.mintMarks : [],
    series: asLocalized(raw?.series),
    seriesSlug: raw?.seriesSlug || null,
    coinType: asLocalized(raw?.coinType),
    value: raw?.value || "",
    releaseDate: raw?.releaseDate || "",
    designer: raw?.designer || "",
    mintage: Number(raw?.mintage) || 0,
    obverseImage,
    reverseImage,
    gallery: normalizeGallery(raw?.gallery, obverseImage, reverseImage),
    specifications: normalizeSpecifications(raw?.specifications),
    isNew: Boolean(raw?.isNew),
    isFeatured: Boolean(raw?.isFeatured),
    isRare: Boolean(raw?.isRare),
    shortDescription: asLocalized(raw?.shortDescription),
    historicalBackground: normalizeHistoricalBackground(raw?.historicalBackground),
  };
}

export function normalizeSearchResult(raw) {
  const card = normalizeCoinCard(raw);
  return {
    id: card.id,
    slug: card.slug,
    title: card.title,
    country: card.country,
    countryCode: card.countryCode,
    year: card.year,
    series: card.series,
    designer: card.designer,
    mint: card.mint,
    obverseImage: card.obverseImage,
  };
}

export function normalizeCoin(raw) {
  return normalizeCoinCard(raw);
}
