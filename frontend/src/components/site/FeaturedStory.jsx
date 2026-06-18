import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { FEATURE_COIN } from "@/data/coinData";

export const FeaturedStory = () => {
  const { t } = useLang();
  return (
    <section data-testid={HOME.featureSection} className="ca-section">
      <div className="ca-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 ca-reveal">
            <div className="ca-feature-coin">
              <img src={FEATURE_COIN} alt={t.feature.title} />
            </div>
          </div>

          <div className="lg:col-span-6 ca-reveal ca-reveal--delay-1">
            <div className="ca-eyebrow mb-6">{t.feature.eyebrow}</div>

            <div className="flex items-center gap-4 mb-6 ca-muted" style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              <span style={{ color: "var(--ca-gold-light)" }}>{t.feature.country}</span>
              <span style={{ width: 24, height: 1, background: "var(--ca-border)" }} />
              <span>{t.feature.year}</span>
            </div>

            <h2 className="ca-section-title mb-7">{t.feature.title}</h2>
            <p className="ca-soft" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>
              {t.feature.body}
            </p>

            <p className="ca-muted mt-6" style={{ fontSize: 13, fontStyle: "italic" }}>
              {t.feature.meta}
            </p>

            <button data-testid={HOME.featureReadStory} className="ca-btn ca-btn--secondary mt-10">
              {t.feature.cta}
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;
