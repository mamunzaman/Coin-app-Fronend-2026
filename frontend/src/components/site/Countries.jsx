import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { COUNTRIES } from "@/data/coinData";

export const Countries = () => {
  const { t, lang } = useLang();
  return (
    <section id="countries" data-testid={HOME.countriesSection} className="ca-section">
      <div className="ca-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-7 ca-reveal">
            <div className="ca-eyebrow mb-5">{t.countries.eyebrow}</div>
            <h2 className="ca-section-title">{t.countries.title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1" style={{ fontSize: 16, lineHeight: 1.7 }}>
            {t.countries.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {COUNTRIES.map((c, i) => (
            <article
              key={c.code}
              data-testid={HOME.countryCard(c.code)}
              className={`ca-country-card ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
            >
              <div className="ca-country-card__media">
                <img src={c.featured} alt={c.name[lang]} loading="lazy" />
                <div className="ca-country-card__glow" />
              </div>
              <div className="p-7 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span style={{ fontSize: 28 }}>{c.flag}</span>
                  <div>
                    <h3 className="ca-display" style={{ fontSize: 22, lineHeight: 1.1 }}>{c.name[lang]}</h3>
                    <div className="ca-muted mt-1" style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {c.coins} {t.countries.count}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ color: "var(--ca-gold-light)" }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countries;
