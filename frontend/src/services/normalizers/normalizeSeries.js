import { SERIES_LIST as MOCK_SERIES } from "@/data/coinData";

const DEFAULT_ACCENTS = ["#D4AF37", "#4F82FF", "#1E5EFF", "#A97E12", "#2CB67D"];

function findMockSeries(slug) {
  return MOCK_SERIES.find((s) => s.slug === slug) || null;
}

function asLocalized(value, mockField) {
  if (mockField) return mockField;
  if (!value) return { en: "", de: "" };
  if (typeof value === "string") return { en: value, de: value };
  return {
    en: value.en || value.de || "",
    de: value.de || value.en || "",
  };
}

function buildRange(wpSeries, mock) {
  if (mock?.range) return mock.range;

  const start = wpSeries?.seriesStartYear ?? wpSeries?.yearStart;
  const end = wpSeries?.seriesEndYear ?? wpSeries?.yearEnd;

  if (start && end) return start === end ? String(start) : `${start} — ${end}`;
  if (start) return `${start} — Present`;
  if (end) return String(end);
  return "—";
}

export function normalizeSeriesListItem(wpSeries, index = 0) {
  const mock = findMockSeries(wpSeries?.slug);
  const coinCount = Number(wpSeries?.coinCount ?? 0);
  const count = Number(wpSeries?.canonicalCount ?? coinCount ?? mock?.count ?? 0);

  return {
    slug: wpSeries?.slug || mock?.slug || "",
    name: asLocalized(wpSeries?.name, mock?.name),
    range: buildRange(wpSeries, mock),
    country: mock?.country ?? null,
    count,
    coinCount,
    accent: mock?.accent ?? DEFAULT_ACCENTS[index % DEFAULT_ACCENTS.length],
    description: asLocalized(wpSeries?.description, mock?.description),
    yearStart: wpSeries?.yearStart ?? null,
    yearEnd: wpSeries?.yearEnd ?? null,
    featuredCoin: wpSeries?.featuredCoin ?? null,
  };
}

export function normalizeSeriesDetail(wpPayload) {
  const series = normalizeSeriesListItem(wpPayload?.series ?? {});

  return {
    series: {
      ...series,
      countries: wpPayload?.series?.countries ?? null,
    },
    stats: wpPayload?.stats || {},
    timeline: Array.isArray(wpPayload?.timeline) ? wpPayload.timeline : [],
  };
}

export function normalizeSeries(raw) {
  return normalizeSeriesListItem(raw);
}
