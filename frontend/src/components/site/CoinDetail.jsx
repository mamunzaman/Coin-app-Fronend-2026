import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Pencil } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { findCoinBySlug, findCountry, relatedCoins, COINS } from "@/data/coinData";
import { COIN_DETAIL } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CoinCard from "./CoinCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CoinDetail = () => {
  useScrollReveal();
  const { slug } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const coin = findCoinBySlug(slug);
  const [side, setSide] = useState("obverse");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSide("obverse");
  }, [slug]);

  if (!coin) {
    return (
      <div className="ca-page">
        <Navbar />
        <div className="ca-container ca-section text-center" data-testid={COIN_DETAIL.page}>
          <h1 className="ca-section-title mb-6">{t.detail.notFound}</h1>
          <Link to="/coins" className="ca-btn ca-btn--secondary">
            <ArrowLeft size={14} />
            {t.detail.back}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const country = findCountry(coin.country);
  const related = relatedCoins(coin.slug, 3);
  const plateIdx = COINS.findIndex((c) => c.slug === coin.slug) + 1;

  return (
    <div className="ca-page" data-testid={COIN_DETAIL.page}>
      <Navbar />

      <article className="ca-section" style={{ paddingTop: 120 }}>
        <div className="ca-container">
          {/* Breadcrumb */}
          <nav data-testid={COIN_DETAIL.breadcrumb} className="ca-breadcrumb ca-reveal">
            <button onClick={() => navigate(-1)} data-testid={COIN_DETAIL.back} className="ca-breadcrumb__back">
              <ArrowLeft size={14} />
              {t.detail.back}
            </button>
            <span className="ca-breadcrumb__sep">/</span>
            <Link to="/coins" className="ca-breadcrumb__link">{t.detail.breadcrumb}</Link>
            <span className="ca-breadcrumb__sep">/</span>
            <Link to={`/coins?country=${coin.country}`} className="ca-breadcrumb__link">
              {country?.name[lang]}
            </Link>
            <span className="ca-breadcrumb__sep">/</span>
            <span className="ca-breadcrumb__current">{coin.year}</span>
          </nav>

          {/* Main */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-10">
            {/* Coin */}
            <div className="lg:col-span-7 ca-reveal" style={{ position: "sticky", top: 100 }}>
              <div className="ca-detail-coin">
                <img
                  data-testid={side === "obverse" ? COIN_DETAIL.obverse : COIN_DETAIL.reverse}
                  src={side === "obverse" ? coin.obverse : coin.reverse}
                  alt={`${coin.title[lang]} — ${side === "obverse" ? t.detail.obverse : t.detail.reverse}`}
                />
                {/* Sheen */}
              </div>

              <div className="ca-detail-toggle">
                <button
                  data-testid={COIN_DETAIL.toggleObverse}
                  onClick={() => setSide("obverse")}
                  className={`ca-detail-toggle__btn ${side === "obverse" ? "is-active" : ""}`}
                  aria-pressed={side === "obverse"}
                >
                  {t.detail.obverse}
                </button>
                <button
                  data-testid={COIN_DETAIL.toggleReverse}
                  onClick={() => setSide("reverse")}
                  className={`ca-detail-toggle__btn ${side === "reverse" ? "is-active" : ""}`}
                  aria-pressed={side === "reverse"}
                >
                  {t.detail.reverse}
                </button>
              </div>

              <div className="ca-detail-plate ca-mono">
                <span>{t.detail.plate} {String(plateIdx).padStart(3, "0")}</span>
                <span className="sep" />
                <strong>{coin.country} · {coin.year}</strong>
                {coin.mint && (<><span className="sep" /><span>Mint {coin.mint}</span></>)}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 ca-reveal ca-reveal--delay-1">
              <div className="ca-mono mb-5" style={{ color: "var(--ca-gold-light)" }}>
                {country?.name[lang]} · {coin.year} · {coin.series[lang]}
              </div>
              <h1 data-testid={COIN_DETAIL.title} className="ca-detail-title">
                {coin.title[lang]}
              </h1>

              {/* Story */}
              <div data-testid={COIN_DETAIL.storyTab} className="mt-10">
                <div className="ca-section-id" style={{ marginBottom: 20 }}>
                  <span className="ca-section-id__num">i.</span>
                  <span className="ca-section-id__label">{t.detail.story}</span>
                  <span className="ca-section-id__rule" />
                </div>
                {coin.story[lang].map((p, i) => (
                  <p key={i} className="ca-soft" style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 18 }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Specs */}
              <div data-testid={COIN_DETAIL.specsTab} className="mt-12">
                <div className="ca-section-id" style={{ marginBottom: 20 }}>
                  <span className="ca-section-id__num">ii.</span>
                  <span className="ca-section-id__label">{t.detail.specs}</span>
                  <span className="ca-section-id__rule" />
                </div>
                <dl className="ca-data-list" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                  <dt>{t.detail.designer}</dt><dd data-testid={COIN_DETAIL.designerTab}>{coin.designer}</dd>
                  <dt>{t.detail.mintage}</dt><dd>{coin.mintage.toLocaleString(lang === "de" ? "de-DE" : "en-US")}</dd>
                  <dt>{t.detail.diameter}</dt><dd>{coin.specs.diameter}</dd>
                  <dt>{t.detail.weight}</dt><dd>{coin.specs.weight}</dd>
                  <dt>{t.detail.thickness}</dt><dd>{coin.specs.thickness}</dd>
                  <dt>{t.detail.composition}</dt><dd>{coin.specs.composition}</dd>
                  <dt>{t.detail.edge}</dt><dd>{coin.specs.edge[lang]}</dd>
                  {coin.mint && (<><dt>{t.detail.mint}</dt><dd>{coin.mint} — {coin.mint === "A" ? "Berlin" : coin.mint === "D" ? "Munich" : coin.mint === "F" ? "Stuttgart" : coin.mint === "G" ? "Karlsruhe" : "Hamburg"}</dd></>)}
                  <dt>{t.detail.series}</dt><dd>{coin.series[lang]}</dd>
                </dl>
              </div>

              <button data-testid={COIN_DETAIL.submitImprove} className="ca-btn ca-btn--ghost ca-btn--sm mt-10">
                <Pencil size={12} />
                {t.detail.submitImprove}
              </button>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-32">
              <div className="ca-section-id">
                <span className="ca-section-id__num">iii.</span>
                <span className="ca-section-id__label">{t.detail.related}</span>
                <span className="ca-section-id__rule" />
                <span className="ca-section-id__meta">{country?.name[lang]}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8">
                {related.map((c) => (
                  <CoinCard key={c.slug} coin={c} testId={COIN_DETAIL.related(c.slug)} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default CoinDetail;
