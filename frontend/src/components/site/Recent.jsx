import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { RECENT_COINS } from "@/data/coinData";

export const Recent = () => {
  const { t, lang } = useLang();
  return (
    <section id="coins" data-testid={HOME.recentSection} className="ca-section ca-section--tight">
      <div className="ca-container">
        <div className="flex items-end justify-between gap-6 mb-12 ca-reveal flex-wrap">
          <div>
            <div className="ca-eyebrow mb-4">{t.recent.eyebrow}</div>
            <h2 className="ca-section-title">{t.recent.title}</h2>
          </div>
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
                <img src={c.img} alt={c.title[lang]} loading="lazy" />
              </div>
              <div className="ca-muted" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {c.country[lang]} · {c.year}
              </div>
              <h4 className="mt-2" style={{ fontSize: 14, fontWeight: 500, color: "var(--ca-text)" }}>
                {c.title[lang]}
              </h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recent;
