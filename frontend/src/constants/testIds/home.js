export const HOME = {
  // nav
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

  heroSection: "hero-section",
  heroCoin: "hero-coin",
  heroTitle: "hero-title",
  heroExplore: "hero-explore-btn",
  heroBrowse: "hero-browse-btn",

  manifestoSection: "manifesto-section",

  featureSection: "feature-section",
  featureReadStory: "feature-read-story",

  countriesSection: "countries-section",
  countryCard: (code) => `country-card-${code}`,

  timelineSection: "timeline-section",
  timelineYear: (y) => `timeline-year-${y}`,
  timelineBrowseYear: "timeline-browse-year",

  mintsSection: "mints-section",
  mintMark: (l) => `mint-mark-${l}`,

  statsSection: "stats-section",
  statCoins: "stat-coins",
  statCountries: "stat-countries",
  statYears: "stat-years",

  recentSection: "recent-section",
  recentCard: (id) => `recent-card-${id}`,

  contributeSection: "contribute-section",
  contributeCta: "contribute-cta",

  footer: "site-footer",
  emergentLink: "emergent-link",
};

export const COINS_PAGE = {
  page: "coins-page",
  searchInput: "coins-search",
  filterCountry: (code) => `filter-country-${code}`,
  filterCountryAll: "filter-country-all",
  filterYear: "filter-year-select",
  filterMint: (l) => `filter-mint-${l}`,
  filterMintAll: "filter-mint-all",
  sortSelect: "coins-sort-select",
  clearFilters: "coins-clear-filters",
  resultsCount: "coins-results-count",
  grid: "coins-grid",
  card: (slug) => `coin-card-${slug}`,
  empty: "coins-empty-state",
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
  related: (slug) => `coin-related-${slug}`,
  submitImprove: "coin-submit-improve",
};
