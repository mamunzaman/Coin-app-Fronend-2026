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

import { searchCoins, COINS, COUNTRIES, MINTS, SERIES_LIST, allYears, findCoinBySlug, findCountry, findSeries, coinsByCountry, coinsBySeries, relatedCoins as mockRelatedCoins } from "@/data/coinData";
import { wpFetch, getWpBaseUrl } from "./wpClient";
import { getCurrentLanguage, logApiLanguageDebug, withLanguageParam } from "@/utils/language";
import { normalizeSearchResult, normalizeCoinCard, normalizeCoinDetail } from "./normalizers/normalizeCoin";
import { normalizeCountryListItem, normalizeCountryDetail, extractCountryRaw, extractCountryCoins } from "./normalizers/normalizeCountry";
import { normalizeSeriesListItem, normalizeSeriesDetail } from "./normalizers/normalizeSeries";
import { normalizeHomepageSettings, normalizeSiteSettings } from "./normalizers/normalizeSettings";

const STATS_PATH = "/wp-json/coinarchive/v1/stats";
const SEARCH_PATH = "/wp-json/coinarchive/v1/search";
const COINS_PATH = "/wp-json/coinarchive/v1/coins";
const COUNTRIES_PATH = "/wp-json/coinarchive/v1/countries";
const SERIES_PATH = "/wp-json/coinarchive/v1/series";
const HOMEPAGE_PATH = "/wp-json/coinarchive/v1/homepage";
const SITE_SETTINGS_PATH = "/wp-json/coinarchive/v1/site-settings";
const FIRST_ISSUE_YEAR = 2004;

function resolveLang(lang) {
  return lang || getCurrentLanguage();
}

const publicApiInflight = new Map();

function publicApiCacheKey(path, lang) {
  return withLanguageParam(path, lang);
}

async function fetchPublicApi(path, options = {}) {
  const lang = resolveLang(options.lang);
  const { lang: _omit, ...fetchOptions } = options;
  const urlPath = publicApiCacheKey(path, lang);
  const cacheKey = urlPath;

  const devNoCache =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" }
      : {};

  if (publicApiInflight.has(cacheKey)) {
    return publicApiInflight.get(cacheKey);
  }

  const promise = wpFetch(urlPath, { ...fetchOptions, ...devNoCache }).finally(() => {
    publicApiInflight.delete(cacheKey);
  });

  publicApiInflight.set(cacheKey, promise);
  return promise;
}

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

export async function getStats(lang) {
  try {
    const resolved = resolveLang(lang);
    const raw = await fetchPublicApi(STATS_PATH, { lang: resolved });
    logApiLanguageDebug("stats", resolved, raw);
    return normalizeStats(raw);
  } catch {
    return { ...MOCK_STATS };
  }
}

export async function getHomepageSettings(lang) {
  try {
    const resolved = resolveLang(lang);
    const raw = await fetchPublicApi(HOMEPAGE_PATH, { lang: resolved });
    logApiLanguageDebug("homepage", resolved, raw);
    return normalizeHomepageSettings(raw);
  } catch {
    return { source: "mock" };
  }
}

export async function getSiteSettings(lang) {
  try {
    const resolved = resolveLang(lang);
    const raw = await fetchPublicApi(SITE_SETTINGS_PATH, { lang: resolved });
    logApiLanguageDebug("site-settings", resolved, raw);
    return normalizeSiteSettings(raw);
  } catch {
    return { source: "mock" };
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

    const resolved = resolveLang(options.lang);
    const raw = await fetchPublicApi(`${SEARCH_PATH}?${params}`, { lang: resolved });
    logApiLanguageDebug("search", resolved, raw);
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
  const totalPages = raw?.totalPages != null
    ? Number(raw.totalPages)
    : (fallback.totalPages ?? (total > 0 ? Math.ceil(total / perPage) : 0));

  return { page, perPage, total, totalPages };
}

function normalizeCoinsListParams(params = {}) {
  const search = (params.search ?? params.q ?? "").trim();
  const perPage = Math.max(1, Math.min(50, Number(params.perPage ?? params.per_page) || 12));

  return {
    q: search,
    country: params.country ?? "all",
    year: params.year ?? "all",
    mint: params.mintMark ?? params.mint ?? "all",
    series: params.series ?? "all",
    sort: params.sort ?? "newest",
    page: Math.max(1, Number(params.page) || 1),
    per_page: perPage,
  };
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
    q,
    country,
    year,
    mint,
    series,
    sort,
    page,
    per_page,
  } = normalizeCoinsListParams(params);

  const filtered = filterMockCoins({ q, country, year, mint, series, sort });
  const start = (page - 1) * per_page;
  const items = filtered.slice(start, start + per_page);
  const total = filtered.length;
  const totalPages = total > 0 ? Math.ceil(total / per_page) : 0;

  return {
    items,
    facets: getMockFacets(),
    pagination: { page, perPage: per_page, total, totalPages },
    source: "mock",
  };
}

export async function getCoinsList(params = {}) {
  const {
    q,
    country,
    year,
    mint,
    series,
    sort,
    page,
    per_page,
  } = normalizeCoinsListParams(params);

  try {
    const urlParams = new URLSearchParams();
    if (q) urlParams.set("q", q);
    if (country !== "all") urlParams.set("country", country);
    if (year !== "all") urlParams.set("year", String(year));
    if (mint !== "all") urlParams.set("mint", mint);
    if (series !== "all") urlParams.set("series", series);
    if (sort) urlParams.set("sort", sort);
    urlParams.set("page", String(page));
    urlParams.set("per_page", String(per_page));

    const resolved = resolveLang(params.lang);
    const result = await fetchPublicApi(`${COINS_PATH}?${urlParams}`, { lang: resolved, includeHeaders: true });
    logApiLanguageDebug("coins", resolved, result?.data ?? result);
    const raw = result?.data ?? result;
    const items = Array.isArray(raw?.items) ? raw.items.map(normalizeCoinCard) : [];
    const headerTotal = Number(result?.headers?.total);
    const headerTotalPages = Number(result?.headers?.totalPages);

    const pagination = normalizePagination(raw?.pagination, {
      page,
      perPage: per_page,
      total: Number.isFinite(headerTotal) ? headerTotal : items.length,
      totalPages: Number.isFinite(headerTotalPages) ? headerTotalPages : undefined,
    });

    return {
      items,
      facets: normalizeFacets(raw?.facets),
      pagination,
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

export async function getCoinDetail(slug, lang) {
  if (!slug) return getMockCoinDetail(slug);

  try {
    const resolved = resolveLang(lang);
    const raw = await fetchPublicApi(`${COINS_PATH}/${encodeURIComponent(slug)}`, { lang: resolved });
    logApiLanguageDebug("coin-detail", resolved, raw);
    const coinRaw = raw?.coin ?? raw?.data?.coin ?? null;
    if (!coinRaw) throw new Error("Missing coin");

    const relatedRaw = raw?.relatedCoins ?? raw?.related_coins ?? [];

    return {
      coin: normalizeCoinDetail(coinRaw),
      relatedCoins: Array.isArray(relatedRaw) ? relatedRaw.map(normalizeCoinCard) : [],
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

export async function getCountriesList(lang) {
  try {
    const resolved = resolveLang(lang);
    const raw = await fetchPublicApi(COUNTRIES_PATH, { lang: resolved });
    logApiLanguageDebug("countries", resolved, raw);
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

function resolveCountryApiId(code) {
  return String(code || "").trim().toLowerCase();
}

function resolveCountryLookupCode(code) {
  const trimmed = String(code || "").trim();
  if (!trimmed) return "";
  if (trimmed.length <= 3) return trimmed.toUpperCase();
  const mock = COUNTRIES.find((c) => c.code.toLowerCase() === trimmed.toLowerCase());
  return mock?.code || trimmed.toUpperCase();
}

function normalizeCountryCoins(rawCoins) {
  const list = Array.isArray(rawCoins) ? rawCoins : [];
  return list.map((coin, index) => {
    try {
      return normalizeCoinCard(coin);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[getCountryDetail:coin-normalize-fail]", { index, error: error?.message || error, coin });
      }
      return null;
    }
  }).filter(Boolean);
}

export async function getCountryDetail(code, lang) {
  const apiId = resolveCountryApiId(code);
  const lookupCode = resolveCountryLookupCode(code);
  const resolved = resolveLang(lang);
  const endpoint = `${COUNTRIES_PATH}/${encodeURIComponent(apiId)}?per_page=50`;

  if (process.env.NODE_ENV === "development") {
    console.log("[getCountryDetail:start]", {
      identifier: code,
      apiId,
      lookupCode,
      lang: resolved,
      endpoint: `${getWpBaseUrl()}${withLanguageParam(endpoint, resolved)}`,
    });
  }

  if (!apiId) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getCountryDetail:fallback]", { reason: "empty-api-id", identifier: code });
    }
    return getMockCountryDetail(code);
  }

  try {
    const raw = await fetchPublicApi(endpoint, { lang: resolved });
    logApiLanguageDebug("country-detail", resolved, raw);

    if (process.env.NODE_ENV === "development") {
      console.log("[getCountryDetail:raw]", raw);
    }

    const wpCountry = extractCountryRaw(raw);
    if (!wpCountry) {
      throw Object.assign(new Error("Missing country"), { code: "MISSING_COUNTRY", raw });
    }

    const normalized = normalizeCountryDetail({ ...raw, country: wpCountry });
    const coins = normalizeCountryCoins(extractCountryCoins(raw));

    const result = {
      ...normalized,
      country: {
        ...normalized.country,
        yearStart: wpCountry.yearStart ?? wpCountry.year_start ?? normalized.country.yearStart,
        yearEnd: wpCountry.yearEnd ?? wpCountry.year_end ?? normalized.country.yearEnd,
      },
      coins,
      stats: normalized.stats ?? raw.stats ?? {},
      timeline: normalized.timeline ?? (Array.isArray(raw.timeline) ? raw.timeline : []),
      language: raw.language ?? null,
      source: "wp",
    };

    if (process.env.NODE_ENV === "development") {
      console.log("[getCountryDetail:normalized]", {
        source: result.source,
        language: result.language,
        country: result.country,
        coinsLength: result.coins.length,
      });
    }

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getCountryDetail:fallback]", {
        reason: error?.message || String(error),
        code: error?.code,
        status: error?.status,
        url: error?.url,
        identifier: code,
        apiId,
        lang: resolved,
        raw: error?.raw,
        error,
      });
    }
    return getMockCountryDetail(lookupCode);
  }
}

function getMockSeriesList() {
  const items = SERIES_LIST.map((s) => ({
    ...s,
    coinCount: coinsBySeries(s.slug).length,
  }));

  return { items, source: "mock" };
}

function buildMockSeriesTimeline(coins) {
  const years = Array.from(new Set(coins.map((c) => c.year))).sort((a, b) => a - b);
  return years.map((year) => ({
    year,
    count: coins.filter((c) => c.year === year).length,
  }));
}

function getMockSeriesDetail(slug) {
  const series = findSeries(slug);

  if (!series) {
    return { series: null, coins: [], stats: {}, timeline: [], source: "mock" };
  }

  const coins = coinsBySeries(series.slug);
  const years = coins.map((c) => c.year).filter(Boolean);
  const yearStart = years.length ? Math.min(...years) : null;
  const yearEnd = years.length ? Math.max(...years) : null;

  return {
    series: {
      ...series,
      coinCount: coins.length,
    },
    coins,
    stats: {
      coins: coins.length,
      countries: new Set(coins.map((c) => c.countryCode).filter(Boolean)).size,
      yearStart,
      yearEnd,
    },
    timeline: buildMockSeriesTimeline(coins),
    source: "mock",
  };
}

export async function getSeriesList(lang) {
  try {
    const resolved = resolveLang(lang);
    const raw = await fetchPublicApi(SERIES_PATH, { lang: resolved });
    logApiLanguageDebug("series", resolved, raw);
    const items = Array.isArray(raw?.items)
      ? raw.items.map((item, index) => normalizeSeriesListItem(item, index))
      : [];

    return { items, source: "wp" };
  } catch {
    return getMockSeriesList();
  }
}

export async function getSeriesDetail(slug, lang) {
  const cleanSlug = (slug || "").trim();

  if (!cleanSlug) {
    return getMockSeriesDetail(slug);
  }

  try {
    const resolved = resolveLang(lang);
    const result = await fetchPublicApi(
      `${SERIES_PATH}/${encodeURIComponent(cleanSlug)}?per_page=50`,
      { lang: resolved, includeHeaders: true },
    );
    logApiLanguageDebug("series-detail", resolved, result?.data ?? result);
    const raw = result?.data ?? result;

    if (!raw?.series) throw new Error("Missing series");

    const normalized = normalizeSeriesDetail(raw);
    const coins = Array.isArray(raw.coins) ? raw.coins.map(normalizeCoinCard) : [];
    const total = Number(result?.headers?.total);
    const totalPages = Number(result?.headers?.totalPages);

    return {
      ...normalized,
      coins,
      pagination: Number.isFinite(total)
        ? { total, totalPages: Number.isFinite(totalPages) ? totalPages : 0 }
        : undefined,
      source: "wp",
    };
  } catch {
    return getMockSeriesDetail(cleanSlug);
  }
}
