import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { getCountriesList } from "@/services/coinArchiveService";
import { COUNTRIES_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const CountriesPage = () => {
  useScrollReveal();
  const { t, lang } = useLang();
  useDocumentTitle(t.countriesPage.title);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getCountriesList().then((result) => {
      if (!cancelled) {
        setItems(result.items);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  const latestYearLabel = new Date().getFullYear();

  return (
    <div className="ca-page" data-testid={COUNTRIES_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <SectionId num="II" label={t.countriesPage.eyebrow} meta={`${items.length} states`} />
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

      <main className="ca-section" aria-busy={loading}>
        <div className="ca-container">
          {loading ? (
            <div className="ca-mono">{lang === "de" ? "Lädt…" : "Loading…"}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {items.map((c, i) => (
                <Link
                  key={c.code}
                  to={`/countries/${c.code.toLowerCase()}`}
                  data-testid={COUNTRIES_PAGE.card(c.code)}
                  className={`ca-country-card ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
                >
                  <div className="ca-country-card__media">
                    {c.featuredCoin && c.featured ? (
                      <img src={c.featured} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div className="ca-monogram">
                        <span className="ca-monogram__letters">{c.code}</span>
                        <span className="ca-monogram__year">{c.since} — {c.latestYear || latestYearLabel}</span>
                      </div>
                    )}
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
                      {c.coins} {t.countriesPage.coinsCount} · {c.coinCount ?? c.coins} in archive
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CountriesPage;
