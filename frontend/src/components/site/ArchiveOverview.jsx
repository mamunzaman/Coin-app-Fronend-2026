import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Coins, Globe2, Layers, Stamp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import SectionId from "./SectionId";

const ICONS = { coins: Coins, countries: Globe2, series: Layers, mintMarks: Stamp };

export const ArchiveOverview = () => {
  const { t } = useLang();

  return (
    <section data-testid={HOME.archiveSection} className="ca-section ca-archive-overview" aria-labelledby="archive-overview-heading">
      <div className="ca-container">
        <SectionId num="II" label={t.home.archive.eyebrow} meta={t.home.archive.meta} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <h2 id="archive-overview-heading" className="ca-section-title">{t.home.archive.title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1 ca-archive-overview__sub">
            {t.home.archive.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {t.home.archive.cards.map((card, i) => {
            const Icon = ICONS[card.key];
            return (
              <Link
                key={card.key}
                to={card.to}
                data-testid={HOME.archiveCard(card.key)}
                className={`ca-archive-card ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}
                aria-label={`${card.title} — ${card.desc}`}
              >
                <div className="ca-archive-card__icon" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <div className="ca-mono ca-archive-card__eyebrow">{card.eyebrow}</div>
                <h3 className="ca-archive-card__title">{card.title}</h3>
                <p className="ca-archive-card__desc">{card.desc}</p>
                <span className="ca-archive-card__cta">
                  {card.cta} <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchiveOverview;
