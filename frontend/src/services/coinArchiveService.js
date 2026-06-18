export {
  COINS,
  COUNTRIES,
  MINTS,
  SERIES_LIST,
  TIMELINE,
  RECENT_COINS,
  HERO_COIN,
  FEATURE_COIN,
  findCoinBySlug,
  findCountry,
  findSeries,
  coinsByCountry,
  coinsBySeries,
  relatedCoins,
  allYears,
  searchCoins,
} from "@/data/coinData";

import { searchCoins } from "@/data/coinData";
import { wpFetch } from "./wpClient";
import { normalizeSearchResult } from "./normalizers/normalizeCoin";

const STATS_PATH = "/wp-json/coinarchive/v1/stats";
const SEARCH_PATH = "/wp-json/coinarchive/v1/search";
const FIRST_ISSUE_YEAR = 2004;

export const MOCK_STATS = {
  coins: 650,
  countries: 20,
  years: 20,
  latestYear: 2024,
  source: "mock",
};

function yearsFromLatestYear(latestYear) {
  return Math.max(0, latestYear - FIRST_ISSUE_YEAR);
}

function normalizeStats(raw) {
  const latestYear = Number(raw?.latestYear) || MOCK_STATS.latestYear;
  return {
    coins: Number(raw?.coins) || MOCK_STATS.coins,
    countries: Number(raw?.countries) || MOCK_STATS.countries,
    years: yearsFromLatestYear(latestYear),
    latestYear,
    series: Number(raw?.series) || undefined,
    mints: Number(raw?.mints) || undefined,
    featuredCoins: Number(raw?.featuredCoins) || undefined,
    updatedAt: raw?.updatedAt || undefined,
    source: "api",
  };
}

export async function getStats() {
  try {
    const raw = await wpFetch(STATS_PATH);
    return normalizeStats(raw);
  } catch {
    return { ...MOCK_STATS };
  }
}

export async function searchArchive(query, options = {}) {
  const q = (query || "").trim();
  if (!q) return [];

  try {
    const params = new URLSearchParams();
    params.set("q", q);
    params.set("per_page", String(options.per_page ?? 12));
    if (options.country) params.set("country", options.country);
    if (options.year) params.set("year", String(options.year));
    if (options.series) params.set("series", options.series);
    if (options.page) params.set("page", String(options.page));

    const raw = await wpFetch(`${SEARCH_PATH}?${params}`);
    const items = Array.isArray(raw?.results) ? raw.results : [];
    return items.map(normalizeSearchResult);
  } catch {
    return searchCoins(q);
  }
}
