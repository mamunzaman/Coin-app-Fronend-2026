import { normalizeMedia } from "./normalizeMedia";

const SPECS_DEFAULT = {
  diameter: "25.75 mm",
  weight: "8.50 g",
  thickness: "2.20 mm",
  composition: "Bi-metal · CuNi / Ni-brass",
  edge: { en: "Reeded with inscription", de: "Geriffelt mit Inschrift" },
};

function pickRaw(raw, keys) {
  for (const key of keys) {
    const val = raw?.[key];
    if (val !== undefined && val !== null && val !== "") return val;
  }
  return undefined;
}

function asLocalized(value) {
  if (!value) return { en: "", de: "" };
  if (typeof value === "string") return { en: value, de: value };
  return {
    en: value.en || value.de || "",
    de: value.de || value.en || "",
  };
}

function stripHtml(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function splitParagraphs(value) {
  if (!value) return [];
  const text = stripHtml(String(value));
  if (!text) return [];
  return text
    .split(/\n{2,}|(?:\.\s)(?=[A-ZÄÖÜ])/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function normalizeGallery(raw, obverse, reverse) {
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const urls = list.map(normalizeMedia).filter(Boolean);
  if (urls.length) return urls;

  const fallback = [obverse, reverse].filter(Boolean);
  return fallback.length ? fallback : [];
}

function formatSpecMm(value) {
  if (value == null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? `${num} mm` : String(value);
}

function formatSpecG(value) {
  if (value == null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? `${num} g` : String(value);
}

function normalizeSpecifications(raw, { useDefaults = true } = {}) {
  const missing = (fallback) => (useDefaults ? fallback : null);

  const source = raw?.specifications && typeof raw.specifications === "object"
    ? { ...raw.specifications, ...pickSpecificationRoot(raw) }
    : pickSpecificationRoot(raw);

  if (!source || typeof source !== "object") {
    return useDefaults ? { ...SPECS_DEFAULT } : {
      diameter: null,
      weight: null,
      thickness: null,
      composition: null,
      edge: { en: "", de: "" },
      quality: null,
    };
  }

  if (source.diameterMm != null || source.weightG != null || source.material || source.diameter != null) {
    return {
      diameter: formatSpecMm(source.diameterMm ?? source.diameter) ?? missing(SPECS_DEFAULT.diameter),
      weight: formatSpecG(source.weightG ?? source.weight) ?? missing(SPECS_DEFAULT.weight),
      thickness: formatSpecMm(source.thicknessMm ?? source.thickness) ?? missing(SPECS_DEFAULT.thickness),
      composition: source.material || source.composition || missing(SPECS_DEFAULT.composition),
      edge: asLocalized(source.edgeInscription || source.edge || (useDefaults ? SPECS_DEFAULT.edge : "")),
      quality: source.quality || null,
    };
  }

  return {
    diameter: source.diameter || missing(SPECS_DEFAULT.diameter),
    weight: source.weight || missing(SPECS_DEFAULT.weight),
    thickness: source.thickness || missing(SPECS_DEFAULT.thickness),
    composition: source.composition || missing(SPECS_DEFAULT.composition),
    edge: asLocalized(source.edge || (useDefaults ? SPECS_DEFAULT.edge : "")),
    quality: source.quality || null,
  };
}

function pickSpecificationRoot(raw) {
  return {
    diameterMm: pickRaw(raw, ["diameterMm", "diameter_mm", "coin_diameter_mm"]),
    weightG: pickRaw(raw, ["weightG", "weight_g", "coin_weight_g"]),
    thicknessMm: pickRaw(raw, ["thicknessMm", "thickness_mm", "coin_thickness_mm"]),
    material: pickRaw(raw, ["material", "coin_material", "composition"]),
    edgeInscription: pickRaw(raw, ["edgeInscription", "edge_inscription", "coin_edge_inscription"]),
    quality: pickRaw(raw, ["quality", "coin_quality"]),
  };
}

function normalizeMintage(raw) {
  const value = pickRaw(raw, ["mintage", "coin_mintage", "coinMintage"]);
  if (value == null || value === "") return null;
  const num = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(num) && num >= 0 ? num : null;
}

function normalizeHistoricalBackground(raw, fallbacks = []) {
  if (Array.isArray(raw)) {
    const paragraphs = raw.flatMap((entry) => splitParagraphs(entry)).filter(Boolean);
    if (paragraphs.length) return { en: paragraphs, de: paragraphs };
  }

  if (typeof raw === "string") {
    const paragraphs = splitParagraphs(raw);
    if (paragraphs.length) return { en: paragraphs, de: paragraphs };
  }

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const en = Array.isArray(raw.en)
      ? raw.en.flatMap((entry) => splitParagraphs(entry)).filter(Boolean)
      : splitParagraphs(raw.en);
    const de = Array.isArray(raw.de)
      ? raw.de.flatMap((entry) => splitParagraphs(entry)).filter(Boolean)
      : splitParagraphs(raw.de);
    if (en.length || de.length) return { en, de: de.length ? de : en };
  }

  for (const fallback of fallbacks) {
    const paragraphs = splitParagraphs(fallback);
    if (paragraphs.length) return { en: paragraphs, de: paragraphs };
  }

  return { en: [], de: [] };
}

function normalizeMintMarks(raw) {
  const marks = pickRaw(raw, ["mintMarks", "mint_marks", "mintmarks"]);
  if (Array.isArray(marks)) return marks.filter(Boolean).map(String);
  if (typeof marks === "string") return marks.split(/[,·|/]/).map((m) => m.trim()).filter(Boolean);
  return [];
}

function buildCoinBase(raw, { useSpecDefaults = true } = {}) {
  const obverseImage = normalizeMedia(
    pickRaw(raw, ["obverseImage", "obverse_image", "obverse", "featuredImage", "featured_image"])
      ?? raw?.images?.obverse
  );
  const reverseImage = normalizeMedia(
    pickRaw(raw, ["reverseImage", "reverse_image", "reverse"])
      ?? raw?.images?.reverse
  );
  const mintMarks = normalizeMintMarks(raw);
  const shortDescriptionRaw = pickRaw(raw, ["shortDescription", "short_description", "coin_short_description"]);
  const obverseDescriptionRaw = pickRaw(raw, ["obverseDescription", "obverse_description", "coin_obverse_description"]);
  const reverseDescriptionRaw = pickRaw(raw, ["reverseDescription", "reverse_description", "coin_reverse_description"]);
  const collectorNotesRaw = pickRaw(raw, ["collectorNotes", "collector_notes", "coin_collector_notes"]);
  const shortDescription = asLocalized(shortDescriptionRaw);
  const obverseDescription = asLocalized(obverseDescriptionRaw);
  const reverseDescription = asLocalized(reverseDescriptionRaw);
  const collectorNotes = asLocalized(collectorNotesRaw);
  const historicalBackground = normalizeHistoricalBackground(
    pickRaw(raw, ["historicalBackground", "historical_background", "coin_historical_background"]),
    [obverseDescriptionRaw, reverseDescriptionRaw, shortDescriptionRaw]
  );

  const mint = pickRaw(raw, ["mint", "mint_mark", "mintMark"]) || mintMarks[0] || "";

  return {
    id: raw?.id,
    slug: raw?.slug || "",
    title: asLocalized(pickRaw(raw, ["title", "name", "post_title"])),
    country: pickRaw(raw, ["country", "country_name"]) || "",
    countryCode: String(pickRaw(raw, ["countryCode", "country_code", "coin_country_code"]) || "").toUpperCase(),
    year: Number(pickRaw(raw, ["year", "coin_year"])) || 0,
    mint,
    mintMarks,
    series: asLocalized(pickRaw(raw, ["series", "series_name"])),
    seriesSlug: pickRaw(raw, ["seriesSlug", "series_slug"]) || null,
    coinType: asLocalized(pickRaw(raw, ["coinType", "coin_type"])),
    coinCode: pickRaw(raw, ["coinCode", "coin_code"]) || "",
    value: pickRaw(raw, ["value", "denomination", "face_value", "coin_value"]) || "",
    releaseDate: pickRaw(raw, ["releaseDate", "release_date", "released_date", "coin_release_date"]) || "",
    designer: pickRaw(raw, ["designer", "coin_designer"]) || "",
    mintage: normalizeMintage(raw),
    obverseImage,
    reverseImage,
    gallery: normalizeGallery(
      pickRaw(raw, ["gallery", "gallery_images", "images"]),
      obverseImage,
      reverseImage
    ),
    specifications: normalizeSpecifications(raw, { useDefaults: useSpecDefaults }),
    isNew: Boolean(raw?.isNew ?? raw?.is_new),
    isFeatured: Boolean(raw?.isFeatured ?? raw?.is_featured),
    isRare: Boolean(raw?.isRare ?? raw?.is_rare),
    shortDescription: shortDescription.en || shortDescription.de ? shortDescription : null,
    obverseDescription,
    reverseDescription,
    historicalBackground,
    collectorNotes: collectorNotes.en || collectorNotes.de ? collectorNotes : null,
    plateIndex: Number(raw?.id) || undefined,
  };
}

export function normalizeCoinDetail(raw) {
  return buildCoinBase(raw, { useSpecDefaults: false });
}

export function normalizeCoinCard(raw) {
  return buildCoinBase(raw, { useSpecDefaults: true });
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
