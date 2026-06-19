import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import SectionId from "./SectionId";

export const TrustQuality = () => {
  const { t } = useLang();

  return (
    <section data-testid={HOME.trustSection} className="ca-section ca-trust-section" aria-labelledby="trust-heading">
      <div className="ca-container">
        <SectionId num="VI" label={t.home.trust.eyebrow} meta={t.home.trust.meta} />

        <div className="ca-trust-section__intro ca-reveal">
          <h2 id="trust-heading" className="ca-section-title">{t.home.trust.title}</h2>
          <p className="ca-soft ca-trust-section__sub">{t.home.trust.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {t.home.trust.pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              data-testid={HOME.trustPillar(i)}
              className={`ca-trust-pillar ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
            >
              <div className="ca-mono ca-trust-pillar__num">{pillar.num}</div>
              <h3 className="ca-trust-pillar__title">{pillar.title}</h3>
              <p className="ca-trust-pillar__body">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustQuality;
