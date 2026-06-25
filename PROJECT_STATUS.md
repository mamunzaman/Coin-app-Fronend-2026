# Project Status

## Completed Features
- [x] WordPress-ready service layer with mock fallback
- [x] Homepage + site settings API consumption
- [x] Hero highlight + manifesto explicit quote fields
- [x] Archive Overview cards normalized from ACF `card_*` fields with per-field fallback
- [x] Frontend Polylang language support (`de` default, `/en` prefix, `?lang=` on public API)
- [x] Language-aware fetch dedupe + stale request protection on listing pages

## In Progress
- [ ] Manual verification of Polylang routes and API lang params on live backend

## Pending Tasks
- [ ] Remaining homepage section ACF field alignment (collector education, etc.)
- [ ] Localize remaining hardcoded internal links (Learn, MintMarks, NotFound, etc.)

## Last Update
2026-06-19 — Country detail fallback fix: wpClient JSON parse, API-first normalizer, dev logs
