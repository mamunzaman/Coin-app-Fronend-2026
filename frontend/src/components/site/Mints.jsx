import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { MINTS } from "@/data/coinData";

export const Mints = () => {
  const { t, lang } = useLang();
  return (
    <section data-testid={HOME.mintsSection} className="ca-section">
      <div className="ca-container">
        <div className="text-center ca-reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="ca-eyebrow mb-5">{t.mints.eyebrow}</div>
          <h2 className="ca-section-title mb-6">{t.mints.title}</h2>
          <p className="ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>{t.mints.sub}</p>
        </div>

        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-5 ca-reveal ca-reveal--delay-1"
          style={{ border: "1px solid var(--ca-border)", borderRadius: 24, overflow: "hidden", background: "linear-gradient(180deg, rgba(23,26,32,0.6), rgba(15,17,21,0.6))" }}
        >
          {MINTS.map((m) => (
            <div key={m.letter} data-testid={HOME.mintMark(m.letter)} className="ca-mint">
              <div className="ca-mint__letter">{m.letter}</div>
              <div className="ca-mint__city">{m.city}</div>
              <div className="ca-mint__note">{m.note[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mints;
