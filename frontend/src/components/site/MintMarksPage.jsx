import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { MINTS } from "@/data/coinData";
import { MINT_MARKS_PAGE } from "@/constants/testIds/home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const MintMarksPage = () => {
  useScrollReveal();
  const { t, lang } = useLang();

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

      {/* Map + cards */}
      <main className="ca-section">
        <div className="ca-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Map */}
            <div data-testid={MINT_MARKS_PAGE.map} className="lg:col-span-5 ca-reveal">
              <div className="ca-mint-map">
                {/* Stylised Germany silhouette using SVG path */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-label="Germany map">
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

            {/* Cards list */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {MINTS.map((m) => (
                  <div key={m.letter} data-testid={MINT_MARKS_PAGE.mark(m.letter)} className="ca-mintmark-card ca-reveal">
                    <div className="ca-mint__stamp" style={{ width: 80, height: 80 }}>
                      <span className="ca-mint__letter" style={{ fontSize: 48 }}>{m.letter}</span>
                    </div>
                    <div className="ca-mintmark-card__body">
                      <h3 className="ca-mintmark-card__city">{m.city}</h3>
                      <p className="ca-mintmark-card__note">{m.note[lang]}</p>
                      <div className="ca-mono mt-3" style={{ color: "var(--ca-gold-light)" }}>Mark — {m.letter}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 ca-reveal" style={{ border: "1px solid var(--ca-border)", borderRadius: 18, padding: 26 }}>
                <div className="ca-mono mb-3" style={{ color: "var(--ca-gold-light)" }}>{t.mintMarks.otherCountries}</div>
                <p className="ca-soft" style={{ fontSize: 14, lineHeight: 1.7 }}>{t.mintMarks.otherCountriesNote}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MintMarksPage;
