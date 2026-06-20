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
- [x] Hero h1 always renders `renderHighlightedText()` with `<em>` highlight + preserved ACF line breaks

## In Progress
- [ ] Manual DOM verification with live WP homepage API

## Pending Tasks
- [ ] Expose `highlight_word` + multiline `title` in WP `/homepage` API when ACF fields are ready

## Last Update
2026-06-19 — Hero highlight fix: always JSX render, highlight fallback, node array output
