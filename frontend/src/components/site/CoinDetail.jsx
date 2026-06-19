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
import useArtificialLoad from "@/hooks/useArtificialLoad";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SkeletonCoinDetail } from "./Skeleton";
import { getText, getParagraphs, getImageUrl, hasContent } from "./coinDetailHelpers";

const MINT_CITIES = { A: "Berlin", D: "Munich", F: "Stuttgart", G: "Karlsruhe", J: "Hamburg" };

const fmt = (value, fallback) => (value != null && value !== "" ? value : fallback);

const fmtMintage = (value, lang, fallback) => {
  if (value == null || value <= 0) return fallback;
  return value.toLocaleString(lang === "de" ? "de-DE" : "en-US");
};

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

const ProseSection = ({ num, label, testId, paragraphs, emptyText }) => (
  <section className="ca-section" style={{ paddingTop: 64, paddingBottom: 24 }}>
    <div className="ca-detail-prose ca-reveal">
      <div className="ca-section-id" style={{ marginBottom: 28 }}>
        <span className="ca-section-id__num">{num}</span>
        <span className="ca-section-id__label">{label}</span>
        <span className="ca-section-id__rule" />
      </div>
      {paragraphs.length > 0 ? (
        paragraphs.map((p, i) => <p key={i}>{p}</p>)
      ) : (
        <p className="ca-soft">{emptyText}</p>
      )}
    </div>
  </section>
);

export const CoinDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);
  const [side, setSide] = useState("obverse");
  const delayLoading = useArtificialLoad(450, slug);

  const coin = detail?.coin ?? null;
  const related = detail?.relatedCoins ?? [];
  const showSkeleton = apiLoading || delayLoading;

  useScrollReveal([showSkeleton, slug, coin?.slug]);

  useDocumentTitle(coin ? getText(coin.title, lang) : showSkeleton ? t.detail.breadcrumb : t.detail.notFound);

  useEffect(() => {
    let cancelled = false;
    setApiLoading(true);
    setSide("obverse");
    window.scrollTo({ top: 0, behavior: "instant" });

    getCoinDetail(slug).then((result) => {
      if (!cancelled) {
        setDetail(result);
        setApiLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [slug]);

  if (showSkeleton) {
    return (
      <div className="ca-page ca-detail-page" data-testid={COIN_DETAIL.page}>
        <Navbar />
        <article className="ca-section ca-detail-page__article">
          <div className="ca-container">
            <SkeletonCoinDetail />
          </div>
        </article>
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
  const mintageStr = fmtMintage(coin.mintage, lang, notRecorded);

  const eyebrowParts = [
    country?.name[lang] || coin.country,
    coin.year ? String(coin.year) : null,
    seriesLabel !== notRecorded ? seriesLabel : null,
  ].filter(Boolean);

  const gallerySources = coin.gallery?.length
    ? coin.gallery
    : [obverseSrc, reverseSrc].filter(Boolean);
  const galleryItems = gallerySources
    .map((src) => getImageUrl(src))
    .filter(Boolean);
  const hasGallery = galleryItems.length > 0;

  const galleryLabel = hasGallery ? "ii." : null;
  const specsLabel = hasGallery ? "iii." : "ii.";
  const relatedLabel = hasGallery ? "iv." : "iii.";

  return (
    <div className="ca-page ca-detail-page" data-testid={COIN_DETAIL.page}>
      <Navbar />

      <article className="ca-section ca-detail-page__article">
        <div className="ca-container">
          <nav data-testid={COIN_DETAIL.breadcrumb} className="ca-breadcrumb ca-reveal">
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

          <section className="ca-detail-hero">
            <div className="ca-detail-hero__media ca-reveal">
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
            </div>

            <div className="ca-detail-hero__info ca-reveal ca-reveal--delay-1">
              {eyebrowParts.length > 0 && (
                <div className="ca-detail-hero__eyebrow">{eyebrowParts.join(" · ")}</div>
              )}

              <h1 data-testid={COIN_DETAIL.title} className="ca-detail-title">{title}</h1>

              <p className="ca-detail-hero__lede">{shortDesc || notRecorded}</p>

              <div className="ca-detail-hero__divider" aria-hidden="true" />

              <div className="ca-detail-facts">
                <Fact label={t.detail.value}>{fmt(coin.value, notRecorded)}</Fact>
                <Fact label={t.detail.releaseDate}>{releaseStr}</Fact>
                <Fact label={t.detail.mintage}>{mintageStr}</Fact>
                <Fact label={t.detail.designer} testId={COIN_DETAIL.designerTab}>{fmt(coin.designer, notRecorded)}</Fact>
                <Fact label={t.detail.series}>
                  {series ? (
                    <Link to={`/series/${series.slug}`} className="ca-detail-facts__value--link">
                      {seriesLabel} <ArrowUpRight size={14} style={{ display: "inline", marginLeft: 2 }} />
                    </Link>
                  ) : seriesLabel}
                </Fact>
                <Fact label={t.detail.country}>
                  {countryCode ? (
                    <Link to={`/countries/${countryCode}`} className="ca-detail-facts__value--link">
                      {country?.name[lang] || coin.country || notRecorded} <ArrowUpRight size={14} style={{ display: "inline", marginLeft: 2 }} />
                    </Link>
                  ) : (country?.name[lang] || coin.country || notRecorded)}
                </Fact>
              </div>

              <button data-testid={COIN_DETAIL.submitImprove} className="ca-btn ca-btn--ghost ca-btn--sm" style={{ marginTop: 36 }} type="button">
                <Pencil size={12} />
                {t.detail.submitImprove}
              </button>
            </div>
          </section>

          <ProseSection
            num="i."
            label={t.detail.historical}
            testId={COIN_DETAIL.storyTab}
            paragraphs={historicalParagraphs}
            emptyText={t.detail.noHistorical}
          />

          {(obverseParagraphs.length > 0 || hasContent(coin.obverseDescription, lang)) && (
            <ProseSection
              num="i.a."
              label={t.detail.obverseDesc}
              testId="coin-detail-obverse-desc"
              paragraphs={obverseParagraphs}
              emptyText={notRecorded}
            />
          )}

          {(reverseParagraphs.length > 0 || hasContent(coin.reverseDescription, lang)) && (
            <ProseSection
              num="i.b."
              label={t.detail.reverseDesc}
              testId="coin-detail-reverse-desc"
              paragraphs={reverseParagraphs}
              emptyText={notRecorded}
            />
          )}

          {hasContent(coin.collectorNotes, lang) && (
            <ProseSection
              num="i.c."
              label={t.detail.collectorNotes}
              testId="coin-detail-collector-notes"
              paragraphs={collectorParagraphs}
              emptyText={notRecorded}
            />
          )}

          {hasGallery && (
            <section className="ca-section" style={{ paddingTop: 24, paddingBottom: 24 }}>
              <div className="ca-detail-prose ca-reveal">
                <div className="ca-section-id" style={{ marginBottom: 24 }}>
                  <span className="ca-section-id__num">{galleryLabel}</span>
                  <span className="ca-section-id__label">{t.detail.gallery}</span>
                  <span className="ca-section-id__rule" />
                </div>
                <div className="ca-detail-gallery">
                  {galleryItems.map((url, i) => (
                    <button
                      key={`${url}-${i}`}
                      type="button"
                      data-testid={COIN_DETAIL.galleryItem(i)}
                      className="ca-gallery__thumb"
                      onClick={() => {
                        if (url === obverseSrc) setSide("obverse");
                        else if (url === reverseSrc) setSide("reverse");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      aria-label={`${t.detail.gallery} ${i + 1}`}
                    >
                      <img src={url} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section data-testid={COIN_DETAIL.specsTab} className="ca-section" style={{ paddingTop: 64, paddingBottom: 24 }}>
            <div className="ca-section-id ca-reveal" style={{ marginBottom: 28 }}>
              <span className="ca-section-id__num">{specsLabel}</span>
              <span className="ca-section-id__label">{t.detail.specs}</span>
              <span className="ca-section-id__rule" />
            </div>
            <div className="ca-data-list--wide ca-reveal">
              <Spec label={t.detail.value}>{fmt(coin.value, notRecorded)}</Spec>
              <Spec label={t.detail.coinType}>{coinTypeLabel}</Spec>
              <Spec label={t.detail.coinCode}>{fmt(coin.coinCode, notRecorded)}</Spec>
              <Spec label={t.detail.releaseDate}>{releaseStr}</Spec>
              <Spec label={t.detail.mintage}>{mintageStr}</Spec>
              <Spec label={t.detail.designer}>{fmt(coin.designer, notRecorded)}</Spec>
              <Spec label={t.detail.diameter}>{fmt(specs.diameter, notRecorded)}</Spec>
              <Spec label={t.detail.weight}>{fmt(specs.weight, notRecorded)}</Spec>
              <Spec label={t.detail.thickness}>{fmt(specs.thickness, notRecorded)}</Spec>
              <Spec label={t.detail.composition}>{fmt(specs.composition, notRecorded)}</Spec>
              {specs.quality && <Spec label={lang === "de" ? "Qualität" : "Quality"}>{specs.quality}</Spec>}
              <Spec label={t.detail.edge}>{edgeLabel}</Spec>
              <Spec label={t.detail.mint}>{coin.mint ? `${coin.mint} — ${MINT_CITIES[coin.mint] || notRecorded}` : notRecorded}</Spec>
              <Spec label={`${t.detail.mint} marks`}>{coin.mintMarks?.length ? coin.mintMarks.join(" · ") : notRecorded}</Spec>
              <Spec label={t.detail.series}>
                {series ? (
                  <Link to={`/series/${series.slug}`} className="ca-detail-facts__value--link">
                    {seriesLabel} <ArrowUpRight size={12} style={{ display: "inline", marginLeft: 2 }} />
                  </Link>
                ) : seriesLabel}
              </Spec>
              <Spec label={t.detail.country}>
                {countryCode ? (
                  <Link to={`/countries/${countryCode}`} className="ca-detail-facts__value--link">
                    {country?.name[lang] || coin.country || notRecorded} <ArrowUpRight size={12} style={{ display: "inline", marginLeft: 2 }} />
                  </Link>
                ) : (country?.name[lang] || coin.country || notRecorded)}
              </Spec>
            </div>
          </section>

          <section className="ca-section ca-detail-related" style={{ paddingTop: 64, paddingBottom: 0 }}>
            <div className="ca-section-id ca-reveal" style={{ marginBottom: 32 }}>
              <span className="ca-section-id__num">{relatedLabel}</span>
              <span className="ca-section-id__label">{t.detail.related}</span>
              <span className="ca-section-id__rule" />
              <span className="ca-section-id__meta">{country?.name[lang] || coin.country}</span>
            </div>
            {related.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 ca-reveal">
                {related.map((c) => (
                  <CoinCard key={c.slug} coin={c} testId={COIN_DETAIL.related(c.slug)} />
                ))}
              </div>
            ) : (
              <p className="ca-soft ca-detail-copy ca-detail-copy--muted ca-reveal">{notRecorded}</p>
            )}
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default CoinDetail;
