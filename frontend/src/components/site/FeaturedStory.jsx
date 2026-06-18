import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { FEATURE_COIN } from "@/data/coinData";
import SectionId from "./SectionId";

export const FeaturedStory = () => {
  const { t } = useLang();
  return (
    <section data-testid={HOME.featureSection} className="ca-section">
      <div className="ca-container">
        <SectionId num="III" label={t.feature.eyebrow} meta="Exhibit 01" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 ca-reveal">
            <div className="ca-feature-coin">
              <img src={FEATURE_COIN} alt={t.feature.title} />
            </div>
          </div>

          <div className="lg:col-span-6 ca-reveal ca-reveal--delay-1">
            <div className="flex items-center gap-4 mb-6 ca-mono">
              <span style={{ color: "var(--ca-gold-light)" }}>{t.feature.country}</span>
              <span style={{ width: 22, height: 1, background: "var(--ca-border)" }} />
              <span>{t.feature.year}</span>
              <span style={{ width: 22, height: 1, background: "var(--ca-border)" }} />
              <span>Plate II.</span>
            </div>

            <h2 className="ca-section-title mb-7">{t.feature.title}</h2>
            <p className="ca-soft" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>
              {t.feature.body}
            </p>

            <dl className="ca-data-list">
              <dt>Designer</dt><dd>Bodo Broschat</dd>
              <dt>Mintage</dt><dd>30,000,000</dd>
              <dt>Diameter</dt><dd>25.75 mm</dd>
              <dt>Weight</dt><dd>8.50 g</dd>
              <dt>Composition</dt><dd>Bi-metal · CuNi / Ni-brass</dd>
            </dl>

            <button data-testid={HOME.featureReadStory} className="ca-btn ca-btn--secondary mt-10">
              {t.feature.cta}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;
