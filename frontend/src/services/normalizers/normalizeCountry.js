import { COUNTRIES as MOCK_COUNTRIES } from "@/data/coinData";

function findMockCountry(code) {
  const upper = (code || "").toUpperCase();
  return MOCK_COUNTRIES.find((c) => c.code === upper) || null;
}

function asLocalizedName(name, mock) {
  if (mock?.name) return mock.name;
  if (!name) return { en: "", de: "" };
  if (typeof name === "string") return { en: name, de: name };
  return {
    en: name.en || name.de || "",
    de: name.de || name.en || "",
  };
}

export function normalizeCountryListItem(wpCountry) {
  const mock = findMockCountry(wpCountry?.code);
  const coinCount = Number(wpCountry?.coinCount ?? mock?.coins ?? 0);
  const featuredImage = wpCountry?.featuredCoin?.obverseImage || mock?.featured || "";

  return {
    code: (wpCountry?.code || mock?.code || "").toUpperCase(),
    slug: wpCountry?.slug || mock?.code?.toLowerCase() || "",
    name: asLocalizedName(wpCountry?.name, mock),
    flag: mock?.flag || "",
    coins: coinCount,
    coinCount,
    since: mock?.since ?? 2002,
    capital: mock?.capital || "",
    featured: featuredImage,
    blurb: mock?.blurb || { en: "", de: "" },
    latestYear: wpCountry?.latestYear ?? null,
    featuredCoin: wpCountry?.featuredCoin || null,
  };
}

export function normalizeCountryDetail(wpPayload) {
  const wpCountry = wpPayload?.country || {};
  const mock = findMockCountry(wpCountry.code);
  const country = normalizeCountryListItem({
    ...wpCountry,
    coinCount: wpCountry.coinCount,
  });

  return {
    country: {
      ...country,
      yearStart: wpCountry.yearStart ?? null,
      yearEnd: wpCountry.yearEnd ?? null,
    },
    stats: wpPayload?.stats || {},
    timeline: Array.isArray(wpPayload?.timeline) ? wpPayload.timeline : [],
  };
}

export function normalizeCountry(raw) {
  return normalizeCountryListItem(raw);
}
