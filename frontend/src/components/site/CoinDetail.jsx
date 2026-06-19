import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Pencil } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { findCountry, findSeries, getCoinDetail, COINS } from "@/services/coinArchiveService";
import { COIN_DETAIL } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CoinCard from "./CoinCard";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { getText, getParagraphs, getImageUrl, hasContent } from "./coinDetailHelpers";

const MINT_CITIES = { A: "Berlin", D: "Munich", F: "Stuttgart", G: "Karlsruhe", J: "Hamburg" };

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
        <p key={i} className="ca-soft ca-detail-copy">{p}</p>
      ))
    ) : (
      <p className="ca-soft ca-detail-copy ca-detail-copy--muted">{emptyText}</p>
    )}
  </div>
);

export const CoinDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState("obverse");

  const coin = detail?.coin ?? null;
  const related = detail?.relatedCoins ?? [];

  useDocumentTitle(coin ? getText(coin.title, lang) : loading ? t.detail.breadcrumb : t.detail.notFound);

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
        <div className="ca-container ca-section ca-detail-loading" aria-busy="true">
          <p className="ca-mono">{lang === "de" ? "Lädt…" : "Loading…"}</p>
        </div>
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

  const obverseSrc = getImageUrl(coin.obverseImage);
  const reverseSrc = getImageUrl(coin.reverseImage) || obverseSrc;
  const activeSrc = side === "obverse" ? obverseSrc : reverseSrc;
  const hasImage = Boolean(activeSrc);

  const title = getText(coin.title, lang) || notRecorded;
  const shortDesc = getText(coin.shortDescription, lang);
  const historicalParagraphs = getParagraphs(coin.historicalBackground?.[lang] ?? coin.historicalBackground?.en ?? coin.historicalBackground, lang);
  const obverseParagraphs = getParagraphs(coin.obverseDescription, lang);
  const reverseParagraphs = getParagraphs(coin.reverseDescription, lang);
  const collectorParagraphs = getParagraphs(coin.collectorNotes, lang);

  const releaseRaw = coin.releaseDate;
  const releaseStr = releaseRaw
    ? new Date(releaseRaw).toLocaleDateString(lang === "de" ? "de-DE" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : notRecorded;

  const countryCode = (coin.countryCode || "").toLowerCase();
  const seriesLabel = getText(coin.series, lang) || notRecorded;
  const coinTypeLabel = getText(coin.coinType, lang) || notRecorded;
  const edgeLabel = getText(specs.edge, lang) || notRecorded;
  const metaChips = [
    country?.name[lang] || coin.country,
    coin.year ? String(coin.year) : null,
    seriesLabel !== notRecorded ? seriesLabel : null,
    coin.mint ? `Mint ${coin.mint}` : null,
  ].filter(Boolean);

  return (
    <div className="ca-page ca-detail-page" data-testid={COIN_DETAIL.page}>
      <Navbar />

      <article className="ca-section ca-detail-page__article">
        <div className="ca-container">
          <nav data-testid={COIN_DETAIL.breadcrumb} className="ca-breadcrumb">
            <button onClick={() => navigate(-1)} data-testid={COIN_DETAIL.back} className="ca-breadcrumb__back" type="button">
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
            <div className="lg:col-span-7">
              <div className={`ca-detail-coin ${hasImage ? "" : "ca-detail-coin--empty"}`}>
                {hasImage ? (
                  <img
                    data-testid={side === "obverse" ? COIN_DETAIL.obverse : COIN_DETAIL.reverse}
                    src={activeSrc}
                    alt={`${title} — ${side === "obverse" ? t.detail.obverse : t.detail.reverse}`}
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
                  type="button"
                  data-testid={COIN_DETAIL.toggleObverse}
                  onClick={() => setSide("obverse")}
                  className={`ca-detail-toggle__btn ${side === "obverse" ? "is-active" : ""}`}
                  aria-pressed={side === "obverse"}
                  disabled={!obverseSrc}
                >
                  {t.detail.obverse}
                </button>
                <button
                  type="button"
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

              {(coin.gallery?.length > 0 || obverseSrc || reverseSrc) && (
                <div className="ca-gallery mt-10">
                  <div className="ca-mono mb-3">{t.detail.gallery}</div>
                  <div className="ca-gallery__grid">
                    {(coin.gallery?.length ? coin.gallery : [obverseSrc, reverseSrc].filter(Boolean)).map((src, i) => {
                      const url = getImageUrl(src);
                      if (!url) return null;
                      return (
                        <button
                          key={`${url}-${i}`}
                          type="button"
                          data-testid={COIN_DETAIL.galleryItem(i)}
                          className="ca-gallery__thumb"
                          onClick={() => {
                            if (url === obverseSrc) setSide("obverse");
                            else if (url === reverseSrc) setSide("reverse");
                          }}
                          aria-label={`${t.detail.gallery} ${i + 1}`}
                        >
                          <img src={url} alt="" loading="lazy" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 ca-detail-page__content">
              {metaChips.length > 0 && (
                <div className="ca-detail-meta-chips">
                  {metaChips.map((chip) => (
                    <span key={chip} className="ca-detail-meta-chip ca-mono">{chip}</span>
                  ))}
                </div>
              )}

              <h1 data-testid={COIN_DETAIL.title} className="ca-detail-title">{title}</h1>

              <p className="ca-soft ca-detail-lead">
                {shortDesc || notRecorded}
              </p>

              <StoryBlock
                label={t.detail.historical}
                num="i."
                testId={COIN_DETAIL.storyTab}
                paragraphs={historicalParagraphs}
                emptyText={t.detail.noHistorical}
              />

              <StoryBlock
                label={t.detail.obverseDesc}
                num="i.a."
                testId="coin-detail-obverse-desc"
                paragraphs={obverseParagraphs}
                emptyText={notRecorded}
              />

              <StoryBlock
                label={t.detail.reverseDesc}
                num="i.b."
                testId="coin-detail-reverse-desc"
                paragraphs={reverseParagraphs}
                emptyText={notRecorded}
              />

              {hasContent(coin.collectorNotes, lang) && (
                <StoryBlock
                  label={t.detail.collectorNotes}
                  num="i.c."
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
                <dl className="ca-data-list ca-detail-specs">
                  <dt>{t.detail.value}</dt><dd>{fmt(coin.value, notRecorded)}</dd>
                  <dt>{t.detail.coinType}</dt><dd>{coinTypeLabel}</dd>
                  <dt>{t.detail.coinCode}</dt><dd>{fmt(coin.coinCode, notRecorded)}</dd>
                  <dt>{t.detail.designer}</dt><dd data-testid={COIN_DETAIL.designerTab}>{fmt(coin.designer, notRecorded)}</dd>
                  <dt>{t.detail.releaseDate}</dt><dd>{releaseStr}</dd>
                  <dt>{t.detail.mintage}</dt><dd>{fmtMintage(coin.mintage, lang, notRecorded)}</dd>
                  <dt>{t.detail.diameter}</dt><dd>{fmt(specs.diameter, notRecorded)}</dd>
                  <dt>{t.detail.weight}</dt><dd>{fmt(specs.weight, notRecorded)}</dd>
                  <dt>{t.detail.thickness}</dt><dd>{fmt(specs.thickness, notRecorded)}</dd>
                  <dt>{t.detail.composition}</dt><dd>{fmt(specs.composition, notRecorded)}</dd>
                  {specs.quality && (<><dt>{lang === "de" ? "Qualität" : "Quality"}</dt><dd>{specs.quality}</dd></>)}
                  <dt>{t.detail.edge}</dt><dd>{edgeLabel}</dd>
                  <dt>{t.detail.mint}</dt><dd>{coin.mint ? `${coin.mint} — ${MINT_CITIES[coin.mint] || notRecorded}` : notRecorded}</dd>
                  <dt>{t.detail.mint} marks</dt><dd>{coin.mintMarks?.length ? coin.mintMarks.join(" · ") : notRecorded}</dd>
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

          <section className="mt-32 ca-detail-related">
            <div className="ca-section-id">
              <span className="ca-section-id__num">iii.</span>
              <span className="ca-section-id__label">{t.detail.related}</span>
              <span className="ca-section-id__rule" />
              <span className="ca-section-id__meta">{country?.name[lang] || coin.country}</span>
            </div>
            {related.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8">
                {related.map((c) => (
                  <CoinCard key={c.slug} coin={c} testId={COIN_DETAIL.related(c.slug)} />
                ))}
              </div>
            ) : (
              <p className="ca-soft ca-detail-copy ca-detail-copy--muted mt-8">{notRecorded}</p>
            )}
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default CoinDetail;
