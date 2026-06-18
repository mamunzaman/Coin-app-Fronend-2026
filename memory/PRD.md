# CoinArchive — PRD

## Original problem statement
Build a premium homepage for CoinArchive — a European 2 Euro commemorative coin archive. Must feel like a Digital Museum / Luxury Collector Archive / Premium European Cultural Project. NOT a generic startup, crypto, ecommerce, or typical coin-collector site. Inspired 40% Apple product pages, 30% Museum exhibitions, 20% Luxury watch brands, 10% modern web apps.

## User choices
- Static frontend now, real database/API later
- Bilingual EN + DE toggle
- Layout inspiration: Behance "City Coins" (layout only, NOT the colors)
- Colors strictly per provided design system (Numismatic Gold #D4AF37 + European Blue #1E5EFF on dark #0F1115)

## Architecture
- React 19 SPA, React Router, Tailwind, shadcn/ui base preserved.
- i18n via lightweight React Context (`/i18n/LanguageContext.jsx`) backed by `localStorage('ca_lang')`.
- Static data in `/data/coinData.js` (COUNTRIES, TIMELINE, MINTS, RECENT_COINS).
- Premium dark CSS design tokens in `/App.css` (`--ca-*`).
- No backend wired (template `/api/` route untouched).

## Implemented (2026-06-18)
- Navigation: transparent at top, dark glass + blur on scroll, mobile drawer overlay.
- Hero: full-screen, large circular coin, floating animation, gold halo, hero copy, two CTAs, scroll indicator.
- Manifesto: large editorial centered statement with italic gold accent.
- Featured Story: magazine 2-column layout with large coin + narrative.
- Countries gallery: 6 cards (DE/FR/IT/ES/AT/BE) with hover lift + glow.
- Timeline: interactive 8-step horizontal track (vertical on mobile) with gold progress bar; active year updates featured panel.
- Mint marks: museum-style 5-column exhibit (A, D, F, G, J).
- Stats: animated count-up via IntersectionObserver — 650+ coins / 20+ countries / 20+ years.
- Recently Catalogued: 6 compact coin cards.
- Contribute: gold-glow CTA section with "Submit Coin" / "Münze einreichen".
- Footer: 3 link columns, brand, copyright.
- EN/DE language switch wired across every visible string.
- Accessibility: visible gold focus ring, `prefers-reduced-motion` honored, semantic landmarks, alt text on all images, no horizontal overflow on mobile.

## Validated
- testing_agent_v3 iteration_1: 100% frontend pass (all sections, testids, language toggle, persistence, responsiveness, image loads, no console errors).

## Backlog
- P0 — connect to backend (Mongo + FastAPI) for real coins, countries, search.
- P0 — replace placeholder stock photography with authentic 2 Euro commemorative coin imagery (user to provide).
- P1 — dedicated routes: /coins, /countries, /countries/:code, /coins/:id, /series, /learn.
- P1 — "Submit Coin" form with image upload + admin review queue.
- P2 — search overlay (Cmd-K), favorites/account, watchlists, email subscription, RSS feed.
- P2 — coin detail page with obverse/reverse toggle, mintage, designer, references, related coins.

## Next tasks
1. Wire backend models (Coin, Country, Series, Mint, Submission) and seed data.
2. Build /coins listing with filters (country, year, series, mint).
3. Submit-Coin form posting to `/api/contributions` with image upload.
