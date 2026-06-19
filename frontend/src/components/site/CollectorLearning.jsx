import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Layers, Stamp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import SectionId from "./SectionId";

const ICONS = { learn: BookOpen, mintMarks: Stamp, series: Layers };

export const CollectorLearning = () => {
  const { t } = useLang();

  return (
    <section data-testid={HOME.learningSection} className="ca-section ca-collector-learning" aria-labelledby="collector-learning-heading">
      <div className="ca-container">
        <SectionId num="V" label={t.home.learning.eyebrow} meta={t.home.learning.meta} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <h2 id="collector-learning-heading" className="ca-section-title">{t.home.learning.title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1 ca-home-section-sub">
            {t.home.learning.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.home.learning.links.map((item, i) => {
            const Icon = ICONS[item.key];
            return (
              <Link
                key={item.key}
                to={item.to}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectorLearning;
