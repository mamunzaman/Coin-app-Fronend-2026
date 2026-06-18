import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { COUNTRIES, COINS } from "@/data/coinData";
import { COUNTRIES_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CountriesPage = () => {
  useScrollReveal();
  const { t, lang } = useLang();

  // Sorted by coins count desc — Germany leads but page isn't Germany-only
  const sorted = [...COUNTRIES].sort((a, b) => b.coins - a.coins);

  return (
    <div className="ca-page" data-testid={COUNTRIES_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <SectionId num="II" label={t.countriesPage.eyebrow} meta={`${COUNTRIES.length} states`} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                {t.countriesPage.title}
              </h1>
            </div>
            <p className="md:col-span-5 ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>
              {t.countriesPage.sub}
            </p>
          </div>
        </div>
      </header>

      <main className="ca-section">
        <div className="ca-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {sorted.map((c, i) => {
              const actualCount = COINS.filter((x) => x.countryCode === c.code).length;
              return (
                <Link
                  key={c.code}
                  to={`/countries/${c.code.toLowerCase()}`}
                  data-testid={COUNTRIES_PAGE.card(c.code)}
                  className={`ca-country-card ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
                >
                  <div className="ca-country-card__media">
                    <div className="ca-monogram">
                      <span className="ca-monogram__letters">{c.code}</span>
                      <span className="ca-monogram__year">{c.since} — 2025</span>
                    </div>
                  </div>
                  <div className="ca-country-card__body" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
                    <div className="flex items-center gap-3 w-full">
                      <span style={{ fontSize: 22 }}>{c.flag}</span>
                      <div className="flex-1">
                        <h3 className="ca-country-card__name">{c.name[lang]}</h3>
                        <div className="ca-country-card__meta">
                          {c.code} · {c.capital} · {t.countriesPage.since} {c.since}
                        </div>
                      </div>
                      <ArrowUpRight size={16} style={{ color: "var(--ca-gold-light)" }} />
                    </div>
                    <p className="ca-soft" style={{ fontSize: 13.5, lineHeight: 1.55 }}>{c.blurb[lang]}</p>
                    <div className="ca-mono" style={{ fontSize: 10.5, color: "var(--ca-gold-light)" }}>
                      {c.coins} {t.countriesPage.coinsCount} · {actualCount} in archive
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CountriesPage;
