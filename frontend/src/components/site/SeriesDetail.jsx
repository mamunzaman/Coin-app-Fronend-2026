import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { findSeries, coinsBySeries } from "@/data/coinData";
import { SERIES_DETAIL } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import CoinCard from "./CoinCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const SeriesDetail = () => {
  useScrollReveal();
  const { slug } = useParams();
  const { t, lang } = useLang();
  const series = findSeries(slug);
  const coins = series ? coinsBySeries(series.slug) : [];
  useDocumentTitle(series ? series.name[lang] : "Series");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [slug]);

  if (!series) {
    return (
      <div className="ca-page">
        <Navbar />
        <div className="ca-container ca-section text-center">
          <h1 className="ca-section-title mb-6">Series not found</h1>
          <Link to="/series" className="ca-btn ca-btn--secondary">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const years = Array.from(new Set(coins.map((c) => c.year))).sort((a, b) => a - b);

  return (
    <div className="ca-page" data-testid={SERIES_DETAIL.page}>
      <Navbar />

      <header data-testid={SERIES_DETAIL.hero} className="ca-coins-header">
        <div className="ca-container">
          <div className="ca-breadcrumb ca-reveal mb-8">
            <Link to="/series" className="ca-breadcrumb__back">
              <ArrowLeft size={14} /> {t.detail.back}
            </Link>
            <span className="ca-breadcrumb__sep">/</span>
            <Link to="/series" className="ca-breadcrumb__link">{t.nav.series}</Link>
            <span className="ca-breadcrumb__sep">/</span>
            <span className="ca-breadcrumb__current">{series.name[lang]}</span>
          </div>

          <SectionId num="I" label={t.seriesDetail.eyebrow} meta={series.range} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 ca-reveal">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1 }}>
                {series.name[lang]}
              </h1>
            </div>
            <p className="lg:col-span-4 ca-soft ca-reveal ca-reveal--delay-1" style={{ fontSize: 16, lineHeight: 1.7 }}>
              {series.description[lang]}
            </p>
          </div>

          <div className="ca-mono mt-10 flex flex-wrap gap-6">
            <span>{t.seriesPage.yearRange}: <span style={{ color: "var(--ca-gold-light)" }}>{series.range}</span></span>
            <span>·</span>
            <span>{coins.length} / {series.count} {t.seriesPage.coinsCount}</span>
            {series.country && (<><span>·</span><span>{series.country}</span></>)}
          </div>
        </div>
      </header>

      <main className="ca-section" data-testid={SERIES_DETAIL.grid}>
        <div className="ca-container">
          <SectionId num="II" label={t.seriesDetail.coinsInSeries} meta={`${coins.length} entries`} />
          {coins.length === 0 ? (
            <p className="ca-muted">No coins catalogued yet for this series.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {coins.map((c) => <CoinCard key={c.slug} coin={c} />)}
            </div>
          )}
        </div>
      </main>

      {years.length > 0 && (
        <section data-testid={SERIES_DETAIL.timeline} className="ca-section">
          <div className="ca-container">
            <SectionId num="III" label={t.seriesDetail.timeline} meta={series.range} />
            <div className="ca-country-timeline">
              {years.map((y) => (
                <div key={y} className="ca-country-timeline__row">
                  <div className="ca-country-timeline__year">{y}</div>
                  <div className="ca-country-timeline__items">
                    {coins.filter((c) => c.year === y).map((c) => (
                      <Link key={c.slug} to={`/coins/${c.slug}`} className="ca-country-timeline__item">
                        <span className="dot" />
                        <span className="title">{c.title[lang]}</span>
                        <span className="mint">{c.countryCode}{c.mint ? ` · Mint ${c.mint}` : ""}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default SeriesDetail;
