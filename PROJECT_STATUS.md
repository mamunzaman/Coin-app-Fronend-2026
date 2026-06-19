# Project Status

## Completed Features
- [x] WordPress-ready service layer (`coinArchiveService.js`) re-exporting static mock data
- [x] All 16 site components import from service layer instead of `coinData.js`
- [x] Future placeholder files: `wpClient.js`, normalizers (coin, media, country, series)
- [x] `wpClient.js` — configurable base URL, timeout, JSON handling, `WpClientError`
- [x] Homepage `Stats` connected via `getStats()` with mock fallback
- [x] `SearchOverlay` connected via `searchArchive()` with mock fallback + debounce
- [x] `/coins` listing with WP filters (search, country, year, series, mint), prev/next pagination, mock fallback
- [x] Coin detail connected via `getCoinDetail()` with related coins + mock fallback
- [x] Countries list + detail connected via `getCountriesList()` / `getCountryDetail()`
- [x] Series list + detail connected via `getSeriesList()` / `getSeriesDetail()`
- [x] `/learn` and `/mint-marks` polished — educational hub, mint guide, editorial sections, CTAs
- [x] Homepage premium polish — hero stats, archive overview, featured coins, learning, search CTA, trust section
- [x] Coin detail visible content fix — scroll-reveal re-scan + defensive render helpers

## In Progress
- [ ] Manual verification of coin detail visible content

## Pending Tasks
- [ ] End-to-end verify all WP-connected pages

## Last Update
2026-06-19 — Coin detail invisible content fixed (ca-reveal async timing)
