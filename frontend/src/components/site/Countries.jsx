import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { COUNTRIES } from "@/data/coinData";
import SectionId from "./SectionId";

const Card = ({ c, lang, t, feature, idx }) => (
  <Link
    to={`/coins?country=${c.code}`}
    data-testid={HOME.countryCard(c.code)}
    className={`ca-country-card ca-reveal ca-reveal--delay-${Math.min(idx, 5)}`}
  >
    <div className={`ca-country-card__media ${feature ? "ca-country-card__media--feature" : ""}`}>
      <div className="ca-monogram">
        <span className="ca-monogram__letters">{c.code}</span>
        <span className="ca-monogram__year">2004 — 2025</span>
      </div>
    </div>
    <div className="ca-country-card__body">
      <div>
        <h3 className="ca-country-card__name">{c.name[lang]}</h3>
        <div className="ca-country-card__meta">{c.code} · {c.coins} {t.countries.count}</div>
      </div>
      <span className="ca-country-card__cta">
        View <ArrowUpRight size={14} />
      </span>
    </div>
  </Link>
);

export const Countries = () => {
  const { t, lang } = useLang();
  const [feature, ...rest] = COUNTRIES;
  return (
    <section id="countries" data-testid={HOME.countriesSection} className="ca-section">
      <div className="ca-container">
        <SectionId num="IV" label={t.countries.title} meta="6 of 20 states" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <h2 className="ca-section-title">{t.countries.title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1" style={{ fontSize: 16, lineHeight: 1.7 }}>
            {t.countries.sub}
          </p>
        </div>

        {/* Asymmetric grid: feature card spans 2 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2">
            <Card c={feature} lang={lang} t={t} feature idx={0} />
          </div>
          {rest.map((c, i) => (
            <Card key={c.code} c={c} lang={lang} t={t} idx={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countries;
