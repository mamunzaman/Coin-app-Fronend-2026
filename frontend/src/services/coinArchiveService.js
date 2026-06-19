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

import { searchCoins, COINS, COUNTRIES, MINTS, SERIES_LIST, allYears, findCoinBySlug, findCountry, coinsByCountry, relatedCoins as mockRelatedCoins } from "@/data/coinData";
import { wpFetch } from "./wpClient";
import { normalizeSearchResult, normalizeCoinCard, normalizeCoinDetail } from "./normalizers/normalizeCoin";
import { normalizeCountryListItem, normalizeCountryDetail } from "./normalizers/normalizeCountry";

const STATS_PATH = "/wp-json/coinarchive/v1/stats";
const SEARCH_PATH = "/wp-json/coinarchive/v1/search";
const COINS_PATH = "/wp-json/coinarchive/v1/coins";
const COUNTRIES_PATH = "/wp-json/coinarchive/v1/countries";
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

function asLocalizedFacetName(value) {
  if (!value) return { en: "", de: "" };
  if (typeof value === "string") return { en: value, de: value };
  return { en: value.en || value.de || "", de: value.de || value.en || "" };
}

function normalizeFacets(raw) {
  if (!raw) return getMockFacets();
  return {
    countries: (raw.countries || []).map((c) => ({
      code: c.code,
      name: asLocalizedFacetName(c.name),
      count: Number(c.count) || 0,
    })),
    years: (raw.years || []).map((y) => ({
      year: Number(y.year),
      count: Number(y.count) || 0,
    })),
    series: (raw.series || []).map((s) => ({
      slug: s.slug,
      name: asLocalizedFacetName(s.name),
      count: Number(s.count) || 0,
    })),
    mints: (raw.mints || []).map((m) => ({
      letter: m.letter,
      city: m.city || MINTS.find((x) => x.letter === m.letter)?.city || "",
      count: Number(m.count) || 0,
    })),
  };
}

function normalizePagination(raw, fallback = {}) {
  const page = Number(raw?.page) || fallback.page || 1;
  const perPage = Number(raw?.perPage) || fallback.perPage || 12;
  const total = Number(raw?.total) ?? fallback.total ?? 0;
  const totalPages = Number(raw?.totalPages) || fallback.totalPages || Math.max(1, Math.ceil(total / perPage));
  return { page, perPage, total, totalPages };
}

export function getMockFacets() {
  return {
    countries: COUNTRIES.map((c) => ({ code: c.code, name: c.name, count: c.coins })),
    years: allYears().map((year) => ({ year, count: 0 })),
    series: SERIES_LIST.map((s) => ({ slug: s.slug, name: s.name, count: s.count })),
    mints: MINTS.map((m) => ({ letter: m.letter, city: m.city, count: 0 })),
  };
}

function filterMockCoins({ q = "", country = "all", year = "all", mint = "all", series = "all", sort = "newest" }) {
  const query = q.trim().toLowerCase();
  let list = COINS.filter((c) => {
    if (country !== "all" && c.countryCode !== country) return false;
    if (year !== "all" && String(c.year) !== String(year)) return false;
    if (mint !== "all" && c.mint !== mint) return false;
    if (series !== "all" && c.seriesSlug !== series) return false;
    if (query) {
      const hay = [
        c.title.en, c.title.de, c.designer, c.countryCode, c.country,
        c.series.en, c.series.de, String(c.year),
      ].join(" ").toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  if (sort === "newest") list.sort((a, b) => b.year - a.year);
  if (sort === "oldest") list.sort((a, b) => a.year - b.year);
  if (sort === "country") list.sort((a, b) => a.countryCode.localeCompare(b.countryCode) || b.year - a.year);
  if (sort === "rarity") list.sort((a, b) => (b.isRare ? 1 : 0) - (a.isRare ? 1 : 0) || a.mintage - b.mintage);

  return list;
}

function getMockCoinsList(params = {}) {
  const {
    q = "",
    country = "all",
    year = "all",
    mint = "all",
    series = "all",
    sort = "newest",
    page = 1,
    per_page = 12,
  } = params;

  const filtered = filterMockCoins({ q, country, year, mint, series, sort });
  const start = (page - 1) * per_page;
  const items = filtered.slice(start, start + per_page);

  return {
    items,
    facets: getMockFacets(),
    pagination: normalizePagination(null, {
      page,
      perPage: per_page,
      total: filtered.length,
      totalPages: Math.max(1, Math.ceil(filtered.length / per_page)),
    }),
    source: "mock",
  };
}

export async function getCoinsList(params = {}) {
  const {
    q = "",
    country = "all",
    year = "all",
    mint = "all",
    series = "all",
    sort = "newest",
    page = 1,
    per_page = 12,
  } = params;

  try {
    const urlParams = new URLSearchParams();
    const query = q.trim();
    if (query) urlParams.set("q", query);
    if (country !== "all") urlParams.set("country", country);
    if (year !== "all") urlParams.set("year", String(year));
    if (mint !== "all") urlParams.set("mint", mint);
    if (series !== "all") urlParams.set("series", series);
    if (sort) urlParams.set("sort", sort);
    urlParams.set("page", String(page));
    urlParams.set("per_page", String(per_page));

    const raw = await wpFetch(`${COINS_PATH}?${urlParams}`);
    const items = Array.isArray(raw?.items) ? raw.items.map(normalizeCoinCard) : [];

    return {
      items,
      facets: normalizeFacets(raw?.facets),
      pagination: normalizePagination(raw?.pagination, { page, perPage: per_page, total: items.length }),
      source: "wp",
    };
  } catch {
    return getMockCoinsList(params);
  }
}

function getMockCoinDetail(slug) {
  const coin = findCoinBySlug(slug);
  if (!coin) return { coin: null, relatedCoins: [], source: "mock" };
  return {
    coin,
    relatedCoins: mockRelatedCoins(slug, 3),
    source: "mock",
  };
}

export async function getCoinDetail(slug) {
  if (!slug) return getMockCoinDetail(slug);

  try {
    const raw = await wpFetch(`${COINS_PATH}/${encodeURIComponent(slug)}`);
    if (!raw?.coin) throw new Error("Missing coin");

    return {
      coin: normalizeCoinDetail(raw.coin),
      relatedCoins: Array.isArray(raw.relatedCoins) ? raw.relatedCoins.map(normalizeCoinCard) : [],
      source: "wp",
    };
  } catch {
    return getMockCoinDetail(slug);
  }
}

function getMockCountriesList() {
  const items = COUNTRIES.map((c) => {
    const archiveCount = COINS.filter((x) => x.countryCode === c.code).length;
    return normalizeCountryListItem({
      code: c.code,
      slug: c.code.toLowerCase(),
      name: c.name.en,
      coinCount: archiveCount,
      latestYear: archiveCount
        ? Math.max(...COINS.filter((x) => x.countryCode === c.code).map((x) => x.year))
        : null,
    });
  }).sort((a, b) => b.coins - a.coins);

  return { items, source: "mock" };
}

export async function getCountriesList() {
  try {
    const raw = await wpFetch(COUNTRIES_PATH);
    const items = Array.isArray(raw?.items)
      ? raw.items.map(normalizeCountryListItem).sort((a, b) => b.coins - a.coins)
      : [];

    return { items, source: "wp" };
  } catch {
    return getMockCountriesList();
  }
}

function buildMockCountryTimeline(coins) {
  const years = Array.from(new Set(coins.map((c) => c.year))).sort((a, b) => a - b);
  return years.map((year) => ({
    year,
    count: coins.filter((c) => c.year === year).length,
  }));
}

function getMockCountryDetail(code) {
  const upperCode = (code || "").toUpperCase();
  const country = findCountry(upperCode);

  if (!country) {
    return { country: null, coins: [], stats: {}, timeline: [], source: "mock" };
  }

  const coins = coinsByCountry(upperCode);
  const years = coins.map((c) => c.year).filter(Boolean);
  const yearStart = years.length ? Math.min(...years) : null;
  const yearEnd = years.length ? Math.max(...years) : null;
  const seriesCount = new Set(coins.map((c) => c.seriesSlug).filter(Boolean)).size;

  return {
    country: normalizeCountryListItem({
      code: country.code,
      slug: country.code.toLowerCase(),
      name: country.name.en,
      coinCount: coins.length,
      latestYear: yearEnd,
    }),
    coins,
    stats: {
      coins: coins.length,
      series: seriesCount,
      yearStart,
      yearEnd,
    },
    timeline: buildMockCountryTimeline(coins),
    source: "mock",
  };
}

export async function getCountryDetail(code) {
  const upperCode = (code || "").toUpperCase();

  if (!upperCode) {
    return getMockCountryDetail(code);
  }

  try {
    const raw = await wpFetch(`${COUNTRIES_PATH}/${encodeURIComponent(upperCode)}?per_page=50`);
    if (!raw?.country) throw new Error("Missing country");

    const normalized = normalizeCountryDetail(raw);
    const coins = Array.isArray(raw.coins) ? raw.coins.map(normalizeCoinCard) : [];

    return {
      ...normalized,
      country: {
        ...normalized.country,
        yearStart: raw.country.yearStart ?? normalized.country.yearStart,
        yearEnd: raw.country.yearEnd ?? normalized.country.yearEnd,
      },
      coins,
      source: "wp",
    };
  } catch {
    return getMockCountryDetail(upperCode);
  }
}
