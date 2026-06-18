import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";

export const Footer = () => {
  const { t } = useLang();
  const cols = [
    {
      title: t.footer.explore,
      links: [t.footer.coins, t.footer.countries, t.footer.series, t.footer.learn],
    },
    {
      title: t.footer.about,
      links: [t.footer.aboutLink, t.footer.contact, t.footer.contribute],
    },
    {
      title: t.footer.legal,
      links: [t.footer.privacy, t.footer.imprint],
    },
  ];
  return (
    <footer data-testid={HOME.footer} className="ca-footer">
      <div className="ca-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-2 mb-6">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(180deg, #F2D16B 0%, #A97E12 100%)" }}>
                <span className="ca-display italic" style={{ color: "#0F1115", fontSize: 16, fontWeight: 700 }}>€</span>
              </span>
              <span className="ca-display" style={{ fontSize: 22 }}>
                Coin<span style={{ color: "var(--ca-gold-light)" }}>Archive</span>
              </span>
            </a>
            <p className="ca-muted" style={{ fontSize: 14, maxWidth: 360, lineHeight: 1.7 }}>
              {t.footer.tagline}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="ca-eyebrow mb-5">{c.title}</div>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="ca-footer__link">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-1" />
        </div>

        <hr className="ca-divider mt-16 mb-8" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="ca-muted" style={{ fontSize: 12, letterSpacing: "0.05em" }}>
            {t.footer.copyright}
          </p>
          <p className="ca-muted" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Made in Europe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
