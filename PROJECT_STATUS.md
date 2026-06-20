# Project Status

## Completed Features
- [x] WordPress-ready service layer with mock fallback
- [x] All listing/detail pages connected to WP API
- [x] Coin detail editorial layout + skeleton loaders
- [x] V2 visual polish (hero orbits, nav typography, Countries section)
- [x] Homepage + site settings API consumption (`/homepage`, `/site-settings`)
- [x] SettingsProvider with safe fallback to static i18n/mock content
- [x] Navbar/Footer wired to site-settings header/footer
- [x] Homepage sections wired to homepage endpoint
- [x] Local SVG country flag fallback (`getCountryFlag`)
- [x] Hero h1 via `renderHighlightedText()` with `<em>` highlight + ACF line breaks
- [x] Manifesto quote uses explicit ACF fields (`text`, `highlight_text`, `attribution`) — no parsing

## In Progress
- [ ] Manual verification of manifesto quote fields from live API

## Pending Tasks
- [ ] Clear WP homepage settings transient after plugin quote payload update

## Last Update
2026-06-19 — Explicit ACF quote fields in API + Manifesto (no text splitting)
