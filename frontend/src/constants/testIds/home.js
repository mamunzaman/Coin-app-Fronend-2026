export const HOME = {
  navLogo: "nav-logo",
  navCoins: "nav-coins",
  navCountries: "nav-countries",
  navSeries: "nav-series",
  navLearn: "nav-learn",
  navSearch: "nav-search-btn",
  navAccount: "nav-account-btn",
  navCta: "nav-cta-submit",
  navLangToggle: "nav-lang-toggle",
  navMobileToggle: "nav-mobile-toggle",
  heroSection: "hero-section", heroCoin: "hero-coin", heroTitle: "hero-title",
  heroExplore: "hero-explore-btn", heroBrowse: "hero-browse-btn",
  manifestoSection: "manifesto-section",
  featureSection: "feature-section", featureReadStory: "feature-read-story",
  countriesSection: "countries-section",
  countryCard: (code) => `country-card-${code}`,
  timelineSection: "timeline-section",
  timelineYear: (y) => `timeline-year-${y}`,
  timelineBrowseYear: "timeline-browse-year",
  mintsSection: "mints-section",
  mintMark: (l) => `mint-mark-${l}`,
  statsSection: "stats-section",
  statCoins: "stat-coins", statCountries: "stat-countries", statYears: "stat-years",
  recentSection: "recent-section",
  recentCard: (id) => `recent-card-${id}`,
  contributeSection: "contribute-section", contributeCta: "contribute-cta",
  footer: "site-footer", emergentLink: "emergent-link",
};

export const COINS_PAGE = {
  page: "coins-page",
  searchInput: "coins-search",
  filterCountry: (code) => `filter-country-${code}`,
  filterCountryAll: "filter-country-all",
  filterYear: "filter-year-select",
  filterMint: (l) => `filter-mint-${l}`,
  filterMintAll: "filter-mint-all",
  filterSeries: "filter-series-select",
  sortSelect: "coins-sort-select",
  clearFilters: "coins-clear-filters",
  resultsCount: "coins-results-count",
  grid: "coins-grid",
  card: (slug) => `coin-card-${slug}`,
  empty: "coins-empty-state",
  loadMore: "coins-load-more",
  paginationPrev: "coins-pagination-prev",
  paginationNext: "coins-pagination-next",
  paginationStatus: "coins-pagination-status",
};

export const COIN_DETAIL = {
  page: "coin-detail-page",
  back: "coin-detail-back",
  breadcrumb: "coin-detail-breadcrumb",
  obverse: "coin-detail-obverse",
  reverse: "coin-detail-reverse",
  toggleObverse: "coin-toggle-obverse",
  toggleReverse: "coin-toggle-reverse",
  title: "coin-detail-title",
  storyTab: "coin-tab-story",
  specsTab: "coin-tab-specs",
  designerTab: "coin-tab-designer",
  galleryItem: (i) => `coin-gallery-${i}`,
  related: (slug) => `coin-related-${slug}`,
  submitImprove: "coin-submit-improve",
};

export const COUNTRIES_PAGE = {
  page: "countries-page",
  card: (code) => `countries-card-${code}`,
};

export const COUNTRY_DETAIL = {
  page: "country-detail-page",
  hero: "country-detail-hero",
  stats: "country-detail-stats",
  grid: "country-detail-grid",
  mintsSection: "country-detail-mints",
  timeline: "country-detail-timeline",
};

export const SERIES_PAGE = {
  page: "series-page",
  card: (slug) => `series-card-${slug}`,
};

export const SERIES_DETAIL = {
  page: "series-detail-page",
  hero: "series-detail-hero",
  grid: "series-detail-grid",
  timeline: "series-detail-timeline",
};

export const LEARN_PAGE = {
  page: "learn-page",
  card: (slug) => `learn-card-${slug}`,
};

export const MINT_MARKS_PAGE = {
  page: "mint-marks-page",
  mark: (l) => `mintmarks-${l}`,
  map: "mintmarks-map",
};

export const SEARCH = {
  overlay: "search-overlay",
  input: "search-input",
  close: "search-close",
  result: (slug) => `search-result-${slug}`,
  empty: "search-empty",
};
