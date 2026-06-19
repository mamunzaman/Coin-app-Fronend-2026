import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SERIES_LIST, coinsBySeries } from "@/data/coinData";
import { SERIES_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useArtificialLoad from "@/hooks/useArtificialLoad";
import { SkeletonSeriesCard } from "./Skeleton";

export const SeriesPage = () => {
  const { t, lang } = useLang();
  useDocumentTitle(t.seriesPage.title);
  const loading = useArtificialLoad(420);
  useScrollReveal(loading);

  return (
    <div className="ca-page" data-testid={SERIES_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <SectionId num="II" label={t.seriesPage.eyebrow} meta={`${SERIES_LIST.length} series`} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>{t.seriesPage.title}</h1>
            </div>
            <p className="md:col-span-5 ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>{t.seriesPage.sub}</p>
          </div>
        </div>
      </header>

      <main className="ca-section">
        <div className="ca-container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-busy="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonSeriesCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ca-reveal ca-stagger">
            {SERIES_LIST.map((s, i) => {
              const coins = coinsBySeries(s.slug);
              return (
                <Link
                  key={s.slug}
                  to={`/series/${s.slug}`}
                  data-testid={SERIES_PAGE.card(s.slug)}
                  className={`ca-series-card ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
                  style={{ ["--series-accent"]: s.accent }}
                >
                  <div className="ca-series-card__head">
                    <div className="ca-series-card__num">{String(i + 1).padStart(2, "0")}.</div>
                    <div className="ca-mono">{s.range}</div>
                  </div>
                  <h3 className="ca-series-card__title">{s.name[lang]}</h3>
                  <p className="ca-series-card__desc">{s.description[lang]}</p>
                  <div className="ca-series-card__foot">
                    <span className="ca-mono">{coins.length} / {s.count} {t.seriesPage.coinsCount}</span>
                    <span className="ca-series-card__cta">
                      View <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeriesPage;
