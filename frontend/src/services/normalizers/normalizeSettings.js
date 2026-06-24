import { normalizeMedia } from "./normalizeMedia";
import { TIMELINE } from "@/data/coinData";

export function pickLocalized(value, lang = "en") {
  if (value == null || value === "") return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return value[lang] || value.en || value.de || "";
}

function pickText(...candidates) {
  for (const c of candidates) {
    if (c == null || c === "") continue;
    if (typeof c === "string" && c.trim()) return c.trim();
    if (typeof c === "number") return String(c);
  }
  return "";
}

function normalizeButton(raw) {
  if (!raw || typeof raw !== "object") return null;
  const text = pickText(raw.text, raw.label, raw.title);
  const url = pickText(raw.url, raw.link, raw.href);
  if (!text || !url) return null;
  return { text, url };
}

function normalizeLink(raw) {
  if (!raw) return null;
  if (typeof raw === "string") {
    const url = raw.trim();
    return url ? { label: url, url, menuNumber: "", openInNewTab: false } : null;
  }
  const label = pickText(raw.label, raw.text, raw.title, raw.name, raw.menu_label);
  const url = pickText(raw.url, raw.link, raw.href, raw.menu_url);
  if (!label || !url) return null;
  return {
    label,
    url,
    menuNumber: pickText(raw.menu_number, raw.menuNumber, raw.num),
    openInNewTab: raw.open_in_new_tab === true || raw.openInNewTab === true,
  };
}

function normalizeArchiveOverviewCard(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;

  const icon = pickText(raw.icon, raw.card_icon);
  const eyebrow = pickText(raw.eyebrow, raw.card_eyebrow, raw.label, raw.subtitle);
  const title = pickText(raw.title, raw.card_title, raw.name, raw.heading);
  const text = pickText(raw.text, raw.card_text, raw.description, raw.desc, raw.excerpt, raw.body);
  const buttonText = pickText(raw.button_text, raw.card_button_text, raw.cta, raw.buttonText, raw.link_text);
  const buttonUrl = pickText(raw.button_url, raw.card_button_url, raw.url, raw.link, raw.href, raw.to);

  if (!icon && !eyebrow && !title && !text && !buttonText && !buttonUrl) return null;

  const key = pickText(raw.key, raw.slug, icon) || `archive-card-${index}`;

  return {
    key,
    icon,
    eyebrow,
    title,
    text,
    button_text: buttonText,
    button_url: buttonUrl,
  };
}

function normalizeCollectorEducationCard(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;

  const icon = pickText(raw.icon, raw.card_icon);
  const eyebrow = pickText(raw.eyebrow, raw.card_label, raw.card_eyebrow, raw.label, raw.subtitle);
  const title = pickText(raw.title, raw.card_title, raw.name, raw.heading);
  const text = pickText(raw.text, raw.card_description, raw.description, raw.desc, raw.excerpt, raw.body);
  const buttonText = pickText(raw.button_text, raw.card_button_text, raw.cta, raw.buttonText, raw.link_text);
  const buttonUrl = pickText(raw.button_url, raw.card_button_url, raw.url, raw.link, raw.href, raw.to);

  if (!icon && !eyebrow && !title && !text && !buttonText && !buttonUrl) return null;

  const key = pickText(raw.key, raw.slug, icon) || `learning-card-${index}`;

  return {
    key,
    icon,
    eyebrow,
    title,
    text,
    button_text: buttonText,
    button_url: buttonUrl,
  };
}

function normalizeArchiveQualityCard(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;

  const num = pickText(raw.num, raw.number, raw.card_number, raw.section_number);
  const title = pickText(raw.title, raw.card_title, raw.name, raw.heading);
  const body = pickText(raw.body, raw.card_description, raw.description, raw.desc, raw.text);

  if (!num && !title && !body) return null;

  return {
    num: num || String(index + 1).padStart(2, "0"),
    title,
    body,
  };
}

function normalizeCard(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;
  const title = pickText(raw.title, raw.name, raw.heading);
  const desc = pickText(raw.description, raw.desc, raw.excerpt, raw.body);
  const url = pickText(raw.url, raw.link, raw.href, raw.to);
  const eyebrow = pickText(raw.eyebrow, raw.label, raw.subtitle);
  const cta = pickText(raw.cta, raw.button_text, raw.buttonText, raw.link_text);
  const key = pickText(raw.key, raw.slug, raw.id) || `card-${index}`;
  if (!title && !desc) return null;
  return {
    key,
    title: pickLocalized(raw.title, "en") || title,
    titleLocalized: typeof raw.title === "object" ? raw.title : { en: title, de: title },
    desc: pickLocalized(raw.description ?? raw.desc, "en") || desc,
    descLocalized: typeof (raw.description ?? raw.desc) === "object"
      ? (raw.description ?? raw.desc)
      : { en: desc, de: desc },
    eyebrow,
    cta: cta || "View",
    to: url || "/",
    url: url || "/",
  };
}

function normalizePillar(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;
  const title = pickText(raw.title, raw.name, raw.heading);
  const body = pickText(raw.body, raw.description, raw.desc, raw.text);
  if (!title && !body) return null;
  return {
    num: pickText(raw.num, raw.number, raw.section_number) || String(index + 1).padStart(2, "0"),
    title,
    body,
    titleLocalized: typeof raw.title === "object" ? raw.title : { en: title, de: title },
    bodyLocalized: typeof (raw.body ?? raw.description) === "object"
      ? (raw.body ?? raw.description)
      : { en: body, de: body },
  };
}

function normalizeMilestone(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;
  const year = Number(raw.year);
  if (!year) return null;

  const title = pickText(raw.featured_coin_title, raw.title, raw.coin_title);
  const label = pickText(raw.label, raw.subtitle, raw.eyebrow);
  const country = pickText(raw.country, raw.country_name, raw.nation);
  const img = normalizeMedia(raw.featured_coin_image ?? raw.image ?? raw.coin_image ?? raw.img);
  const extraDescription = pickText(raw.extra_description, raw.description, raw.body);
  const button = normalizeButton({
    text: raw.button_text,
    url: raw.button_url,
  });

  return {
    year,
    country: country || "Europe",
    title: typeof raw.featured_coin_title === "object"
      ? raw.featured_coin_title
      : { en: title || `Milestone ${year}`, de: title || `Meilenstein ${year}` },
    label: typeof raw.label === "object"
      ? raw.label
      : { en: label || String(year), de: label || String(year) },
    img: img || TIMELINE[Math.min(index, TIMELINE.length - 1)]?.img || "",
    extraDescription,
    buttonText: button?.text || "",
    buttonUrl: button?.url || `/coins?year=${year}`,
  };
}

function normalizeMintMarkCard(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;

  const letter = pickText(raw.code, raw.letter, raw.mark, raw.mint_mark, raw.card_letter);
  const city = pickText(raw.mint_city, raw.city, raw.card_city, raw.name, raw.title);
  const note = pickText(raw.mint_name, raw.note, raw.label, raw.card_label, raw.institution);
  const description = pickText(raw.mint_description, raw.description, raw.desc);

  if (!letter && !city && !note && !description) return null;

  return {
    letter: letter ? letter.toUpperCase() : "",
    city,
    note: note || "",
    description: description || "",
  };
}

function normalizeContributorInitials(raw) {
  const rows = Array.isArray(raw) ? raw : [];
  return rows
    .map((row) => {
      if (typeof row === "string") return row.trim();
      if (!row || typeof row !== "object") return "";
      return pickText(row.initials, row.initial, row.label, row.text);
    })
    .filter(Boolean);
}

function normalizeContributeStats(raw = {}) {
  const statsRaw = raw.stats ?? {};
  const contributors = Number(statsRaw.contributors);
  const weeklyActivity = Number(statsRaw.weeklyActivity ?? statsRaw.weekly_activity ?? statsRaw.this_week);
  const coinsCatalogued = Number(statsRaw.coinsCatalogued ?? statsRaw.coins_catalogued);

  return {
    contributors: Number.isFinite(contributors) ? contributors : null,
    weeklyActivity: Number.isFinite(weeklyActivity) ? weeklyActivity : null,
    coinsCatalogued: Number.isFinite(coinsCatalogued) ? coinsCatalogued : null,
  };
}

function normalizeContributeStatsCard(raw = {}) {
  const statsRaw = raw.stats_card ?? raw.statsCard ?? {};

  return {
    statsCardLabel: pickText(
      raw.stats_card_label,
      raw.statsCardLabel,
      statsRaw.stats_card_label,
      statsRaw.statsCardLabel,
      statsRaw.label,
    ),
    contributorInitials: normalizeContributorInitials(
      raw.contributor_initials ?? raw.contributorInitials ?? statsRaw.contributor_initials ?? statsRaw.contributorInitials,
    ),
    weeklyActivityLabel: pickText(
      raw.weekly_activity_label,
      raw.weeklyActivityLabel,
      statsRaw.weekly_activity_label,
      statsRaw.weeklyActivityLabel,
    ),
    contributorsLabel: pickText(
      raw.contributors_label,
      raw.contributorsLabel,
      statsRaw.contributors_label,
      statsRaw.contributorsLabel,
    ),
    coinsCataloguedLabel: pickText(
      raw.coins_catalogued_label,
      raw.coinsCataloguedLabel,
      statsRaw.coins_catalogued_label,
      statsRaw.coinsCataloguedLabel,
    ),
  };
}

function normalizeSectionMeta(raw = {}) {
  return {
    is_visible: raw.is_visible !== false && raw.isVisible !== false,
    sectionNumber: pickText(raw.section_number, raw.sectionNumber, raw.num),
    sectionLabel: pickText(raw.section_label, raw.sectionLabel, raw.label, raw.eyebrow),
    countLabel: pickText(raw.count_label, raw.countLabel, raw.right_label, raw.meta, raw.count),
    title: pickText(raw.title, raw.section_title, raw.heading),
    description: pickText(raw.description, raw.section_description, raw.desc, raw.sub, raw.body),
    rightLabel: pickText(raw.right_label, raw.section_right_label, raw.rightLabel, raw.meta_right),
    titleLocalized: typeof raw.title === "object" ? raw.title : null,
    descriptionLocalized: typeof (raw.description ?? raw.desc) === "object"
      ? (raw.description ?? raw.desc)
      : null,
  };
}

function normalizeFeaturedStoryCoin(raw) {
  if (!raw || typeof raw !== "object") return null;

  const title = pickText(raw.title, raw.coin_title, raw.name);
  const obverseUrl = normalizeMedia(raw.obverseImage ?? raw.obverse_image);
  const reverseUrl = normalizeMedia(raw.reverseImage ?? raw.reverse_image);
  const url = pickText(raw.url, raw.link, raw.coin_url);

  if (!title && !obverseUrl && !reverseUrl) return null;

  const mintage = raw.mintage;
  return {
    title,
    country: pickText(raw.country, raw.country_name, raw.countryName),
    year: pickText(raw.year, raw.coin_year),
    designer: pickText(raw.designer, raw.coin_designer),
    mintage: mintage != null && mintage !== "" ? String(mintage) : "",
    diameter: pickText(raw.diameter, raw.coin_diameter),
    weight: pickText(raw.weight, raw.coin_weight),
    material: pickText(raw.material, raw.composition, raw.coin_material),
    shortDescription: pickText(raw.shortDescription, raw.short_description, raw.desc),
    historicalBackground: pickText(raw.historicalBackground, raw.historical_background),
    obverseImageUrl: obverseUrl,
    reverseImageUrl: reverseUrl,
    url,
  };
}

function normalizeFeaturedStory(raw = {}) {
  return {
    ...normalizeSectionMeta(raw),
    coin: normalizeFeaturedStoryCoin(raw.coin ?? raw.featured_coin),
  };
}

export function normalizeHomepageSettings(raw) {
  if (!raw || typeof raw !== "object") {
    return { source: "mock" };
  }

  const heroRaw = raw.hero || {};
  const quoteRaw = raw.quote || raw.manifesto || {};
  const archiveRaw = raw.archive_overview || raw.archiveOverview || {};
  const learningRaw = raw.collector_education || raw.collectorEducation || raw.collector_education_section || {};
  const searchRaw = raw.archive_search_cta || raw.archiveSearchCta || raw.search_cta || {};
  const qualityRaw = raw.archive_quality || raw.archiveQuality || raw.trust || {};
  const timelineRaw = raw.timeline || {};
  const contributeRaw = raw.contribute || {};
  const mintMarksRaw = raw.mint_marks || raw.mintMarks || {};
  const featuredStoryRaw = raw.featured_story || raw.featuredStory || {};

  const heroImageUrl = normalizeMedia(heroRaw.image ?? heroRaw.hero_image ?? heroRaw.coin_image);
  const heroPrimary = normalizeButton(heroRaw.primary_button ?? heroRaw.primaryButton ?? heroRaw.primary_cta);
  const heroSecondary = normalizeButton(heroRaw.secondary_button ?? heroRaw.secondaryButton ?? heroRaw.secondary_cta);

  const archiveCards = (archiveRaw.cards || archiveRaw.items || [])
    .map((c, i) => normalizeArchiveOverviewCard(c, i))
    .filter(Boolean);

  const learningCards = (learningRaw.cards || learningRaw.links || learningRaw.items || [])
    .map((c, i) => normalizeCollectorEducationCard(c, i))
    .filter(Boolean);

  const qualityCards = (qualityRaw.cards || qualityRaw.pillars || qualityRaw.items || [])
    .map((p, i) => normalizeArchiveQualityCard(p, i))
    .filter(Boolean);

  const milestones = (timelineRaw.milestones || timelineRaw.items || [])
    .map((m, i) => normalizeMilestone(m, i))
    .filter(Boolean);

  const contributePrimary = normalizeButton({
    text: contributeRaw.primary_button_text,
    url: contributeRaw.primary_button_url,
  }) ?? normalizeButton(contributeRaw.primary_button ?? contributeRaw.primaryButton ?? contributeRaw.primary_cta);
  const contributeSecondary = normalizeButton({
    text: contributeRaw.secondary_button_text,
    url: contributeRaw.secondary_button_url,
  }) ?? normalizeButton(contributeRaw.secondary_button ?? contributeRaw.secondaryButton ?? contributeRaw.secondary_cta);

  const mintMarkCards = (mintMarksRaw.cards || mintMarksRaw.marks || mintMarksRaw.items || [])
    .map((m, i) => normalizeMintMarkCard(m, i))
    .filter(Boolean);

  return {
    source: "api",
    hero: {
      is_visible: heroRaw.is_visible !== false && heroRaw.isVisible !== false,
      title: heroRaw.title ?? heroRaw.heading ?? "",
      highlight_word: heroRaw.highlight_word ?? heroRaw.highlightWord ?? "",
      description: pickText(heroRaw.description, heroRaw.desc, heroRaw.subtitle),
      image: heroImageUrl ? { url: heroImageUrl } : null,
      primary_button_text: pickText(
        heroRaw.primary_button_text,
        heroRaw.primaryButton?.text,
        heroPrimary?.text,
      ),
      primary_button_url: pickText(
        heroRaw.primary_button_url,
        heroRaw.primaryButton?.url,
        heroPrimary?.url,
      ),
      secondary_button_text: pickText(
        heroRaw.secondary_button_text,
        heroRaw.secondaryButton?.text,
        heroSecondary?.text,
      ),
      secondary_button_url: pickText(
        heroRaw.secondary_button_url,
        heroRaw.secondaryButton?.url,
        heroSecondary?.url,
      ),
      eyebrow: pickText(heroRaw.eyebrow, heroRaw.label),
    },
    quote: {
      is_visible: quoteRaw.is_visible !== false && quoteRaw.isVisible !== false,
      text: quoteRaw.text ?? quoteRaw.quote_text ?? "",
      highlight_text: quoteRaw.highlight_text ?? quoteRaw.highlightText ?? quoteRaw.quote_highlight_text ?? "",
      attribution: pickText(quoteRaw.attribution, quoteRaw.quote_attribution, quoteRaw.author, quoteRaw.source),
    },
    archiveOverview: {
      ...normalizeSectionMeta(archiveRaw),
      cards: archiveCards,
    },
    collectorEducation: {
      ...normalizeSectionMeta(learningRaw),
      cards: learningCards,
    },
    searchCta: {
      is_visible: searchRaw.is_visible !== false && searchRaw.isVisible !== false,
      eyebrow: pickText(searchRaw.eyebrow, searchRaw.section_label, searchRaw.label),
      title: pickText(searchRaw.title, searchRaw.heading),
      description: pickText(searchRaw.description, searchRaw.desc, searchRaw.sub),
      primaryButton: normalizeButton({
        text: searchRaw.primary_button_text,
        url: searchRaw.primary_button_url,
      }) ?? normalizeButton(searchRaw.primary_button ?? searchRaw.button ?? { text: searchRaw.button_text, url: searchRaw.button_url }),
      secondaryButton: normalizeButton({
        text: searchRaw.secondary_button_text,
        url: searchRaw.secondary_button_url,
      }) ?? normalizeButton(searchRaw.secondary_button ?? searchRaw.fallback_button ?? { text: searchRaw.fallback_text, url: searchRaw.fallback_url }),
      tip: pickText(searchRaw.tip_text, searchRaw.tip, searchRaw.hint, searchRaw.note),
    },
    archiveQuality: {
      ...normalizeSectionMeta(qualityRaw),
      cards: qualityCards,
    },
    timeline: {
      ...normalizeSectionMeta(timelineRaw),
      milestones,
    },
    contribute: {
      ...normalizeSectionMeta(contributeRaw),
      primaryButton: contributePrimary,
      secondaryButton: contributeSecondary,
      statsCard: normalizeContributeStatsCard(contributeRaw),
      stats: normalizeContributeStats(contributeRaw),
    },
    mintMarks: {
      ...normalizeSectionMeta(mintMarksRaw),
      cards: mintMarkCards,
    },
    featuredStory: normalizeFeaturedStory(featuredStoryRaw),
  };
}

export function normalizeSiteSettings(raw) {
  if (!raw || typeof raw !== "object") {
    return { source: "mock" };
  }

  const headerRaw = raw.header || {};
  const footerRaw = raw.footer || {};
  const newsletterRaw = footerRaw.newsletter || {};

  const logoUrl = normalizeMedia(headerRaw.logo ?? headerRaw.logo_image);
  const logoLinkUrl = pickText(headerRaw.logo_url, headerRaw.logoUrl, headerRaw.logo_link, headerRaw.logoLink);
  const logoText = pickText(headerRaw.logo_text, headerRaw.logoText, headerRaw.site_name);

  const navigation = (headerRaw.navigation || headerRaw.nav || headerRaw.links || [])
    .map(normalizeLink)
    .filter(Boolean);

  const primaryCtaRaw = headerRaw.primary_cta ?? headerRaw.primaryCta ?? headerRaw.cta;
  const primaryCta = primaryCtaRaw && typeof primaryCtaRaw === "object"
    ? {
      text: pickText(primaryCtaRaw.text, primaryCtaRaw.label, primaryCtaRaw.title),
      url: pickText(primaryCtaRaw.url, primaryCtaRaw.link, primaryCtaRaw.href),
    }
    : { text: "", url: "" };

  const languages = (headerRaw.languages || [])
    .map((l) => {
      if (typeof l === "string") return l.toLowerCase();
      return pickText(l.code, l.lang, l.locale, l.language_code)?.toLowerCase();
    })
    .filter(Boolean);

  const linkColumns = (footerRaw.link_columns || footerRaw.linkColumns || footerRaw.columns || [])
    .map((col) => {
      if (!col || typeof col !== "object") return null;
      const title = pickText(col.title, col.column_title, col.label, col.heading);
      const linkRows = col.links || col.column_links || col.items || [];
      const links = linkRows
        .map((link) => {
          if (!link || typeof link !== "object") return null;
          const label = pickText(link.label, link.link_text, link.text, link.title);
          const url = pickText(link.url, link.link_url, link.link, link.href);
          if (!label || !url) return null;
          return { label, url };
        })
        .filter(Boolean);
      if (!title && !links.length) return null;
      return { title, links };
    })
    .filter(Boolean);

  return {
    source: "api",
    header: {
      logoUrl,
      logoLinkUrl,
      logoText,
      navigation,
      primaryCta,
      searchEnabled: headerRaw.search_enabled !== false && headerRaw.searchEnabled !== false,
      accountEnabled: headerRaw.account_enabled !== false && headerRaw.accountEnabled !== false,
      languages: languages.length ? languages : ["en", "de"],
    },
    footer: {
      logoText: pickText(footerRaw.footer_logo_text, footerRaw.logo_text, footerRaw.logoText),
      description: pickText(footerRaw.footer_description, footerRaw.description, footerRaw.tagline),
      newsletterLabel: pickText(
        newsletterRaw.headline,
        newsletterRaw.headline_text,
        newsletterRaw.label,
        footerRaw.newsletter_label,
        footerRaw.newsletterLabel,
        footerRaw.newsletter_title,
      ),
      newsletterDescription: pickText(
        newsletterRaw.description,
        newsletterRaw.desc,
        footerRaw.newsletter_description,
        footerRaw.newsletterDescription,
      ),
      newsletterPlaceholder: pickText(
        newsletterRaw.placeholder,
        footerRaw.newsletter_placeholder,
        footerRaw.newsletterPlaceholder,
      ),
      newsletterButtonText: pickText(
        newsletterRaw.button_text,
        newsletterRaw.buttonText,
        footerRaw.newsletter_button_text,
        footerRaw.newsletterButtonText,
      ),
      newsletterBottomText: pickText(
        newsletterRaw.bottom_text,
        newsletterRaw.bottomText,
        footerRaw.newsletter_bottom_text,
        footerRaw.newsletterBottomText,
        footerRaw.newsletter_note,
      ),
      largeBackgroundText: pickText(footerRaw.footer_large_background_text, footerRaw.largeBackgroundText),
      copyrightText: pickText(footerRaw.copyright_text, footerRaw.copyright, footerRaw.copyrightText),
      bottomRightText: pickText(footerRaw.footer_bottom_right_text, footerRaw.bottomRightText),
      linkColumns,
    },
  };
}
