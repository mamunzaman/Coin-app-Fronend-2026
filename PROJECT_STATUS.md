# Project Status

## Completed Features
- [x] WordPress-ready service layer (`coinArchiveService.js`) re-exporting static mock data
- [x] All 16 site components import from service layer instead of `coinData.js`
- [x] Future placeholder files: `wpClient.js`, normalizers (coin, media, country, series)
- [x] `wpClient.js` — configurable base URL, timeout, JSON handling, `WpClientError`
- [x] Homepage `Stats` connected via `getStats()` with mock fallback

## In Progress
- [ ] Connect remaining data (coins, countries, series, search) to WordPress API

## Pending Tasks
- [ ] Implement normalizers for WP payloads
- [ ] Wire coins/countries/series/search through service layer

## Last Update
2026-06-19 — Homepage stats live from `/wp-json/coinarchive/v1/stats` with mock fallback
