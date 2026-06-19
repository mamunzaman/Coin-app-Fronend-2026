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

## In Progress
- [ ] Manual verification of coins filters + pagination on live WP

## Pending Tasks
- [ ] End-to-end verify all WP-connected pages
- [ ] Remaining static homepage sections (if any)

## Last Update
2026-06-19 — Coins listing filters + prev/next pagination via `getCoinsList()`
