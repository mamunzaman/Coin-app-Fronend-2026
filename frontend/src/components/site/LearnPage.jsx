import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { LEARN_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const LearnCard = ({ card, readGuide, readTime, testId }) => {
  const isRoute = card.href.startsWith("/");
  const className = "ca-learn-card ca-reveal block h-full no-underline text-inherit";

  const inner = (
    <>
      <div className="ca-learn-card__meta">
        <span className="ca-mono" style={{ color: "var(--ca-gold-light)" }}>{card.category}</span>
        <span className="ca-mono">{card.readTime} {readTime}</span>
      </div>
      <h3 className="ca-learn-card__title">{card.title}</h3>
      <p className="ca-learn-card__excerpt">{card.excerpt}</p>
      <div className="ca-mono mt-5" style={{ color: "var(--ca-gold-light)", display: "inline-flex", alignItems: "center", gap: 6 }}>
        {readGuide} <ArrowUpRight size={12} aria-hidden="true" />
      </div>
    </>
  );

  if (isRoute) {
    return (
      <Link to={card.href} data-testid={testId} className={className} aria-label={`${readGuide}: ${card.title}`}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={card.href} data-testid={testId} className={className} aria-label={`${readGuide}: ${card.title}`}>
      {inner}
    </a>
  );
};

export const LearnPage = () => {
  useScrollReveal();
  const { t } = useLang();
  useDocumentTitle(t.learn.title);
  const { cards, guides, cta } = t.learn;

  return (
    <div className="ca-page" data-testid={LEARN_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <SectionId num="II" label={t.learn.eyebrow} meta={`${cards.length} guides`} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>{t.learn.title}</h1>
            </div>
            <p className="md:col-span-5 ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>{t.learn.sub}</p>
          </div>
        </div>
      </header>

      <main>
        <section className="ca-section ca-learn-hub" aria-labelledby="learn-featured-heading">
          <div className="ca-container">
            <h2 id="learn-featured-heading" className="ca-learn-hub__heading ca-reveal">{t.learn.featuredTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {cards.map((card, i) => (
                <div key={card.slug} className={`ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}>
                  <LearnCard
                    card={card}
                    readGuide={t.learn.readGuide}
                    readTime={t.learn.readTime}
                    testId={LEARN_PAGE.card(card.slug)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ca-section ca-learn-hub ca-learn-hub--editorial" aria-labelledby="learn-editorial-heading">
          <div className="ca-container">
            <h2 id="learn-editorial-heading" className="ca-learn-hub__heading ca-reveal">{t.learn.editorialTitle}</h2>
            <div className="ca-guide-stack mt-10">
              {guides.map((guide, i) => (
                <article
                  key={guide.id}
                  id={guide.id}
                  data-testid={LEARN_PAGE.guide(guide.id)}
                  className={`ca-guide-section ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
                >
                  <div className="ca-mono ca-guide-section__label">{guide.label}</div>
                  <h3 className="ca-guide-section__title">{guide.title}</h3>
                  <div className="ca-guide-section__body">
                    {guide.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ca-learn-cta ca-section" aria-labelledby="learn-cta-heading">
          <div className="ca-container relative" style={{ zIndex: 2 }}>
            <div className="ca-reveal">
              <div className="ca-mono mb-4" style={{ color: "var(--ca-gold-light)" }}>{cta.eyebrow}</div>
              <h2 id="learn-cta-heading" className="ca-section-title mb-4">{cta.title}</h2>
              <p className="ca-soft mb-8" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>{cta.sub}</p>
              <div className="ca-learn-cta__actions">
                <Link
                  to="/coins"
                  data-testid={LEARN_PAGE.ctaBrowse}
                  className="ca-btn ca-btn--primary"
                  aria-label={cta.browseArchive}
                >
                  {cta.browseArchive}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  to="/mint-marks"
                  data-testid={LEARN_PAGE.ctaMintMarks}
                  className="ca-btn ca-btn--secondary"
                  aria-label={cta.exploreMintMarks}
                >
                  {cta.exploreMintMarks}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LearnPage;
