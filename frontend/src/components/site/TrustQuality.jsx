import React, { useMemo } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, pickSettingText } from "@/utils/settingsHelpers";
import SectionId from "./SectionId";

export const TrustQuality = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.archiveQuality;
  const fallbackPillars = t.home.trust.pillars;

  const pillars = useMemo(() => {
    const apiCards = section?.cards;
    if (!apiCards?.length) return fallbackPillars;

    return apiCards.map((p, i) => {
      const fallback = fallbackPillars[i] || {};
      return {
        num: pickField(p.num, fallback.num || String(i + 1).padStart(2, "0")),
        title: pickField(p.title, fallback.title || ""),
        body: pickField(p.body, fallback.body || ""),
      };
    });
  }, [section?.cards, fallbackPillars]);

  const sectionNum = pickField(section?.sectionNumber, "VI");
  const sectionLabel = pickField(section?.sectionLabel, t.home.trust.eyebrow);
  const meta = pickField(section?.countLabel, t.home.trust.meta);
  const title = pickField(section?.title, t.home.trust.title);
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.home.trust.sub);

  return (
    <section data-testid={HOME.trustSection} className="ca-section ca-trust-section" aria-labelledby="trust-heading">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="ca-trust-section__intro ca-reveal">
          <h2 id="trust-heading" className="ca-section-title">{title}</h2>
          <p className="ca-soft ca-trust-section__sub">{sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {pillars.map((pillar, i) => (
            <article
              key={`${pillar.num}-${pillar.title}`}
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
