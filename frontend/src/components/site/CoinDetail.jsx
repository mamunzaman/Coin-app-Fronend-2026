import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Pencil } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { findCoinBySlug, findCountry, findSeries, relatedCoins, COINS } from "@/data/coinData";
import { COIN_DETAIL } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CoinCard from "./CoinCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MINT_CITIES = { A: "Berlin", D: "Munich", F: "Stuttgart", G: "Karlsruhe", J: "Hamburg" };

export const CoinDetail = () => {
  useScrollReveal();
  const { slug } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const coin = findCoinBySlug(slug);
  const [side, setSide] = useState("obverse");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); setSide("obverse"); }, [slug]);

  if (!coin) {
    return (
      <div className="ca-page">
        <Navbar />
        <div className="ca-container ca-section text-center" data-testid={COIN_DETAIL.page}>
          <h1 className="ca-section-title mb-6">{t.detail.notFound}</h1>
          <Link to="/coins" className="ca-btn ca-btn--secondary">
            <ArrowLeft size={14} /> {t.detail.back}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const country = findCountry(coin.countryCode);
  const series = findSeries(coin.seriesSlug);
  const related = relatedCoins(coin.slug, 3);
  const plateIdx = COINS.findIndex((c) => c.slug === coin.slug) + 1;
  const specs = coin.specifications;

  const releaseStr = coin.releaseDate
    ? new Date(coin.releaseDate).toLocaleDateString(lang === "de" ? "de-DE" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <div className="ca-page" data-testid={COIN_DETAIL.page}>
      <Navbar />

      <article className="ca-section" style={{ paddingTop: 120 }}>
        <div className="ca-container">
          <nav data-testid={COIN_DETAIL.breadcrumb} className="ca-breadcrumb ca-reveal">
            <button onClick={() => navigate(-1)} data-testid={COIN_DETAIL.back} className="ca-breadcrumb__back">
              <ArrowLeft size={14} /> {t.detail.back}
            </button>
            <span className="ca-breadcrumb__sep">/</span>
            <Link to="/coins" className="ca-breadcrumb__link">{t.detail.breadcrumb}</Link>
            <span className="ca-breadcrumb__sep">/</span>
            <Link to={`/countries/${coin.countryCode.toLowerCase()}`} className="ca-breadcrumb__link">{country?.name[lang]}</Link>
            <span className="ca-breadcrumb__sep">/</span>
            <span className="ca-breadcrumb__current">{coin.year}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-10">
            {/* Coin */}
            <div className="lg:col-span-7 ca-reveal" style={{ position: "sticky", top: 100 }}>
              <div className="ca-detail-coin">
                <img
                  data-testid={side === "obverse" ? COIN_DETAIL.obverse : COIN_DETAIL.reverse}
                  src={side === "obverse" ? coin.obverseImage : coin.reverseImage}
                  alt={`${coin.title[lang]} — ${side === "obverse" ? t.detail.obverse : t.detail.reverse}`}
                />
              </div>

              <div className="ca-detail-toggle">
                <button data-testid={COIN_DETAIL.toggleObverse} onClick={() => setSide("obverse")}
                        className={`ca-detail-toggle__btn ${side === "obverse" ? "is-active" : ""}`}
                        aria-pressed={side === "obverse"}>{t.detail.obverse}</button>
                <button data-testid={COIN_DETAIL.toggleReverse} onClick={() => setSide("reverse")}
                        className={`ca-detail-toggle__btn ${side === "reverse" ? "is-active" : ""}`}
                        aria-pressed={side === "reverse"}>{t.detail.reverse}</button>
              </div>

              <div className="ca-detail-plate ca-mono">
                <span>{t.detail.plate} {String(plateIdx).padStart(3, "0")}</span>
                <span className="sep" />
                <strong>{coin.countryCode} · {coin.year}</strong>
                {coin.mint && (<><span className="sep" /><span>Mint {coin.mint}</span></>)}
              </div>

              {/* Gallery */}
              {coin.gallery && coin.gallery.length > 0 && (
                <div className="ca-gallery mt-10">
                  <div className="ca-mono mb-3">{t.detail.gallery}</div>
                  <div className="ca-gallery__grid">
                    {coin.gallery.map((src, i) => (
                      <button
                        key={i}
                        data-testid={COIN_DETAIL.galleryItem(i)}
                        className="ca-gallery__thumb"
                        onClick={() => setSide(i === 0 ? "obverse" : i === 1 ? "reverse" : side)}
                        aria-label={`Gallery image ${i + 1}`}
                      >
                        <img src={src} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-5 ca-reveal ca-reveal--delay-1">
              <div className="ca-mono mb-5" style={{ color: "var(--ca-gold-light)" }}>
                {country?.name[lang]} · {coin.year} · {coin.series[lang]}
              </div>
              <h1 data-testid={COIN_DETAIL.title} className="ca-detail-title">{coin.title[lang]}</h1>

              {coin.shortDescription && (
                <p className="ca-soft mt-6" style={{ fontSize: 17, lineHeight: 1.6, fontStyle: "italic" }}>
                  {coin.shortDescription[lang]}
                </p>
              )}

              {/* Historical */}
              <div data-testid={COIN_DETAIL.storyTab} className="mt-10">
                <div className="ca-section-id" style={{ marginBottom: 20 }}>
                  <span className="ca-section-id__num">i.</span>
                  <span className="ca-section-id__label">{t.detail.historical}</span>
                  <span className="ca-section-id__rule" />
                </div>
                {coin.historicalBackground[lang].map((p, i) => (
                  <p key={i} className="ca-soft" style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 18 }}>{p}</p>
                ))}
              </div>

              {/* Specifications */}
              <div data-testid={COIN_DETAIL.specsTab} className="mt-12">
                <div className="ca-section-id" style={{ marginBottom: 20 }}>
                  <span className="ca-section-id__num">ii.</span>
                  <span className="ca-section-id__label">{t.detail.specs}</span>
                  <span className="ca-section-id__rule" />
                </div>
                <dl className="ca-data-list" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                  <dt>{t.detail.value}</dt><dd>{coin.value}</dd>
                  <dt>{t.detail.coinType}</dt><dd>{coin.coinType[lang]}</dd>
                  <dt>{t.detail.designer}</dt><dd data-testid={COIN_DETAIL.designerTab}>{coin.designer}</dd>
                  <dt>{t.detail.releaseDate}</dt><dd>{releaseStr}</dd>
                  <dt>{t.detail.mintage}</dt><dd>{coin.mintage.toLocaleString(lang === "de" ? "de-DE" : "en-US")}</dd>
                  <dt>{t.detail.diameter}</dt><dd>{specs.diameter}</dd>
                  <dt>{t.detail.weight}</dt><dd>{specs.weight}</dd>
                  <dt>{t.detail.thickness}</dt><dd>{specs.thickness}</dd>
                  <dt>{t.detail.composition}</dt><dd>{specs.composition}</dd>
                  <dt>{t.detail.edge}</dt><dd>{specs.edge[lang]}</dd>
                  {coin.mint && (<><dt>{t.detail.mint}</dt><dd>{coin.mint} — {MINT_CITIES[coin.mint] || ""}</dd></>)}
                  {coin.mintMarks && coin.mintMarks.length > 1 && (
                    <>
                      <dt>{t.detail.mint} marks</dt>
                      <dd>{coin.mintMarks.join(" · ")}</dd>
                    </>
                  )}
                  <dt>{t.detail.series}</dt>
                  <dd>
                    {series ? (
                      <Link to={`/series/${series.slug}`} className="ca-breadcrumb__link" style={{ color: "var(--ca-gold-light)" }}>
                        {coin.series[lang]} <ArrowUpRight size={12} style={{ display: "inline", marginLeft: 2 }} />
                      </Link>
                    ) : coin.series[lang]}
                  </dd>
                  <dt>{t.detail.country}</dt>
                  <dd>
                    <Link to={`/countries/${coin.countryCode.toLowerCase()}`} className="ca-breadcrumb__link" style={{ color: "var(--ca-gold-light)" }}>
                      {country?.name[lang]} <ArrowUpRight size={12} style={{ display: "inline", marginLeft: 2 }} />
                    </Link>
                  </dd>
                </dl>
              </div>

              <button data-testid={COIN_DETAIL.submitImprove} className="ca-btn ca-btn--ghost ca-btn--sm mt-10">
                <Pencil size={12} />
                {t.detail.submitImprove}
              </button>
            </div>
          </div>

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
