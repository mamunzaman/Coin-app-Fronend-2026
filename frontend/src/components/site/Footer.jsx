import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useSiteSettings } from "@/context/SettingsContext";
import { resolveNavUrl, SettingsLink } from "@/utils/settingsHelpers";

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

export const Footer = () => {
  const { t, lang, toggle } = useLang();
  const site = useSiteSettings();
  const footer = site?.footer;

  const cols = useMemo(() => {
    if (footer?.linkColumns?.length) return footer.linkColumns;
    return DEFAULT_COLS(t);
  }, [footer?.linkColumns, t]);

  const logoText = footer?.logoText || "CoinArchive";
  const logoMain = logoText.includes("Archive") ? logoText.replace("Archive", "") : "Coin";
  const logoAccent = logoText.includes("Archive") ? "Archive" : logoText.replace(/^Coin/, "");
  const tagline = footer?.description || t.footer.tagline;
  const newsletterLabel = footer?.newsletterLabel || (lang === "de" ? "Münze der Woche — Newsletter" : "Coin of the Week — Newsletter");
  const newsletterPlaceholder = footer?.newsletterPlaceholder || (lang === "de" ? "E-Mail-Adresse" : "Your email");
  const newsletterBottom = footer?.newsletterBottomText || (lang === "de" ? "Eine Münze · Eine Geschichte · Jeden Sonntag" : "One coin · One story · Every Sunday");
  const copyright = footer?.copyrightText || t.footer.copyright;
  const bottomRight = footer?.bottomRightText || (lang === "de" ? "Kuratiert in Berlin · Made in Europe" : "Curated in Berlin · Made in Europe");

  return (
    <footer data-testid={HOME.footer} className="ca-footer">
      {footer?.largeBackgroundText && (
        <div className="ca-footer__bg-text" aria-hidden="true">{footer.largeBackgroundText}</div>
      )}
      <div className="ca-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2 mb-6">
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
              <button type="submit" className="ca-btn ca-btn--primary ca-btn--sm" aria-label="Subscribe">
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
            <button onClick={toggle} className="ca-footer__link" style={{ padding: 0 }}>
              <span style={{ color: lang === "en" ? "var(--ca-gold-light)" : "var(--ca-text-muted)" }}>EN</span>
              <span> / </span>
              <span style={{ color: lang === "de" ? "var(--ca-gold-light)" : "var(--ca-text-muted)" }}>DE</span>
            </button>
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
