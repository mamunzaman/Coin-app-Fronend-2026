# Project Status

## Completed Features
- [x] WordPress-ready service layer (`coinArchiveService.js`) re-exporting static mock data
- [x] All 16 site components import from service layer instead of `coinData.js`
- [x] Future placeholder files: `wpClient.js`, normalizers (coin, media, country, series)

## In Progress
- [ ] Wire service layer to WordPress REST API

## Pending Tasks
- [ ] Implement `wpClient.js` fetch logic
- [ ] Implement normalizers for WP payloads
- [ ] Swap mock re-exports for live API calls in `coinArchiveService.js`

## Last Update
2026-06-19 — Service layer scaffold complete; build passes
