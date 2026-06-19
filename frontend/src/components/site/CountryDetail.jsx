import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { MINTS, getCountryDetail } from "@/services/coinArchiveService";
import { COUNTRY_DETAIL } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import CoinCard from "./CoinCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const CountryDetail = () => {
  useScrollReveal();
  const { code } = useParams();
  const { t, lang } = useLang();
  const upperCode = (code || "").toUpperCase();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const country = detail?.country ?? null;
  const coins = detail?.coins ?? [];
  const stats = detail?.stats ?? {};

  useDocumentTitle(country ? country.name[lang] : loading ? t.nav.countries : "Country");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    getCountryDetail(upperCode).then((result) => {
      if (!cancelled) {
        setDetail(result);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [upperCode]);

  if (loading) {
    return (
      <div className="ca-page" data-testid={COUNTRY_DETAIL.page}>
        <Navbar />
        <div className="ca-container ca-section" style={{ minHeight: 400 }} aria-busy="true" />
        <Footer />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="ca-page">
        <Navbar />
        <div className="ca-container ca-section text-center">
          <h1 className="ca-section-title mb-6">Country not found</h1>
          <Link to="/countries" className="ca-btn ca-btn--secondary">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const years = Array.from(new Set(coins.map((c) => c.year))).sort((a, b) => a - b);
  const yearStart = country.yearStart ?? stats.yearStart ?? (years.length ? years[0] : null);
  const yearEnd = country.yearEnd ?? stats.yearEnd ?? (years.length ? years[years.length - 1] : null);
  const yearRange = yearStart && yearEnd ? `${yearStart} — ${yearEnd}` : "—";
  const statCoins = stats.coins ?? coins.length;
  const statYears = years.length || (detail?.timeline?.length ?? 0);
  const statSeries = stats.series ?? new Set(coins.map((c) => c.seriesSlug).filter(Boolean)).size;

  return (
    <div className="ca-page" data-testid={COUNTRY_DETAIL.page}>
      <Navbar />

      <header data-testid={COUNTRY_DETAIL.hero} className="ca-coins-header">
        <div className="ca-container">
          <div className="ca-breadcrumb ca-reveal mb-8">
            <Link to="/countries" className="ca-breadcrumb__back">
              <ArrowLeft size={14} /> {t.detail.back}
            </Link>
            <span className="ca-breadcrumb__sep">/</span>
            <Link to="/countries" className="ca-breadcrumb__link">{t.nav.countries}</Link>
            <span className="ca-breadcrumb__sep">/</span>
            <span className="ca-breadcrumb__current">{country.code}</span>
          </div>

          <SectionId num="I" label={t.countryDetail.eyebrow} meta={`${country.code}`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 ca-reveal">
              <div className="flex items-center gap-5 mb-6">
                <span style={{ fontSize: 56 }}>{country.flag}</span>
                <div>
                  <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1 }}>
                    {country.name[lang]}
                  </h1>
                  <div className="ca-mono mt-3">{country.capital} · {country.code}</div>
                </div>
              </div>
              <p className="ca-soft" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}>
                {country.blurb[lang]}
              </p>
            </div>

            <div className="lg:col-span-5 ca-reveal ca-reveal--delay-1" data-testid={COUNTRY_DETAIL.stats}>
              <div className="grid grid-cols-3 gap-4" style={{ border: "1px solid var(--ca-border)", borderRadius: 18, padding: 28 }}>
                <div>
                  <div className="ca-display" style={{ fontSize: 38, color: "var(--ca-gold-light)" }}>{statCoins}</div>
                  <div className="ca-mono mt-1">{t.countryDetail.stats.coins}</div>
                </div>
                <div>
                  <div className="ca-display" style={{ fontSize: 38, color: "var(--ca-gold-light)" }}>{statYears}</div>
                  <div className="ca-mono mt-1">{t.countryDetail.stats.years}</div>
                </div>
                <div>
                  <div className="ca-display" style={{ fontSize: 38, color: "var(--ca-gold-light)" }}>{statSeries}</div>
                  <div className="ca-mono mt-1">{t.countryDetail.stats.series}</div>
                </div>
              </div>
              <div className="ca-mono mt-4" style={{ textAlign: "right" }}>
                {yearRange} · {country.coins} total issued
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="ca-section" data-testid={COUNTRY_DETAIL.grid}>
        <div className="ca-container">
          <SectionId num="II" label={`${t.countryDetail.coinsHere} ${country.name[lang]}`} meta={`${coins.length} in archive`} />
          {coins.length === 0 ? (
            <p className="ca-muted">No coins yet in this country&apos;s archive.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {coins.map((c) => <CoinCard key={c.slug} coin={c} />)}
            </div>
          )}
        </div>
      </main>

      {country.code === "DE" && (
        <section data-testid={COUNTRY_DETAIL.mintsSection} className="ca-section">
          <div className="ca-container">
            <SectionId num="III" label={t.countryDetail.mintsHere} meta="A · D · F · G · J" />
            <div
              className="grid grid-cols-1 md:grid-cols-5 ca-reveal"
              style={{ border: "1px solid var(--ca-border)", borderRadius: 24, overflow: "hidden", background: "linear-gradient(180deg, rgba(23,26,32,0.6), rgba(15,17,21,0.6))" }}
            >
              {MINTS.map((m) => (
                <div key={m.letter} className="ca-mint">
                  <div className="ca-mint__stamp">
                    <span className="ca-mint__letter">{m.letter}</span>
                  </div>
                  <div className="ca-mint__city">{m.city}</div>
                  <div className="ca-mint__note">{m.note[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {years.length > 0 && (
        <section data-testid={COUNTRY_DETAIL.timeline} className="ca-section">
          <div className="ca-container">
            <SectionId num={country.code === "DE" ? "IV" : "III"} label={t.countryDetail.timeline} meta={yearRange} />
            <div className="ca-country-timeline">
              {years.map((y) => {
                const yearCoins = coins.filter((c) => c.year === y);
                return (
                  <div key={y} className="ca-country-timeline__row">
                    <div className="ca-country-timeline__year">{y}</div>
                    <div className="ca-country-timeline__items">
                      {yearCoins.map((c) => (
                        <Link key={c.slug} to={`/coins/${c.slug}`} className="ca-country-timeline__item">
                          <span className="dot" />
                          <span className="title">{c.title[lang]}</span>
                          {c.mint && <span className="mint">Mint {c.mint}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CountryDetail;
