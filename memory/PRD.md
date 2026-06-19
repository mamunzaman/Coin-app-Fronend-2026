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
- iteration_6 (2026-02-19, polish pass): 100% frontend pass. All routes load, no horizontal overflow on desktop/tablet/mobile, new Coin Detail editorial layout fully verified, skeleton loaders verified (~30 shimmer elements detected ~150ms, replaced by ~1050ms), navbar typography spec matches (Inter 12px 0.22em 500 uppercase), mobile menu Playfair 24px serif, filter chips horizontally scrollable on mobile, section padding reduced ~30% (clamp(80,12vw,160) → clamp(56,8vw,104)), ca-stagger + ca-float animations wired, sticky filter works, all data-testids preserved.

## Implemented (2026-02-19) — Editorial layout + premium skeletons + polish pass
- Rewrote `CoinDetail.jsx` with asymmetric editorial layout: hero (image+toggle left / eyebrow+title+lede+gold-divider+6-fact-grid+submit-button right) → i. Historical Background (centered prose, gold drop-cap) → ii. Gallery (4-thumb strip) → iii. Specifications (3-col data grid) → iv. More from this country (4-card bottom strip).
- Created `Skeleton.jsx` primitives (Skeleton, SkeletonText, SkeletonCircle, SkeletonImage) + composed skeletons (SkeletonCoinCard, SkeletonCountryCard, SkeletonSeriesCard, SkeletonStat, SkeletonCoinDetail) using subtle dark + gold-tinted shimmer CSS that respects prefers-reduced-motion.
- Created `useArtificialLoad.js` hook (420-450ms loading flag).
- Wired skeleton states into CoinsListing, CountriesPage, SeriesPage, CountryDetail, SeriesDetail, CoinDetail.
- Fixed `useScrollReveal` to re-scan when a passed dependency (e.g. loading) flips — previously hero content was invisible after skeleton swap.
- Reduced `.ca-section` padding by ~30% (clamp(80,12vw,160) → clamp(56,8vw,104)), tightened `.ca-coins-header` (140→104), `.ca-section-id` margin-bottom (36→28).
- Refined nav typography: Inter, 12px, font-weight 500, letter-spacing 0.22em, uppercase. Polished mobile menu to Playfair Display ~24-30px with gold hover + left-padding shift.
- Added CSS-only animation system: `.ca-stagger > *` for grid stagger, `.ca-float` for gentle 7.5s hero coin floating, `caPageIn` for soft fade-in on every route mount. All respect prefers-reduced-motion.
- Mobile responsive overrides: tighter coin detail mobile (smaller image, smaller title, smaller drop-cap), horizontally scrollable filter chips, larger touch targets on buttons, sticky filter offset adjusted for mobile navbar.
- WordPress API readiness audit doc at `/app/memory/WP_FIELD_MAPPING.md`.

## Backlog
- P0 — (DEFERRED by user) connect to WordPress Headless REST API. Mapping doc ready.
- P1 — Apply skeleton loaders to homepage sections (Stats, Recent, Timeline) for consistency.
- P1 — Account modal / login UI.
- P1 — "Submit Coin" form posting to API once backend exists.
- P2 — OG/social meta tags + SEO meta descriptions per route.
- P2 — Search overlay improvements (recent searches, keyboard nav), watchlists.

## Next tasks
1. (When user is ready) WordPress REST API integration using existing field mapping.
2. Homepage section skeletons (Stats / Recent / Timeline).
3. Account modal / auth UI.
