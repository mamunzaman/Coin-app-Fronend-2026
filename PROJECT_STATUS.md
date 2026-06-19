# Project Status

## Completed Features
- [x] WordPress-ready service layer (`coinArchiveService.js`) re-exporting static mock data
- [x] All 16 site components import from service layer instead of `coinData.js`
- [x] Future placeholder files: `wpClient.js`, normalizers (coin, media, country, series)
- [x] `wpClient.js` — configurable base URL, timeout, JSON handling, `WpClientError`
- [x] Homepage `Stats` connected via `getStats()` with mock fallback
- [x] `SearchOverlay` connected via `searchArchive()` with mock fallback + debounce
- [x] `/coins` listing connected via `getCoinsList()` with facets, pagination, mock fallback
- [x] Coin detail connected via `getCoinDetail()` with related coins + mock fallback
- [x] Countries list + detail connected via `getCountriesList()` / `getCountryDetail()`
- [x] Series list + detail connected via `getSeriesList()` / `getSeriesDetail()`

## In Progress
- [ ] End-to-end verification of all WP-connected pages

## Pending Tasks
- [ ] Remaining static homepage sections (if any)

## Last Update
2026-06-19 — Series pages live from `/wp-json/coinarchive/v1/series`
