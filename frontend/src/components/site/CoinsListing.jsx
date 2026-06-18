import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { COINS, COUNTRIES, MINTS, SERIES_LIST, allYears, getCoinsList } from "@/services/coinArchiveService";
import { COINS_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CoinCard from "./CoinCard";
import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const SORTS = ["newest", "oldest", "country", "rarity"];
const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;

export const CoinsListing = () => {
  useScrollReveal();
  const { t, lang } = useLang();
  useDocumentTitle(t.coins.title);
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [country, setCountry] = useState(params.get("country") || "all");
  const [year, setYear] = useState(params.get("year") || "all");
  const [mint, setMint] = useState(params.get("mint") || "all");
  const [seriesFilter, setSeriesFilter] = useState(params.get("series") || "all");
  const [sort, setSort] = useState(params.get("sort") || "newest");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [facets, setFacets] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [source, setSource] = useState("mock");
  const [loading, setLoading] = useState(true);
  const filterVersion = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    if (country !== "all") next.set("country", country);
    if (year !== "all") next.set("year", year);
    if (mint !== "all") next.set("mint", mint);
    if (seriesFilter !== "all") next.set("series", seriesFilter);
    if (sort !== "newest") next.set("sort", sort);
    setParams(next, { replace: true });
  }, [search, country, year, mint, seriesFilter, sort, setParams]);

  useEffect(() => {
    filterVersion.current += 1;
    setPage(1);
  }, [debouncedSearch, country, year, mint, seriesFilter, sort]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  useEffect(() => {
    const version = filterVersion.current;
    let cancelled = false;
    setLoading(true);

    getCoinsList({
      q: debouncedSearch,
      country,
      year,
      mint,
      series: seriesFilter,
      sort,
      page,
      per_page: PAGE_SIZE,
    }).then((result) => {
      if (cancelled || version !== filterVersion.current) return;
      setItems((prev) => (page === 1 ? result.items : [...prev, ...result.items]));
      setFacets(result.facets);
      setPagination(result.pagination);
      setSource(result.source);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [debouncedSearch, country, year, mint, seriesFilter, sort, page]);

  const clearAll = () => {
    setSearch("");
    setCountry("all");
    setYear("all");
    setMint("all");
    setSeriesFilter("all");
    setSort("newest");
  };

  const hasFilter = search || country !== "all" || year !== "all" || mint !== "all" || seriesFilter !== "all" || sort !== "newest";
  const totalCount = source === "wp" && pagination?.total != null
    ? pagination.total
    : pagination?.total ?? items.length;
  const hasMore = pagination ? page < pagination.totalPages : false;
  const remaining = Math.max(0, totalCount - items.length);
  const loadingLabel = lang === "de" ? "Aktualisiere…" : "Updating…";

  const countryOptions = facets?.countries?.length ? facets.countries : COUNTRIES;
  const yearOptions = facets?.years?.length
    ? [...facets.years].map((y) => y.year).sort((a, b) => b - a)
    : allYears();
  const mintOptions = facets?.mints?.length
    ? facets.mints.map((m) => ({
      letter: m.letter,
      city: m.city || MINTS.find((x) => x.letter === m.letter)?.city || m.letter,
    }))
    : MINTS;
  const seriesOptions = facets?.series?.length ? facets.series : SERIES_LIST;

  return (
    <div className="ca-page" data-testid={COINS_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <div className="ca-section-id">
            <span className="ca-section-id__num">II.</span>
            <span className="ca-section-id__label">{t.coins.eyebrow}</span>
            <span className="ca-section-id__rule" />
            <span className="ca-section-id__meta">{COINS.length} entries</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                {t.coins.title}
              </h1>
            </div>
            <p className="md:col-span-5 ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>
              {t.coins.sub}
            </p>
          </div>
        </div>
      </header>

      <div className="ca-filter-bar">
        <div className="ca-container">
          <div className="ca-filter-bar__inner">
            <div className="ca-filter-search">
              <Search size={16} className="ca-filter-search__icon" />
              <input
                data-testid={COINS_PAGE.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.coins.searchPlaceholder}
                className="ca-filter-search__input"
                aria-label="Search"
              />
              {search && (
                <button onClick={() => setSearch("")} className="ca-filter-search__clear" aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="ca-filter-chips" aria-label="Country">
              <button
                data-testid={COINS_PAGE.filterCountryAll}
                onClick={() => setCountry("all")}
                className={`ca-chip ${country === "all" ? "ca-chip--active" : ""}`}
              >
                {t.coins.allCountries}
              </button>
              {countryOptions.map((c) => (
                <button
                  key={c.code}
                  data-testid={COINS_PAGE.filterCountry(c.code)}
                  onClick={() => setCountry(c.code)}
                  className={`ca-chip ${country === c.code ? "ca-chip--active" : ""}`}
                  title={c.name[lang]}
                >
                  {c.code}
                </button>
              ))}
            </div>

            <div className="ca-filter-selects">
              <label className="ca-select">
                <span className="ca-select__label">{t.coins.filterByYear}</span>
                <select
                  data-testid={COINS_PAGE.filterYear}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="all">{t.coins.allYears}</option>
                  {yearOptions.map((y) => (<option key={y} value={y}>{y}</option>))}
                </select>
              </label>

              <label className="ca-select">
                <span className="ca-select__label">{t.coins.filterByMint}</span>
                <select
                  data-testid={COINS_PAGE.filterMintAll}
                  value={mint}
                  onChange={(e) => setMint(e.target.value)}
                >
                  <option value="all">{t.coins.allMints}</option>
                  {mintOptions.map((m) => (
                    <option key={m.letter} value={m.letter} data-testid={COINS_PAGE.filterMint(m.letter)}>
                      {m.letter} — {m.city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="ca-select">
                <span className="ca-select__label">Series</span>
                <select
                  data-testid={COINS_PAGE.filterSeries}
                  value={seriesFilter}
                  onChange={(e) => setSeriesFilter(e.target.value)}
                >
                  <option value="all">All Series</option>
                  {seriesOptions.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name[lang]}</option>
                  ))}
                </select>
              </label>

              <label className="ca-select">
                <span className="ca-select__label">{t.coins.sortBy}</span>
                <select
                  data-testid={COINS_PAGE.sortSelect}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>
                      {s === "newest" ? t.coins.sortNewest
                        : s === "oldest" ? t.coins.sortOldest
                        : s === "country" ? t.coins.sortCountry
                        : t.coins.sortRarity}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {hasFilter && (
              <button
                data-testid={COINS_PAGE.clearFilters}
                onClick={clearAll}
                className="ca-btn ca-btn--ghost ca-btn--sm"
              >
                <X size={14} />
                {t.coins.clear}
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="ca-section">
        <div className="ca-container">
          <div className="flex items-center justify-between mb-10">
            <div data-testid={COINS_PAGE.resultsCount} className="ca-mono" aria-busy={loading}>
              {loading && items.length === 0
                ? loadingLabel
                : `${totalCount} ${t.coins.resultsCount}${loading && items.length > 0 ? ` · ${loadingLabel}` : ""}`}
            </div>
            {hasFilter && (
              <button onClick={clearAll} className="ca-mono" style={{ color: "var(--ca-gold-light)" }}>
                {t.coins.clear}
              </button>
            )}
          </div>

          {!loading && items.length === 0 ? (
            <div data-testid={COINS_PAGE.empty} className="ca-empty">
              <div className="ca-display" style={{ fontSize: 32, marginBottom: 16 }}>{t.coins.empty}</div>
              <button onClick={clearAll} className="ca-btn ca-btn--secondary">
                {t.coins.clear}
              </button>
            </div>
          ) : (
            <>
              <div data-testid={COINS_PAGE.grid} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {items.map((c) => (
                  <CoinCard key={c.slug} coin={c} />
                ))}
              </div>
              {hasMore && (
                <div className="text-center mt-14">
                  <button
                    data-testid={COINS_PAGE.loadMore}
                    onClick={() => setPage((p) => p + 1)}
                    disabled={loading}
                    className="ca-btn ca-btn--secondary"
                  >
                    Load more · {remaining} remaining
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoinsListing;
