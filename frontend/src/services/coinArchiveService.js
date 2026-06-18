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

import { wpFetch } from "./wpClient";

const STATS_PATH = "/wp-json/coinarchive/v1/stats";
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
