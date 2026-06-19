import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { MINTS } from "@/services/coinArchiveService";
import { MINT_MARKS_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const MintMarksPage = () => {
  useScrollReveal();
  const { t, lang } = useLang();
  useDocumentTitle(t.mintMarks.title);
  const explanations = t.mintMarks.markExplanations;

  return (
    <div className="ca-page" data-testid={MINT_MARKS_PAGE.page}>
      <Navbar />

      <header className="ca-coins-header">
        <div className="ca-container">
          <SectionId num="II" label={t.mintMarks.eyebrow} meta={t.mintMarks.mapTitle} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>{t.mintMarks.title}</h1>
            </div>
            <p className="md:col-span-5 ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>{t.mintMarks.sub}</p>
          </div>
        </div>
      </header>

      <main>
        <section className="ca-section" aria-labelledby="mint-grid-heading">
          <div className="ca-container">
            <div className="ca-reveal mb-10">
              <h2 id="mint-grid-heading" className="ca-learn-hub__heading">{t.mintMarks.gridTitle}</h2>
              <p className="ca-soft mt-3" style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>{t.mintMarks.gridSub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div data-testid={MINT_MARKS_PAGE.map} className="lg:col-span-5 ca-reveal">
                <div className="ca-mint-map">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <path
                      d="M52 8 L60 14 L65 22 L70 28 L72 38 L78 44 L72 52 L78 62 L70 70 L66 80 L58 84 L52 92 L44 88 L36 86 L28 78 L24 70 L20 60 L26 52 L22 44 L24 34 L30 28 L34 20 L42 14 Z"
                      fill="rgba(31, 35, 44, 0.6)"
                      stroke="rgba(212, 175, 55, 0.4)"
                      strokeWidth="0.4"
                    />
                    {MINTS.map((m) => (
                      <g key={m.letter} transform={`translate(${m.coord.x}, ${m.coord.y})`}>
                        <circle r="2.4" fill="var(--ca-gold)" />
                        <circle r="4.5" fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="0.4" />
                        <text y="-5" textAnchor="middle" fontSize="3.4" fill="var(--ca-gold-light)" fontFamily="Playfair Display" fontStyle="italic">{m.letter}</text>
                        <text y="9" textAnchor="middle" fontSize="2.2" fill="var(--ca-text-soft)" letterSpacing="0.16">{m.city.toUpperCase()}</text>
                      </g>
                    ))}
                  </svg>
                  <div className="ca-mono mt-6 text-center">{t.mintMarks.mapTitle}</div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {MINTS.map((m, i) => (
                    <article
                      key={m.letter}
                      data-testid={MINT_MARKS_PAGE.mark(m.letter)}
                      className={`ca-mintmark-card ca-mintmark-card--grid ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
                      aria-label={`${m.letter} — ${m.city}`}
                    >
                      <div className="ca-mint__stamp ca-mintmark-card__stamp">
                        <span className="ca-mint__letter">{m.letter}</span>
                      </div>
                      <div className="ca-mintmark-card__body">
                        <h3 className="ca-mintmark-card__city">{m.city}</h3>
                        <p className="ca-mintmark-card__institution">{m.note[lang]}</p>
                        <p className="ca-mintmark-card__note">{explanations[m.letter]}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ca-section ca-learn-hub ca-learn-hub--editorial" aria-labelledby="mint-explanation-heading">
          <div className="ca-container">
            <h2 id="mint-explanation-heading" className="ca-learn-hub__heading ca-reveal">{t.mintMarks.explanationTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {t.mintMarks.explanation.map((item, i) => (
                <article
                  key={item.title}
                  data-testid={MINT_MARKS_PAGE.explanation(i)}
                  className={`ca-guide-section ca-guide-section--compact ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
                >
                  <h3 className="ca-guide-section__title">{item.title}</h3>
                  <p className="ca-guide-section__body ca-guide-section__body--single">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ca-section" aria-labelledby="mint-workflow-heading">
          <div className="ca-container">
            <h2 id="mint-workflow-heading" className="ca-learn-hub__heading ca-reveal">{t.mintMarks.workflowTitle}</h2>
            <ol className="ca-workflow mt-10" data-testid={MINT_MARKS_PAGE.workflow}>
              {t.mintMarks.workflow.map((step, i) => (
                <li key={step.step} className={`ca-workflow__step ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}>
                  <span className="ca-workflow__num ca-mono">{step.step}</span>
                  <h3 className="ca-workflow__title">{step.title}</h3>
                  <p className="ca-workflow__body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ca-section ca-section--tight">
          <div className="ca-container">
            <div className="ca-future-note ca-reveal" data-testid={MINT_MARKS_PAGE.futureNote}>
              <div className="ca-mono ca-future-note__label">{t.mintMarks.otherCountries}</div>
              <p className="ca-soft ca-future-note__text">{t.mintMarks.otherCountriesNote}</p>
              <Link to="/coins" className="ca-btn ca-btn--ghost ca-btn--sm mt-6" aria-label={lang === "de" ? "Archiv durchsuchen" : "Browse the archive"}>
                {lang === "de" ? "Archiv durchsuchen" : "Browse the archive"}
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MintMarksPage;
