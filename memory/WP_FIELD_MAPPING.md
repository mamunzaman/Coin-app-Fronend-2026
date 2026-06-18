# WordPress ↔ CoinArchive Frontend — Field Mapping Document

*Version 1.0 · Audit only. No code changes.*

This document is the single source of truth for the eventual API integration.
Every frontend field listed here matches a property currently consumed by a
React component. The "→" column states the exact transform the normalizer
must perform when building the frontend object from a WordPress REST payload.

---

## 1. `coin` CPT — full field mapping

### 1.1 Core WordPress post fields

| Frontend field | WP source | REST path | Transform | Required |
|---|---|---|---|---|
| `coin.id` | `wp_posts.ID` | `id` | direct number | yes |
| `coin.slug` | `wp_posts.post_name` | `slug` | direct string | yes |
| `coin.title.<lang>` | `wp_posts.post_title` + Polylang translation post | `title.rendered` | strip HTML; per-locale fetch and merge | yes |
| (internal) `wpStatus` | `wp_posts.post_status` | `status` | only `publish` reaches frontend | yes |
| (internal) `wpModified` | `wp_posts.post_modified_gmt` | `modified_gmt` | ISO 8601 — drives "last updated" footer line on detail page | optional |

### 1.2 Taxonomies attached to the CPT

| Frontend field | WP taxonomy | REST surface | Transform | Required |
|---|---|---|---|---|
| `coin.country` (human name) | `coin_country` | `_embedded["wp:term"][n][0].name` | direct (lang-aware) | yes |
| `coin.countryCode` | `coin_country` slug **OR** ACF `coin_country_code` | term `slug` uppercased, or ACF | uppercase + 2-letter ISO check | yes |
| `coin.coinType.<lang>` | `coin_type` | embedded term name | per-locale | yes |
| `coin.value` (display) | `coin_value` | embedded term name | format with currency symbol | yes |
| `coin.series.<lang>` | `coin_series` | embedded term name | per-locale | yes |
| `coin.seriesSlug` | `coin_series` slug | embedded term slug | direct | yes |

### 1.3 ACF fields

| Frontend field | ACF key | ACF type | Transform | Required |
|---|---|---|---|---|
| `coin.catalogCode` *(new)* | `coin_code` | text | render as mono label "Cat. #" on detail | yes |
| `coin.countryCode` | `coin_country_code` | text (2 chars) | uppercase; sanity-check against taxonomy slug | yes |
| `coin.year` | `coin_year` | number | cast to integer | yes |
| `coin.shortDescription.<lang>` | `coin_short_description` | textarea | per-locale | yes |
| `coin.designer` | `coin_designer` | text or relationship | if array → join with " · " | yes |
| `coin.theme` *(new)* | `coin_theme` | text | shown as chip on detail under series | optional |
| `coin.releaseDate` | `released_date` | date_picker | normalize to `YYYY-MM-DD` (UTC) | yes |
| `coin.issueStatus` *(new)* | `coin_issue_status` | select (`announced`/`released`/`featured`/`limited`) | drives `isFeatured` + badge color | optional |
| `coin.mintage` | `coin_mintage` | number | integer; null if unknown | yes |
| `coin.specifications.composition` | `coin_material` | text | direct | yes |
| `coin.quality` *(new)* | `coin_quality` | select (`BU`/`Proof`/`Circulation`) | display chip next to mintage | optional |
| `coin.specifications.weight` | `coin_weight_g` | number | format `${val} g` (locale-aware decimal) | yes |
| `coin.specifications.diameter` | `coin_diameter_mm` | number | format `${val} mm` | yes |
| `coin.specifications.thickness` | `coin_thickness_mm` | number | format `${val} mm` | yes |
| `coin.specifications.edge.<lang>` | `coin_edge_inscription` | text | per-locale | yes |
| `coin.obverseDescription.<lang>` *(new)* | `coin_obverse_description` | textarea | shown when Obverse selected | optional |
| `coin.reverseDescription.<lang>` *(new)* | `coin_reverse_description` | textarea | shown when Reverse selected | optional |
| `coin.historicalBackground.<lang>` | `coin_historical_background` | wysiwyg | split by `<p>` or `\n\n` into paragraph array | yes |
| `coin.collectorNotes.<lang>` *(new)* | `coin_collector_notes` | textarea | collapsible "Collector notes" block | optional |
| `coin.obverseImage` | `coin_image_obverse_id` | image (ID) | resolve via `/wp/v2/media/{id}` or `_embed` | yes |
| `coin.reverseImage` | `coin_image_reverse_id` | image (ID) | same | yes |
| `coin.gallery[]` | `coin_gallery_ids` | gallery (array of IDs) | batch resolve | optional |
| `coin.hasMintVariants` *(new)* | `coin_has_mint_variants` | true/false | controls per-mint badge on listing | optional |
| `coin.mint` | `coin_mint_mark` | text (1 char) | "A"/"D"/"F"/"G"/"J" or null | optional |
| `coin.mintMarks[]` | `coin_mint_marks_available` | checkbox/array | array of letters | optional |
| `coin.mintVariants[]` *(new)* | `coin_mint_variants` | repeater | array of `{ letter, mintage, image_id }` for per-mint rows | optional |

### 1.4 Derived (computed by the normalizer)

| Frontend field | Computation |
|---|---|
| `coin.isNew` | `releaseDate >= now() - 90 days` |
| `coin.isRare` | `mintage < 1_000_000` OR `coin_issue_status === "limited"` |
| `coin.isFeatured` | `coin_issue_status === "featured"` |
| `coin.platePosition` | server-side stable index across all coins ordered by `releaseDate ASC` (recommended: cache in ACF Options or compute once per request) |

### 1.5 Frontend fields with **no** WP source today

| Field | Action |
|---|---|
| `coin.country` (legacy duplicate of countryCode) | Drop — components have already migrated to `countryCode + findCountry` |
| `coin.flag` (emoji) | Keep static — emoji is derived from ISO code on the client |

---

## 2. `coin_country` taxonomy — full field mapping

WordPress stores one term per country. The frontend `Country` object is built
from the term + extra ACF fields attached to the term.

### 2.1 Core term fields

| Frontend field | WP source | REST | Transform | Required |
|---|---|---|---|---|
| `country.code` | term `slug` | `slug` | uppercase | yes |
| `country.name.<lang>` | term `name` + Polylang translation | `name` | per-locale | yes |
| (internal) `term_id` | term `term_id` | `id` | used for filter queries | yes |
| `country.count` | `count` | `count` | how many `coin` posts are linked | yes |

### 2.2 ACF fields on the term (must be added)

| Frontend field | ACF key (**new**) | ACF type | Transform |
|---|---|---|---|
| `country.capital` | `country_capital` | text | direct |
| `country.since` | `country_since_year` | number | integer (typically 2002) |
| `country.blurb.<lang>` | `country_blurb` | textarea | per-locale |
| `country.featured` | `country_featured_coin_id` | post object (Coin) | resolve to slug for link, resolve coin's `obverseImage` for thumbnail |
| `country.accent` *(optional)* | `country_accent_color` | color picker | hex string, defaults to gold |

### 2.3 Frontend-only / static

| Field | Source |
|---|---|
| `country.flag` | client lookup table by ISO code |
| `MINTS` (5 German mint records with `letter`, `city`, `coord`) | stays static — world facts, no CMS field needed |

---

## 3. `coin_series` taxonomy — full field mapping

### 3.1 Core term fields

| Frontend field | WP source | REST | Transform | Required |
|---|---|---|---|---|
| `series.slug` | term `slug` | `slug` | direct | yes |
| `series.name.<lang>` | term `name` + translation | `name` | per-locale | yes |
| (internal) `term_id` | term `term_id` | `id` | used for filter queries | yes |
| `series.totalIssued` | `count` | `count` | how many coins linked (for "X coins in series") | yes |

### 3.2 ACF fields on the term (must be added)

| Frontend field | ACF key (**new**) | ACF type | Transform |
|---|---|---|---|
| `series.description.<lang>` | `series_description` | wysiwyg | per-locale, strip HTML for grid card |
| `series.country` | `series_country` | taxonomy (`coin_country`) — single | if null → "Joint Issue" |
| `series.accent` | `series_accent_color` | color picker | hex |
| `series.startYear` *(optional)* | `series_start_year` | number | falls back to MIN(coin years) if absent |
| `series.endYear` *(optional)* | `series_end_year` | number | falls back to MAX(coin years), "Present" if open-ended |
| `series.featured` | `series_featured_coin_id` | post object | for hero image on series detail |

### 3.3 Computed by the service layer

| Field | Computation |
|---|---|
| `series.range` | `${startYear} — ${endYear || "Present"}` |
| `series.count` | `count` (term count) — same as `totalIssued` |

---

## 4. Media handling

### 4.1 Resolution strategies (pick one per endpoint)

| Strategy | Pros | Cons | Use for |
|---|---|---|---|
| **A. `?_embed=true`** | One round-trip; image URLs inline | Large response; embeds featured-media only — *not* ACF image fields | Detail page where coin already loads with `_embed` |
| **B. Batch fetch** `/wp/v2/media?include=12,34,56` | Single round-trip per page of coins | Requires collecting IDs from first response then second fetch | Listing grid (many coins, each with obverse only) |
| **C. ACF "Return format = Object"** | URLs returned directly inside ACF response | Larger ACF payload; coupled to CMS setting | Recommended global setting — eliminates all secondary fetches |

**Recommendation:** set ACF return format to **Object** for *all* image fields.
This single CMS change eliminates ~90% of round-trips.

### 4.2 Frontend image shape (post-normalizer)

```ts
type CoinImage = {
  url: string;           // canonical large URL
  srcset?: string;       // "url 480w, url 800w, url 1200w"
  sizes?: string;        // e.g. "(max-width: 768px) 100vw, 50vw"
  alt: string;           // ACF alt OR media library alt OR coin.title — never empty
  width?: number;
  height?: number;
  focal?: { x: number; y: number };   // optional; if WP focal-point plugin in use
};
```

### 4.3 Responsive URL strategy

| Breakpoint | Width | WP size key | Use |
|---|---|---|---|
| Small thumb | 480 px | `medium` | Listing grid, Recent cards, gallery thumbs |
| Card / hero phone | 800 px | `large` | Country card monogram backdrop, mobile hero |
| Hero desktop / detail | 1200 px | `coin_large` (**new**, must register in functions.php) | Coin detail page, hero coin |
| Source / zoom | 2000 px | `full` | Coin detail high-res view, future zoom feature |

### 4.4 Alt text policy

| Priority | Source | Fallback |
|---|---|---|
| 1 | Media library "Alternative Text" field | — |
| 2 | ACF `image_alt_<en/de>` on attachment (if defined) | — |
| 3 | `coin.title.<lang>` + side ("Obverse" / "Reverse") | required final fallback |

The normalizer **must** never emit `alt=""`. Empty alt is reserved only for
purely decorative images (which we have none of).

### 4.5 Fallback for missing images

```ts
const FALLBACK_COIN_IMAGE = "/static/coin-fallback.svg";   // ship in /public
```

Used when `coin_image_obverse_id` is null or the media post is deleted.
The SVG must be a neutral dark-gold coin silhouette matching the design
system, no text, 1:1 aspect.

---

## 5. Search

### 5.1 Endpoint contract

The frontend `searchArchive(query, filters)` will call a **custom REST route**
(recommended) or the default `/wp/v2/coin` with `?search=`. The custom route
gives ranking control.

```
GET /wp-json/coinarchive/v1/search?q=<query>&country=DE&year=2019&mint=A&lang=en&per_page=12
```

### 5.2 Required query parameters

| Param | Type | Maps from | Notes |
|---|---|---|---|
| `q` | string | `query` | free text, min 1 char |
| `country` | 2-letter code | `filters.country` | translated server-side to `coin_country` term ID |
| `year` | YYYY | `filters.year` | ACF meta query on `coin_year` |
| `mint` | A/D/F/G/J | `filters.mint` | ACF meta query on `coin_mint_mark` |
| `series` | term slug | `filters.series` | translated to `coin_series` term ID |
| `value` | term slug | `filters.value` | rarely used by current UI |
| `lang` | en / de | language context | controls which translation post to return |
| `per_page` | number | pagination | default 12 |
| `page` | number | pagination | 1-based |
| `sort` | enum (`newest`/`oldest`/`country`/`rarity`) | UI sort | server-side ORDER BY |

### 5.3 Required response headers

| Header | Purpose |
|---|---|
| `X-WP-Total` | total result count, drives "X coins" badge |
| `X-WP-TotalPages` | drives pagination / load-more |
| `X-Search-Took-Ms` *(optional)* | drives a subtle "Search in 42 ms" indicator |

### 5.4 Per-result body

Each search result is a **lean coin** (not the full Coin object) optimised
for the SearchOverlay row:

```ts
type SearchResult = {
  slug: string;
  title: string;            // in requested lang
  countryCode: string;
  year: number;
  mint: string | null;
  series: string;           // in requested lang
  designer: string;
  obverseImage: { url: string; alt: string };
  // matched snippet (optional, future enhancement)
  highlight?: string;
};
```

### 5.5 Ranking weights (recommended for the custom route)

| Field | Weight |
|---|---|
| Title exact match | 100 |
| Title prefix match | 60 |
| Title token match | 30 |
| Designer match | 15 |
| Historical background match | 10 |
| Country code / year exact | 25 |
| Series name match | 12 |

### 5.6 Faceting

| Facet | Source | Returned as |
|---|---|---|
| `countries` | unique `coin_country` terms in result set | `{ code, name, count }[]` |
| `years` | unique `coin_year` values | `{ year, count }[]` |
| `series` | unique `coin_series` terms | `{ slug, name, count }[]` |

Facets enable future "filter chips with counts" enhancement.

---

## 6. Statistics (home page numbers + Country / Series detail panels)

### 6.1 What the UI shows today

| Place | Number | Current source |
|---|---|---|
| Home Stats — "650+ Coins" | total catalogued | hard-coded constant |
| Home Stats — "20+ Countries" | distinct member states | hard-coded |
| Home Stats — "20+ Years" | years of coverage | hard-coded |
| Home Contribute card — "247 contributors / +12 this week / 651 coins" | hard-coded |
| Country Detail stats panel — Coins / Years / Series | derived from in-memory list |
| Series Detail meta line — "X / Y coins" | derived from in-memory list |
| Filter bar "X coins" badge | derived from filtered list length |

### 6.2 Recommended WordPress source

A single lightweight custom REST route:

```
GET /wp-json/coinarchive/v1/stats
```

returns:

```json
{
  "coins_total": 651,
  "coins_by_country": { "DE": 78, "FR": 41, "IT": 38, "ES": 34, "AT": 22, "BE": 29 },
  "coins_by_year":    { "2025": 18, "2024": 22, "2023": 35, ... },
  "coins_by_series":  { "german-federal-states": 16, "olympics": 7, ... },
  "countries_total": 20,
  "years_total": 22,
  "contributors_total": 247,
  "contributors_this_week": 12,
  "last_updated": "2026-12-19T08:24:00Z"
}
```

### 6.3 Caching

This stats endpoint must be cached for 5–15 minutes (transient or full-page
cache). It is queried on every home load and country/series detail visit;
without caching it will dominate WP query time.

### 6.4 Field-by-field mapping

| Frontend stat | API field | Format |
|---|---|---|
| Home stat `coins` (650+) | `coins_total` | floor to nearest 50, render with `+` suffix |
| Home stat `countries` (20+) | `countries_total` | exact + `+` suffix |
| Home stat `years` (20+) | `years_total` | exact + `+` suffix |
| Home contribute card "247 contributors" | `contributors_total` | exact |
| Home contribute card "+12 this week" | `contributors_this_week` | exact |
| Home contribute card "651 coins catalogued" | `coins_total` | exact |
| Country Detail "Coins" | `coins_by_country[code]` | exact |
| Country Detail "Years" | derived from `coins_by_year` filtered by country (needs server-side join) | exact |
| Country Detail "Series" | derived from `coins_by_series` filtered by country | exact |
| Series Detail "X of Y" | `coins_by_series[slug]` / WP term count | exact |
| Listing badge "X coins" | `X-WP-Total` from `/coin` endpoint | exact |

### 6.5 Per-country and per-series stats — endpoint variants

To keep `/stats` lean, two scoped endpoints:

```
GET /wp-json/coinarchive/v1/stats/country/{code}
→ { coins_total, years_total, series_total, by_year, by_series, year_range }

GET /wp-json/coinarchive/v1/stats/series/{slug}
→ { coins_total, total_in_canon, by_country, by_year, year_range }
```

`total_in_canon` is editorial — e.g. German Federal States canonically has
16 coins; we may only have catalogued 14. This is needed for the
"14 of 16 coins" display.

To support `total_in_canon`, add a new ACF field:

| ACF key (**new**) | Where | Type |
|---|---|---|
| `series_canonical_count` | `coin_series` term | number |

If `series_canonical_count` is null, the UI falls back to `series.count`.

---

## 7. Missing CMS fields — single consolidated list

Adding these fields to WordPress is the **prerequisite work** before
implementation begins.

### 7.1 On the `coin` CPT (add via ACF group "Coin — extended")

| ACF key | Type | Purpose | UI consumer |
|---|---|---|---|
| `coin_obverse_description` | textarea (per-locale) | description shown when Obverse selected | CoinDetail toggle |
| `coin_reverse_description` | textarea (per-locale) | description shown when Reverse selected | CoinDetail toggle |
| `coin_collector_notes` | textarea (per-locale) | collapsible block on detail | CoinDetail |
| `coin_plate_number` | number | stable plate index | CoinDetail "Plate 001" |

### 7.2 On the `coin_country` taxonomy term

| ACF key | Type | Purpose | UI consumer |
|---|---|---|---|
| `country_capital` | text | capital city display | CountriesPage card, CountryDetail hero |
| `country_since_year` | number | year of euro adoption | CountriesPage card meta |
| `country_blurb` | textarea (per-locale) | editorial blurb | CountriesPage card, CountryDetail hero |
| `country_featured_coin_id` | post object (Coin) | featured coin for the country card | CountriesPage |
| `country_accent_color` *(optional)* | color picker | per-country accent | CountryDetail hero |

### 7.3 On the `coin_series` taxonomy term

| ACF key | Type | Purpose | UI consumer |
|---|---|---|---|
| `series_description` | wysiwyg (per-locale) | full description | SeriesPage card, SeriesDetail hero |
| `series_country` | taxonomy (single) | which country if any | SeriesPage meta, filter chip |
| `series_accent_color` | color picker | series accent stripe | SeriesPage card |
| `series_start_year` *(optional)* | number | start year override | SeriesDetail meta |
| `series_end_year` *(optional)* | number | end year override / "Present" | SeriesDetail meta |
| `series_featured_coin_id` | post object | featured coin | SeriesDetail hero |
| `series_canonical_count` | number | total in canon (e.g. 16) | SeriesDetail "14 of 16" |

### 7.4 On the Media library (attachment)

| ACF key | Type | Purpose | UI consumer |
|---|---|---|---|
| `image_alt_en` | text | English alt override | normalizer fallback chain |
| `image_alt_de` | text | German alt override | normalizer fallback chain |

These two are optional — the Media library's built-in "Alternative Text"
already covers single-locale alt. They are only needed if WP runs
single-locale and we want bilingual alt text.

### 7.5 ACF Options page (new — "Site Settings")

| ACF key | Type | Purpose | UI consumer |
|---|---|---|---|
| `home_hero_coin_id` | post object | which coin appears in the hero | Hero |
| `home_featured_coin_id` | post object | which coin is the home "Featured Story" | FeaturedStory |
| `home_timeline_items` | repeater (year, country, coin) | curated home timeline | Timeline section |

### 7.6 Custom REST routes (must be registered in WP)

| Route | Purpose |
|---|---|
| `GET /wp-json/coinarchive/v1/search` | weighted search (see §5) |
| `GET /wp-json/coinarchive/v1/stats` | global counters (see §6) |
| `GET /wp-json/coinarchive/v1/stats/country/{code}` | country counters |
| `GET /wp-json/coinarchive/v1/stats/series/{slug}` | series counters |
| `POST /wp-json/coinarchive/v1/submissions` | accept Submit-Coin form |

### 7.7 Global CMS configuration decisions

| Decision | Recommended | Why |
|---|---|---|
| ACF "Return Format" for all image / gallery fields | **Object** | Eliminates secondary `/media` fetches |
| Locale plugin | **Polylang** (term + post translations) | Free, well-supported, simpler than WPML for this scope |
| Custom image size `coin_large` (1200 px) | register in `functions.php` | Drives hero / detail responsive image |
| Yoast (or RankMath) SEO plugin | install | provides title + description + OG fields per coin (Phase 8) |
| Application Passwords | enable | required for `POST /submissions` (or use a public nonce route) |
| CORS — `Access-Control-Allow-Origin` for SPA origin | enable via filter `rest_pre_serve_request` | Day-1 requirement |

---

## 8. Mapping completeness summary

| Area | Frontend fields | Mappable now | Need new ACF | Need REST route |
|---|---|---|---|---|
| Coin core | 24 | 19 | 4 | 0 |
| Country | 8 | 3 | 5 | 0 |
| Series | 7 | 2 | 5 | 0 |
| Media | n/a | yes | 0 (with ACF Object format) | 0 |
| Search | endpoint | partial via `/wp/v2/coin` | 0 | 1 (custom search) |
| Stats | 7 numbers | none | 1 (`series_canonical_count`) | 4 |
| Submissions | endpoint | 0 | 0 | 1 |

**Total new ACF fields required: 15** (4 on coin, 5 on country, 5 on series, 1 on media optional, plus 3 on options page).
**Total new REST routes required: 5** (search, 3 stats variants, submissions).

---

## 9. Open questions that block normalizer implementation

1. **Locale plugin choice** — Polylang or WPML or single-locale-with-both-fields?
2. **ACF return format** for image and gallery fields — Object (recommended) or ID?
3. **Designer cardinality** — single string or array? If array, is order meaningful?
4. **`released_date` timezone** — stored as Europe/Berlin date or UTC?
5. **`coin_mintage` for joint issues** — total across countries, or per-country, or both?
6. **Submission moderation flow** — does the POST endpoint create a draft `coin` post, or a separate `coin_submission` CPT?
7. **Authentication for submissions** — Application Password, nonce, or anonymous?
8. **Image hosting** — CDN in front of `/wp-content/uploads` or direct?

Answers to these eight unblock the entire Phase 0 + 1 + 2 service-layer build.

---

*End of document.*
