import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { LEARN_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const LearnPage = () => {
  useScrollReveal();
  const { t } = useLang();
  useDocumentTitle(t.learn.title);
  const articles = t.learn.articles;
  const [hero, ...rest] = articles;

  return (
    <div className="ca-page" data-testid={LEARN_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <SectionId num="II" label={t.learn.eyebrow} meta={`${articles.length} pieces`} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>{t.learn.title}</h1>
            </div>
            <p className="md:col-span-5 ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>{t.learn.sub}</p>
          </div>
        </div>
      </header>

      <main className="ca-section">
        <div className="ca-container">
          {/* Featured */}
          <article
            data-testid={LEARN_PAGE.card(hero.slug)}
            className="ca-learn-feature ca-reveal"
          >
            <div className="ca-learn-feature__meta">
              <span className="ca-mono" style={{ color: "var(--ca-gold-light)" }}>{hero.category}</span>
              <span className="ca-mono">{hero.readTime} {t.learn.readTime}</span>
            </div>
            <h2 className="ca-learn-feature__title">{hero.title}</h2>
            <p className="ca-learn-feature__excerpt">{hero.excerpt}</p>
            <div className="ca-mono mt-6" style={{ color: "var(--ca-gold-light)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Read essay <ArrowUpRight size={14} />
            </div>
          </article>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10">
            {rest.map((a, i) => (
              <article
                key={a.slug}
                data-testid={LEARN_PAGE.card(a.slug)}
                className={`ca-learn-card ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
              >
                <div className="ca-learn-card__meta">
                  <span className="ca-mono" style={{ color: "var(--ca-gold-light)" }}>{a.category}</span>
                  <span className="ca-mono">{a.readTime} {t.learn.readTime}</span>
                </div>
                <h3 className="ca-learn-card__title">{a.title}</h3>
                <p className="ca-learn-card__excerpt">{a.excerpt}</p>
                <div className="ca-mono mt-5" style={{ color: "var(--ca-gold-light)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Read <ArrowUpRight size={12} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearnPage;
