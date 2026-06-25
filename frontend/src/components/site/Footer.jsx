import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useSiteSettings } from "@/context/SettingsContext";
import { pickField, resolveNavUrl, SettingsLink } from "@/utils/settingsHelpers";
import { getLocalizedPath } from "@/utils/language";

const DEFAULT_COLS = (t) => [
  { title: t.footer.explore, links: [
    { label: t.footer.coins, url: "/coins" },
    { label: t.footer.countries, url: "/countries" },
    { label: t.footer.series, url: "/series" },
    { label: t.footer.learn, url: "/learn" },
    { label: t.mints?.title || "Mint Marks", url: "/mint-marks" },
  ] },
  { title: t.footer.about, links: [
    { label: t.footer.aboutLink, url: "/about" },
    { label: t.footer.contact, url: "/contact" },
    { label: t.footer.contribute, url: "/submit" },
  ] },
  { title: t.footer.legal, links: [
    { label: t.footer.privacy, url: "/privacy" },
    { label: t.footer.imprint, url: "/imprint" },
  ] },
];

function mergeFooterColumns(apiCols, fallbackCols) {
  const count = Math.max(fallbackCols.length, apiCols?.length || 0);
  if (!count) return fallbackCols;

  return Array.from({ length: count }, (_, i) => {
    const apiCol = apiCols?.[i];
    const fbCol = fallbackCols[i];
    if (!apiCol) return fbCol;
    if (!fbCol) return apiCol;

    return {
      title: pickField(apiCol.title, fbCol.title),
      links: apiCol.links?.length ? apiCol.links : fbCol.links,
    };
  }).filter(Boolean);
}

const NEWSLETTER_FALLBACK = (lang) => ({
  label: lang === "de" ? "Münze der Woche — Newsletter" : "Coin of the Week — Newsletter",
  placeholder: lang === "de" ? "E-Mail-Adresse" : "Your email",
  button: lang === "de" ? "Abonnieren" : "Subscribe",
  bottom: lang === "de" ? "Eine Münze · Eine Geschichte · Jeden Sonntag" : "One coin · One story · Every Sunday",
});

const FOOTER_TEXT_FALLBACK = (lang, t) => ({
  bottomRight: lang === "de" ? "Kuratiert in Berlin · Made in Europe" : "Curated in Berlin · Made in Europe",
  copyright: t.footer.copyright,
});

export const Footer = () => {
  const { t, lang, localPath } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const site = useSiteSettings();
  const footer = site?.footer;

  const cols = useMemo(() => {
    const fallback = DEFAULT_COLS(t);
    return mergeFooterColumns(footer?.linkColumns, fallback);
  }, [footer?.linkColumns, t]);

  const newsletterFb = NEWSLETTER_FALLBACK(lang);
  const textFb = FOOTER_TEXT_FALLBACK(lang, t);

  const logoText = pickField(footer?.logoText, "CoinArchive");
  const logoMain = logoText.includes("Archive") ? logoText.replace("Archive", "") : "Coin";
  const logoAccent = logoText.includes("Archive") ? "Archive" : logoText.replace(/^Coin/, "");
  const tagline = pickField(footer?.description, t.footer.tagline);
  const newsletterLabel = pickField(footer?.newsletterLabel, newsletterFb.label);
  const newsletterPlaceholder = pickField(footer?.newsletterPlaceholder, newsletterFb.placeholder);
  const newsletterButtonLabel = pickField(footer?.newsletterButtonText, newsletterFb.button);
  const newsletterBottom = pickField(footer?.newsletterBottomText, newsletterFb.bottom);
  const bgText = pickField(footer?.largeBackgroundText, "");
  const copyright = pickField(footer?.copyrightText, textFb.copyright);
  const bottomRight = pickField(footer?.bottomRightText, textFb.bottomRight);

  return (
    <footer data-testid={HOME.footer} className="ca-footer">
      {bgText && (
        <div className="ca-footer__bg-text" aria-hidden="true">{bgText}</div>
      )}
      <div className="ca-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Link to={localPath("/")} className="flex items-center gap-2 mb-6">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(180deg, #F2D16B 0%, #A97E12 100%)" }}>
                <span className="ca-display italic" style={{ color: "#0F1115", fontSize: 16, fontWeight: 700 }}>€</span>
              </span>
              <span className="ca-display" style={{ fontSize: 22 }}>
                {logoMain}<span style={{ color: "var(--ca-gold-light)" }}>{logoAccent}</span>
              </span>
            </Link>
            <p className="ca-muted mb-8" style={{ fontSize: 14, maxWidth: 360, lineHeight: 1.7 }}>
              {tagline}
            </p>

            <div className="ca-mono mb-3">{newsletterLabel}</div>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2" style={{ maxWidth: 380 }}>
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="ca-newsletter-input"
                aria-label="Email"
              />
              <button type="submit" className="ca-btn ca-btn--primary ca-btn--sm" aria-label={newsletterButtonLabel}>
                <ArrowRight size={14} />
              </button>
            </form>
            <div className="ca-mono mt-3" style={{ fontSize: 10 }}>{newsletterBottom}</div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="ca-mono mb-5">{c.title}</div>
              <ul>
                {c.links.map((l) => (
                  <li key={`${c.title}-${l.url}`}>
                    <SettingsLink
                      url={l.url}
                      className="ca-footer__link"
                      data-testid={`footer-link-${resolveNavUrl(l.url).slice(1) || "home"}`}
                    >
                      {l.label}
                    </SettingsLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <div className="ca-mono mb-5">Lang</div>
            <div role="group" aria-label="Language" className="ca-footer__link" style={{ padding: 0 }}>
              <button
                type="button"
                onClick={() => navigate(getLocalizedPath(location.pathname, "de"))}
                aria-label="Deutsch"
                aria-current={lang === "de" ? "true" : undefined}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: lang === "de" ? "var(--ca-gold-light)" : "var(--ca-text-muted)" }}
              >
                DE
              </button>
              <span> / </span>
              <button
                type="button"
                onClick={() => navigate(getLocalizedPath(location.pathname, "en"))}
                aria-label="English"
                aria-current={lang === "en" ? "true" : undefined}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: lang === "en" ? "var(--ca-gold-light)" : "var(--ca-text-muted)" }}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div className="ca-footer__mint-strip" aria-hidden="true">
          <span>A</span><span>D</span><span>F</span><span>G</span><span>J</span><span>A</span><span>D</span><span>F</span><span>G</span><span>J</span>
        </div>

        <hr className="ca-divider mt-12 mb-8" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="ca-mono" style={{ fontSize: 10.5 }}>{copyright}</p>
          <p className="ca-mono" style={{ fontSize: 10.5 }}>{bottomRight}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
