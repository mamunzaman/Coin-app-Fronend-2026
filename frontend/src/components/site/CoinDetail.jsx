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
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useArtificialLoad from "@/hooks/useArtificialLoad";
import { SkeletonCoinDetail } from "./Skeleton";

const MINT_CITIES = { A: "Berlin", D: "Munich", F: "Stuttgart", G: "Karlsruhe", J: "Hamburg" };

const Fact = ({ label, children, testId }) => (
  <div className="ca-detail-facts__cell" data-testid={testId}>
    <div className="ca-detail-facts__label">{label}</div>
    <div className="ca-detail-facts__value">{children}</div>
  </div>
);

const Spec = ({ label, children }) => (
  <div className="ca-spec-cell">
    <span className="ca-spec-cell__label">{label}</span>
    <span className="ca-spec-cell__value">{children}</span>
  </div>
);

export const CoinDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const coin = findCoinBySlug(slug);
  const [side, setSide] = useState("obverse");
  const loading = useArtificialLoad(450);
  useScrollReveal(loading);
  useDocumentTitle(coin ? coin.title[lang] : t.detail.notFound);

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
  const related = relatedCoins(coin.slug, 4);
  const plateIdx = COINS.findIndex((c) => c.slug === coin.slug) + 1;
  const specs = coin.specifications;

  const releaseStr = coin.releaseDate
    ? new Date(coin.releaseDate).toLocaleDateString(lang === "de" ? "de-DE" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : "—";
  const mintageStr = coin.mintage.toLocaleString(lang === "de" ? "de-DE" : "en-US");

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

          {loading ? (
            <SkeletonCoinDetail />
          ) : (
            <>
              {/* ============ HERO (asymmetric: image left, info right) ============ */}
              <section className="ca-detail-hero">
                <div className="ca-detail-hero__media ca-reveal">
                  <div className="ca-detail-coin ca-float">
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
                </div>

                <div className="ca-detail-hero__info ca-reveal ca-reveal--delay-1">
                  <div className="ca-detail-hero__eyebrow">
                    {country?.name[lang]} · {coin.year} · {coin.series[lang]}
                  </div>
                  <h1 data-testid={COIN_DETAIL.title} className="ca-detail-title">{coin.title[lang]}</h1>

                  {coin.shortDescription && (
                    <p className="ca-detail-hero__lede">
                      {coin.shortDescription[lang]}
                    </p>
                  )}

                  <div className="ca-detail-hero__divider" aria-hidden="true" />

                  <div className="ca-detail-facts">
                    <Fact label={t.detail.value}>{coin.value}</Fact>
                    <Fact label={t.detail.releaseDate}>{coin.year}</Fact>
                    <Fact label={t.detail.mintage}>{mintageStr}</Fact>
                    <Fact label={t.detail.designer} testId={COIN_DETAIL.designerTab}>
                      {coin.designer}
                    </Fact>
                    <Fact label={t.detail.series}>
                      {series ? (
                        <Link to={`/series/${series.slug}`} className="ca-detail-facts__value--link">
                          {coin.series[lang]} <ArrowUpRight size={14} style={{ display: "inline", marginLeft: 2 }} />
                        </Link>
                      ) : coin.series[lang]}
                    </Fact>
                    <Fact label={t.detail.country}>
                      <Link to={`/countries/${coin.countryCode.toLowerCase()}`} className="ca-detail-facts__value--link">
                        {country?.name[lang]} <ArrowUpRight size={14} style={{ display: "inline", marginLeft: 2 }} />
                      </Link>
                    </Fact>
                  </div>

                  <button data-testid={COIN_DETAIL.submitImprove} className="ca-btn ca-btn--ghost ca-btn--sm" style={{ marginTop: 36 }}>
                    <Pencil size={12} />
                    {t.detail.submitImprove}
                  </button>
                </div>
              </section>

              {/* ============ HISTORICAL BACKGROUND (centered prose) ============ */}
              <section data-testid={COIN_DETAIL.storyTab} className="ca-section" style={{ paddingTop: 96, paddingBottom: 24 }}>
                <div className="ca-detail-prose">
                  <div className="ca-section-id" style={{ marginBottom: 28 }}>
                    <span className="ca-section-id__num">i.</span>
                    <span className="ca-section-id__label">{t.detail.historical}</span>
                    <span className="ca-section-id__rule" />
                  </div>
                  {coin.historicalBackground[lang].map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              {/* ============ GALLERY (if available) ============ */}
              {coin.gallery && coin.gallery.length > 0 && (
                <section className="ca-section" style={{ paddingTop: 24, paddingBottom: 24 }}>
                  <div className="ca-detail-prose">
                    <div className="ca-section-id" style={{ marginBottom: 24 }}>
                      <span className="ca-section-id__num">ii.</span>
                      <span className="ca-section-id__label">{t.detail.gallery}</span>
                      <span className="ca-section-id__rule" />
                    </div>
                    <div className="ca-detail-gallery">
                      {coin.gallery.map((src, i) => (
                        <button
                          key={i}
                          data-testid={COIN_DETAIL.galleryItem(i)}
                          className="ca-gallery__thumb"
                          onClick={() => {
                            if (i === 0) setSide("obverse");
                            if (i === 1) setSide("reverse");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          aria-label={`Gallery image ${i + 1}`}
                        >
                          <img src={src} alt="" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ============ TECHNICAL SPECIFICATIONS (3-col wide slab) ============ */}
              <section data-testid={COIN_DETAIL.specsTab} className="ca-section" style={{ paddingTop: 64, paddingBottom: 24 }}>
                <div className="ca-section-id" style={{ marginBottom: 28 }}>
                  <span className="ca-section-id__num">{coin.gallery && coin.gallery.length > 0 ? "iii." : "ii."}</span>
                  <span className="ca-section-id__label">{t.detail.specs}</span>
                  <span className="ca-section-id__rule" />
                </div>
                <div className="ca-data-list--wide">
                  <Spec label={t.detail.value}>{coin.value}</Spec>
                  <Spec label={t.detail.coinType}>{coin.coinType[lang]}</Spec>
                  <Spec label={t.detail.releaseDate}>{releaseStr}</Spec>
                  <Spec label={t.detail.mintage}>{mintageStr}</Spec>
                  <Spec label={t.detail.diameter}>{specs.diameter}</Spec>
                  <Spec label={t.detail.weight}>{specs.weight}</Spec>
                  <Spec label={t.detail.thickness}>{specs.thickness}</Spec>
                  <Spec label={t.detail.composition}>{specs.composition}</Spec>
                  <Spec label={t.detail.edge}>{specs.edge[lang]}</Spec>
                  {coin.mint && (
                    <Spec label={t.detail.mint}>{coin.mint} — {MINT_CITIES[coin.mint] || ""}</Spec>
                  )}
                  {coin.mintMarks && coin.mintMarks.length > 1 && (
                    <Spec label={`${t.detail.mint} marks`}>{coin.mintMarks.join(" · ")}</Spec>
                  )}
                </div>
              </section>

              {/* ============ RELATED COINS (bottom strip) ============ */}
              {related.length > 0 && (
                <section className="ca-section" style={{ paddingTop: 64, paddingBottom: 0 }}>
                  <div className="ca-section-id" style={{ marginBottom: 32 }}>
                    <span className="ca-section-id__num">
                      {coin.gallery && coin.gallery.length > 0 ? "iv." : "iii."}
                    </span>
                    <span className="ca-section-id__label">{t.detail.related}</span>
                    <span className="ca-section-id__rule" />
                    <span className="ca-section-id__meta">{country?.name[lang]}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {related.map((c) => (
                      <CoinCard key={c.slug} coin={c} testId={COIN_DETAIL.related(c.slug)} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default CoinDetail;
