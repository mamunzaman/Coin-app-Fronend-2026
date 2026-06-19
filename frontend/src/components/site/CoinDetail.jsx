import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Pencil } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { findCountry, findSeries, getCoinDetail, COINS } from "@/services/coinArchiveService";
import { COIN_DETAIL } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CoinCard from "./CoinCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const MINT_CITIES = { A: "Berlin", D: "Munich", F: "Stuttgart", G: "Karlsruhe", J: "Hamburg" };

const loc = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || field.de || "";
};

const fmt = (value, fallback) => (value != null && value !== "" ? value : fallback);

const fmtMintage = (value, lang, fallback) => {
  if (value == null || value <= 0) return fallback;
  return value.toLocaleString(lang === "de" ? "de-DE" : "en-US");
};

const StoryBlock = ({ label, num, testId, paragraphs, emptyText }) => (
  <div data-testid={testId} className="mt-10">
    <div className="ca-section-id" style={{ marginBottom: 20 }}>
      <span className="ca-section-id__num">{num}</span>
      <span className="ca-section-id__label">{label}</span>
      <span className="ca-section-id__rule" />
    </div>
    {paragraphs.length > 0 ? (
      paragraphs.map((p, i) => (
        <p key={i} className="ca-soft" style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 18 }}>{p}</p>
      ))
    ) : (
      <p className="ca-soft" style={{ fontSize: 15, lineHeight: 1.7 }}>{emptyText}</p>
    )}
  </div>
);

export const CoinDetail = () => {
  useScrollReveal();
  const { slug } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState("obverse");

  const coin = detail?.coin ?? null;
  const related = detail?.relatedCoins ?? [];

  useDocumentTitle(coin ? loc(coin.title, lang) : loading ? t.detail.breadcrumb : t.detail.notFound);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setSide("obverse");
    window.scrollTo({ top: 0, behavior: "instant" });

    getCoinDetail(slug).then((result) => {
      if (!cancelled) {
        setDetail(result);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="ca-page" data-testid={COIN_DETAIL.page}>
        <Navbar />
        <div className="ca-container ca-section" style={{ minHeight: 400 }} aria-busy="true" />
        <Footer />
      </div>
    );
  }

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
  const plateIdx = (coin.plateIndex ?? (COINS.findIndex((c) => c.slug === coin.slug) + 1)) || 1;
  const specs = coin.specifications || {};
  const notRecorded = t.detail.notRecorded;

  const obverseSrc = coin.obverseImage || "";
  const reverseSrc = coin.reverseImage || coin.obverseImage || "";
  const activeSrc = side === "obverse" ? obverseSrc : reverseSrc;
  const hasImage = Boolean(activeSrc);

  const historicalParagraphs = coin.historicalBackground?.[lang]?.length
    ? coin.historicalBackground[lang]
    : coin.historicalBackground?.en || [];

  const obverseParagraphs = splitParagraphs(loc(coin.obverseDescription, lang));
  const reverseParagraphs = splitParagraphs(loc(coin.reverseDescription, lang));
  const collectorParagraphs = splitParagraphs(loc(coin.collectorNotes, lang));
  const shortDesc = loc(coin.shortDescription, lang);

  const releaseRaw = coin.releaseDate;
  const releaseStr = releaseRaw
    ? new Date(releaseRaw).toLocaleDateString(lang === "de" ? "de-DE" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : notRecorded;

  const countryCode = (coin.countryCode || "").toLowerCase();
  const seriesLabel = loc(coin.series, lang) || notRecorded;
  const coinTypeLabel = loc(coin.coinType, lang) || notRecorded;
  const edgeLabel = loc(specs.edge, lang) || notRecorded;

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
            {countryCode && (
              <>
                <span className="ca-breadcrumb__sep">/</span>
                <Link to={`/countries/${countryCode}`} className="ca-breadcrumb__link">
                  {country?.name[lang] || coin.country}
                </Link>
              </>
            )}
            <span className="ca-breadcrumb__sep">/</span>
            <span className="ca-breadcrumb__current">{coin.year || notRecorded}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-10">
            <div className="lg:col-span-7 ca-reveal" style={{ position: "sticky", top: 100 }}>
              <div className={`ca-detail-coin ${hasImage ? "" : "ca-detail-coin--empty"}`}>
                {hasImage ? (
                  <img
                    data-testid={side === "obverse" ? COIN_DETAIL.obverse : COIN_DETAIL.reverse}
                    src={activeSrc}
                    alt={`${loc(coin.title, lang)} — ${side === "obverse" ? t.detail.obverse : t.detail.reverse}`}
                  />
                ) : (
                  <div className="ca-detail-coin__placeholder" aria-hidden="true">
                    <span className="ca-detail-coin__placeholder-code">{coin.countryCode || "EU"}</span>
                    <span className="ca-detail-coin__placeholder-year">{coin.year || "—"}</span>
                  </div>
                )}
              </div>

              <div className="ca-detail-toggle">
                <button
                  data-testid={COIN_DETAIL.toggleObverse}
                  onClick={() => setSide("obverse")}
                  className={`ca-detail-toggle__btn ${side === "obverse" ? "is-active" : ""}`}
                  aria-pressed={side === "obverse"}
                  disabled={!obverseSrc}
                >
                  {t.detail.obverse}
                </button>
                <button
                  data-testid={COIN_DETAIL.toggleReverse}
                  onClick={() => setSide("reverse")}
                  className={`ca-detail-toggle__btn ${side === "reverse" ? "is-active" : ""}`}
                  aria-pressed={side === "reverse"}
                  disabled={!reverseSrc}
                >
                  {t.detail.reverse}
                </button>
              </div>

              <div className="ca-detail-plate ca-mono">
                <span>{t.detail.plate} {String(plateIdx).padStart(3, "0")}</span>
                <span className="sep" aria-hidden="true" />
                <strong>{coin.countryCode || "—"} · {coin.year || "—"}</strong>
                {coin.mint && (<><span className="sep" aria-hidden="true" /><span>Mint {coin.mint}</span></>)}
              </div>

              {coin.gallery?.length > 0 && (
                <div className="ca-gallery mt-10">
                  <div className="ca-mono mb-3">{t.detail.gallery}</div>
                  <div className="ca-gallery__grid">
                    {coin.gallery.map((src, i) => (
                      <button
                        key={`${src}-${i}`}
                        data-testid={COIN_DETAIL.galleryItem(i)}
                        className="ca-gallery__thumb"
                        onClick={() => {
                          if (i === 0 && obverseSrc) setSide("obverse");
                          else if (i === 1 && reverseSrc) setSide("reverse");
                        }}
                        aria-label={`${t.detail.gallery} ${i + 1}`}
                        type="button"
                      >
                        <img src={src} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 ca-reveal ca-reveal--delay-1">
              <div className="ca-mono mb-5" style={{ color: "var(--ca-gold-light)" }}>
                {country?.name[lang] || coin.country || notRecorded} · {coin.year || notRecorded} · {seriesLabel}
              </div>
              <h1 data-testid={COIN_DETAIL.title} className="ca-detail-title">{loc(coin.title, lang) || notRecorded}</h1>

              {shortDesc && (
                <p className="ca-soft mt-6" style={{ fontSize: 17, lineHeight: 1.6, fontStyle: "italic" }}>
                  {shortDesc}
                </p>
              )}

              <StoryBlock
                label={t.detail.historical}
                num="i."
                testId={COIN_DETAIL.storyTab}
                paragraphs={historicalParagraphs}
                emptyText={t.detail.noHistorical}
              />

              {(obverseParagraphs.length > 0 || reverseParagraphs.length > 0) && (
                <div className="mt-10">
                  {obverseParagraphs.length > 0 && (
                    <div className="mb-8">
                      <div className="ca-mono mb-3" style={{ color: "var(--ca-gold-light)" }}>{t.detail.obverseDesc}</div>
                      {obverseParagraphs.map((p, i) => (
                        <p key={`ov-${i}`} className="ca-soft" style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>{p}</p>
                      ))}
                    </div>
                  )}
                  {reverseParagraphs.length > 0 && (
                    <div>
                      <div className="ca-mono mb-3" style={{ color: "var(--ca-gold-light)" }}>{t.detail.reverseDesc}</div>
                      {reverseParagraphs.map((p, i) => (
                        <p key={`rv-${i}`} className="ca-soft" style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 14 }}>{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {collectorParagraphs.length > 0 && (
                <StoryBlock
                  label={t.detail.collectorNotes}
                  num="i.b."
                  testId="coin-detail-collector-notes"
                  paragraphs={collectorParagraphs}
                  emptyText={notRecorded}
                />
              )}

              <div data-testid={COIN_DETAIL.specsTab} className="mt-12">
                <div className="ca-section-id" style={{ marginBottom: 20 }}>
                  <span className="ca-section-id__num">ii.</span>
                  <span className="ca-section-id__label">{t.detail.specs}</span>
                  <span className="ca-section-id__rule" />
                </div>
                <dl className="ca-data-list" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                  <dt>{t.detail.value}</dt><dd>{fmt(coin.value, notRecorded)}</dd>
                  <dt>{t.detail.coinType}</dt><dd>{coinTypeLabel}</dd>
                  {coin.coinCode && (<><dt>{t.detail.coinCode}</dt><dd>{coin.coinCode}</dd></>)}
                  <dt>{t.detail.designer}</dt><dd data-testid={COIN_DETAIL.designerTab}>{fmt(coin.designer, notRecorded)}</dd>
                  <dt>{t.detail.releaseDate}</dt><dd>{releaseStr}</dd>
                  <dt>{t.detail.mintage}</dt><dd>{fmtMintage(coin.mintage, lang, notRecorded)}</dd>
                  <dt>{t.detail.diameter}</dt><dd>{fmt(specs.diameter, notRecorded)}</dd>
                  <dt>{t.detail.weight}</dt><dd>{fmt(specs.weight, notRecorded)}</dd>
                  <dt>{t.detail.thickness}</dt><dd>{fmt(specs.thickness, notRecorded)}</dd>
                  <dt>{t.detail.composition}</dt><dd>{fmt(specs.composition, notRecorded)}</dd>
                  {specs.quality && (<><dt>{lang === "de" ? "Qualität" : "Quality"}</dt><dd>{specs.quality}</dd></>)}
                  <dt>{t.detail.edge}</dt><dd>{edgeLabel}</dd>
                  {coin.mint && (<><dt>{t.detail.mint}</dt><dd>{coin.mint} — {MINT_CITIES[coin.mint] || notRecorded}</dd></>)}
                  {coin.mintMarks?.length > 1 && (
                    <>
                      <dt>{t.detail.mint} marks</dt>
                      <dd>{coin.mintMarks.join(" · ")}</dd>
                    </>
                  )}
                  <dt>{t.detail.series}</dt>
                  <dd>
                    {series ? (
                      <Link to={`/series/${series.slug}`} className="ca-breadcrumb__link" style={{ color: "var(--ca-gold-light)" }}>
                        {seriesLabel} <ArrowUpRight size={12} style={{ display: "inline", marginLeft: 2 }} />
                      </Link>
                    ) : seriesLabel}
                  </dd>
                  <dt>{t.detail.country}</dt>
                  <dd>
                    {countryCode ? (
                      <Link to={`/countries/${countryCode}`} className="ca-breadcrumb__link" style={{ color: "var(--ca-gold-light)" }}>
                        {country?.name[lang] || coin.country || notRecorded} <ArrowUpRight size={12} style={{ display: "inline", marginLeft: 2 }} />
                      </Link>
                    ) : (country?.name[lang] || coin.country || notRecorded)}
                  </dd>
                </dl>
              </div>

              <button data-testid={COIN_DETAIL.submitImprove} className="ca-btn ca-btn--ghost ca-btn--sm mt-10" type="button">
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
                <span className="ca-section-id__meta">{country?.name[lang] || coin.country}</span>
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

function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default CoinDetail;
