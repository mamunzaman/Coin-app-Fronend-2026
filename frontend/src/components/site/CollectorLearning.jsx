import React, { useMemo } from "react";
import { ArrowUpRight, BookOpen, Layers, Stamp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickSettingText, SettingsLink } from "@/utils/settingsHelpers";
import SectionId from "./SectionId";

const ICONS = { learn: BookOpen, mintMarks: Stamp, mintmarks: Stamp, mint_marks: Stamp, series: Layers };

export const CollectorLearning = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.collectorEducation;

  const links = useMemo(() => {
    if (section?.cards?.length) {
      return section.cards.map((c) => ({
        key: c.key,
        to: c.to || c.url,
        eyebrow: c.eyebrow,
        title: pickSettingText(c.titleLocalized ?? c.title, lang, c.title),
        desc: pickSettingText(c.descLocalized ?? c.desc, lang, c.desc),
        cta: c.cta,
      }));
    }
    return t.home.learning.links;
  }, [section?.cards, t.home.learning.links, lang]);

  const sectionNum = section?.sectionNumber || "V";
  const sectionLabel = section?.sectionLabel || t.home.learning.eyebrow;
  const meta = section?.countLabel || t.home.learning.meta;
  const title = section?.title || t.home.learning.title;
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.home.learning.sub);

  return (
    <section data-testid={HOME.learningSection} className="ca-section ca-collector-learning" aria-labelledby="collector-learning-heading">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <h2 id="collector-learning-heading" className="ca-section-title">{title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1 ca-home-section-sub">{sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {links.map((item, i) => {
            const Icon = ICONS[item.key] || BookOpen;
            return (
              <SettingsLink
                key={item.key}
                url={item.to}
                data-testid={HOME.learningLink(item.key)}
                className={`ca-learn-card ca-reveal ca-reveal--delay-${Math.min(i, 5)} block no-underline text-inherit h-full`}
                aria-label={`${item.title} — ${item.desc}`}
              >
                <div className="ca-collector-learning__icon" aria-hidden="true">
                  <Icon size={18} />
                </div>
                <div className="ca-mono ca-collector-learning__eyebrow">{item.eyebrow}</div>
                <h3 className="ca-learn-card__title">{item.title}</h3>
                <p className="ca-learn-card__excerpt">{item.desc}</p>
                <div className="ca-mono mt-5" style={{ color: "var(--ca-gold-light)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {item.cta} <ArrowUpRight size={12} aria-hidden="true" />
                </div>
              </SettingsLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectorLearning;
