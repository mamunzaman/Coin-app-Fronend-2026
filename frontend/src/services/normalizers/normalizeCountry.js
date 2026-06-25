import { COUNTRIES as MOCK_COUNTRIES } from "@/data/coinData";
import { normalizeMedia } from "./normalizeMedia";

function pickRaw(raw, keys) {
  for (const key of keys) {
    const val = raw?.[key];
    if (val !== undefined && val !== null && val !== "") return val;
  }
  return undefined;
}

function findMockCountry(codeOrSlug) {
  const upper = String(codeOrSlug || "").toUpperCase();
  const lower = String(codeOrSlug || "").toLowerCase();
  return MOCK_COUNTRIES.find(
    (c) => c.code === upper || c.code.toLowerCase() === lower,
  ) || null;
}

function resolveCountryCode(wpCountry) {
  const direct = pickRaw(wpCountry, ["code", "countryCode", "country_code"]);
  if (direct) return String(direct).toUpperCase();

  const slug = pickRaw(wpCountry, ["slug", "country"]);
  if (typeof slug === "string" && slug.length <= 3) return slug.toUpperCase();

  const mock = findMockCountry(slug || wpCountry?.code);
  return mock?.code || "";
}

function asLocalizedName(name, mock) {
  if (name) {
    if (typeof name === "string") return { en: name, de: name };
    if (typeof name === "object" && !Array.isArray(name)) {
      const localized = {
        en: name.en || name.rendered || name.de || "",
        de: name.de || name.rendered || name.en || "",
      };
      if (localized.en || localized.de) return localized;
    }
  }
  if (mock?.name) return mock.name;
  return { en: "", de: "" };
}

function asLocalizedText(value, mockValue) {
  if (value) {
    if (typeof value === "string") return { en: value, de: value };
    if (typeof value === "object" && !Array.isArray(value)) {
      const localized = {
        en: value.en || value.rendered || value.de || "",
        de: value.de || value.rendered || value.en || "",
      };
      if (localized.en || localized.de) return localized;
    }
  }
  return mockValue || { en: "", de: "" };
}

export function normalizeCountryListItem(wpCountry) {
  const code = resolveCountryCode(wpCountry);
  const mock = findMockCountry(code || pickRaw(wpCountry, ["slug", "country"]));
  const coinCount = Number(
    pickRaw(wpCountry, ["coinCount", "coin_count", "coins"]) ?? mock?.coins ?? 0,
  );
  const featuredCoin = wpCountry?.featuredCoin ?? wpCountry?.featured_coin ?? null;
  const featuredImage = featuredCoin?.obverseImage
    || featuredCoin?.obverse_image
    || featuredCoin?.image
    || mock?.featured
    || "";

  const nameRaw = pickRaw(wpCountry, ["name", "title", "country"]);
  const slugRaw = pickRaw(wpCountry, ["slug", "country"]);
  const slug = typeof slugRaw === "string"
    ? slugRaw.toLowerCase()
    : (code || mock?.code || "").toLowerCase();

  return {
    code: code || mock?.code || "",
    slug,
    name: asLocalizedName(nameRaw, mock),
    flag: mock?.flag || "",
    country_flag: wpCountry?.country_flag || wpCountry?.flag_image || null,
    countryFlagUrl: normalizeMedia(
      wpCountry?.country_flag ?? wpCountry?.flag_image ?? wpCountry?.flag,
    ),
    coins: coinCount,
    coinCount,
    since: wpCountry?.since ?? mock?.since ?? 2002,
    capital: pickRaw(wpCountry, ["capital", "capital_city"]) || mock?.capital || "",
    featured: featuredImage,
    blurb: asLocalizedText(pickRaw(wpCountry, ["blurb", "description", "summary"]), mock?.blurb),
    latestYear: wpCountry?.latestYear ?? wpCountry?.latest_year ?? null,
    featuredCoin,
  };
}

export function normalizeCountryDetail(wpPayload) {
  const wpCountry = wpPayload?.country || {};
  const country = normalizeCountryListItem({
    ...wpCountry,
    coinCount: pickRaw(wpCountry, ["coinCount", "coin_count", "coins"]),
  });

  return {
    country: {
      ...country,
      yearStart: wpCountry.yearStart ?? wpCountry.year_start ?? null,
      yearEnd: wpCountry.yearEnd ?? wpCountry.year_end ?? null,
    },
    stats: wpPayload?.stats || {},
    timeline: Array.isArray(wpPayload?.timeline) ? wpPayload.timeline : [],
  };
}

export function normalizeCountry(raw) {
  return normalizeCountryListItem(raw);
}

export function extractCountryRaw(raw) {
  if (!raw || typeof raw !== "object") return null;

  const nested = raw.country ?? raw.data?.country ?? null;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) return nested;

  if (pickRaw(raw, ["code", "countryCode", "country_code", "slug", "name", "title"])) {
    return raw;
  }

  return null;
}

export function extractCountryCoins(raw) {
  if (!raw || typeof raw !== "object") return [];
  const nested = raw.country && typeof raw.country === "object" ? raw.country : null;
  const source = raw.coins ?? raw.items ?? nested?.coins ?? [];
  return Array.isArray(source) ? source : [];
}

export function isValidCountry(country) {
  if (!country || typeof country !== "object") return false;
  return Boolean(
    country.code
    || country.slug
    || country.name?.en
    || country.name?.de
    || typeof country.name === "string",
  );
}
