import React from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";

export const Contribute = () => {
  const { t } = useLang();
  return (
    <section id="learn" data-testid={HOME.contributeSection} className="ca-contribute ca-section">
      <div className="ca-container relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 ca-reveal">
            <div className="ca-mono mb-6" style={{ color: "var(--ca-gold-light)" }}>IX. {t.contribute.eyebrow}</div>
            <h2 className="ca-section-title mb-6">{t.contribute.title}</h2>
            <p className="ca-soft mb-10" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>
              {t.contribute.sub}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button data-testid={HOME.contributeCta} className="ca-btn ca-btn--primary">
                {t.contribute.cta}
                <ArrowRight size={14} />
              </button>
              <button className="ca-btn ca-btn--ghost">
                View contributors
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 ca-reveal ca-reveal--delay-1">
            <div
              style={{
                background: "linear-gradient(180deg, rgba(31,35,44,0.7), rgba(15,17,21,0.7))",
                border: "1px solid var(--ca-border)",
                borderRadius: 22, padding: 32,
              }}
            >
              <div className="ca-mono mb-5">Contributor activity</div>
              <div className="flex items-center gap-5 mb-7">
                <div className="ca-avatar-stack">
                  {["AB", "MR", "JK", "ED", "+"].map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <div>
                  <div className="ca-display" style={{ fontSize: 32, lineHeight: 1 }}>247</div>
                  <div className="ca-mono" style={{ fontSize: 10 }}>contributors</div>
                </div>
              </div>

              <hr className="ca-divider" />

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="ca-display" style={{ fontSize: 26 }}>+12</div>
                  <div className="ca-mono" style={{ fontSize: 10 }}>this week</div>
                </div>
                <div>
                  <div className="ca-display" style={{ fontSize: 26, color: "var(--ca-gold-light)" }}>651</div>
                  <div className="ca-mono" style={{ fontSize: 10 }}>coins catalogued</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contribute;
