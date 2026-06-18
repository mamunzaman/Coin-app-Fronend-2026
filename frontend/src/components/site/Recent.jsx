import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { RECENT_COINS } from "@/data/coinData";
import SectionId from "./SectionId";

const DESIGNERS = ["J. Yzerman", "B. Broschat", "M. Cassol", "L. Gárate", "T. Berger", "A. Janssens"];

export const Recent = () => {
  const { t, lang } = useLang();
  return (
    <section id="coins" data-testid={HOME.recentSection} className="ca-section ca-section--tight">
      <div className="ca-container">
        <SectionId num="VIII" label={t.recent.eyebrow} meta={`${RECENT_COINS.length} new`} />

        <div className="flex items-end justify-between gap-6 mb-12 ca-reveal flex-wrap">
          <h2 className="ca-section-title">{t.recent.title}</h2>
          <p className="ca-muted" style={{ fontSize: 14, maxWidth: 320 }}>{t.recent.sub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {RECENT_COINS.map((c, i) => (
            <article
              key={c.id}
              data-testid={HOME.recentCard(c.id)}
              className={`ca-coin-card ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
            >
              <div className="ca-coin-card__img">
                {i < 2 && <span className="ca-badge">New</span>}
                <img src={c.img} alt={c.title[lang]} loading="lazy" />
              </div>
              <div className="ca-mono" style={{ fontSize: 10 }}>
                {c.country[lang]} · {c.year}
              </div>
              <h4 className="mt-2" style={{ fontSize: 14, fontWeight: 500, color: "var(--ca-text)", lineHeight: 1.3 }}>
                {c.title[lang]}
              </h4>
              <p className="ca-muted mt-1" style={{ fontSize: 11.5, fontStyle: "italic" }}>
                {DESIGNERS[i % DESIGNERS.length]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recent;
