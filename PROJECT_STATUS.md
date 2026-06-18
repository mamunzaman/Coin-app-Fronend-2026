# Project Status

## Completed Features
- [x] WordPress-ready service layer (`coinArchiveService.js`) re-exporting static mock data
- [x] All 16 site components import from service layer instead of `coinData.js`
- [x] Future placeholder files: `wpClient.js`, normalizers (coin, media, country, series)
- [x] `wpClient.js` — configurable base URL, timeout, JSON handling, `WpClientError`
- [x] Homepage `Stats` connected via `getStats()` with mock fallback
- [x] `SearchOverlay` connected via `searchArchive()` with mock fallback + debounce

## In Progress
- [ ] Connect remaining data (coins, countries, series detail pages) to WordPress API

## Pending Tasks
- [ ] Implement normalizers for WP payloads
- [ ] Wire coins listing/detail through service layer

## Last Update
2026-06-19 — Search overlay live from `/wp-json/coinarchive/v1/search` with mock fallback
