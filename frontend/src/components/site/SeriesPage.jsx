import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { getSeriesList } from "@/services/coinArchiveService";
import { SERIES_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const SeriesPage = () => {
  useScrollReveal();
  const { t, lang } = useLang();
  useDocumentTitle(t.seriesPage.title);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getSeriesList().then((result) => {
      if (!cancelled) {
        setItems(result.items);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="ca-page" data-testid={SERIES_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <SectionId num="II" label={t.seriesPage.eyebrow} meta={`${items.length} series`} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>{t.seriesPage.title}</h1>
            </div>
            <p className="md:col-span-5 ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>{t.seriesPage.sub}</p>
          </div>
        </div>
      </header>

      <main className="ca-section" aria-busy={loading}>
        <div className="ca-container">
          {loading ? (
            <div className="ca-mono">{lang === "de" ? "Lädt…" : "Loading…"}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((s, i) => (
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
                    <span className="ca-mono">{s.coinCount ?? 0} / {s.count} {t.seriesPage.coinsCount}</span>
                    <span className="ca-series-card__cta">
                      View <ArrowUpRight size={14} />
                    </span>
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

export default SeriesPage;
