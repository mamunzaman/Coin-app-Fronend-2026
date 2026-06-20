import React, { useMemo } from "react";
import { ArrowUpRight, Coins, Globe2, Layers, Stamp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickSettingText, SettingsLink } from "@/utils/settingsHelpers";
import SectionId from "./SectionId";

const ICONS = { coins: Coins, countries: Globe2, series: Layers, mintMarks: Stamp, mintmarks: Stamp, mint_marks: Stamp };

function pickField(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : value;
  if (trimmed == null || trimmed === "") return fallback;
  return trimmed;
}

export const ArchiveOverview = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.archiveOverview;
  const fallbackCards = t.home.archive.cards;

  const cards = useMemo(() => {
    const apiCards = section?.cards;
    if (!apiCards?.length) return fallbackCards;

    return apiCards.map((c, i) => {
      const fallback = fallbackCards[i] || {};
      const iconKey = pickField(c.icon, fallback.key || "coins");
      return {
        key: pickField(c.key, fallback.key || iconKey || `card-${i}`),
        icon: iconKey,
        to: pickField(c.button_url, fallback.to || "/"),
        eyebrow: pickField(c.eyebrow, fallback.eyebrow || ""),
        title: pickField(c.title, fallback.title || ""),
        desc: pickField(c.text, fallback.desc || ""),
        cta: pickField(c.button_text, fallback.cta || ""),
      };
    });
  }, [section?.cards, fallbackCards]);

  const sectionNum = section?.sectionNumber || "II";
  const sectionLabel = section?.sectionLabel || t.home.archive.eyebrow;
  const meta = section?.countLabel || t.home.archive.meta;
  const title = section?.title || t.home.archive.title;
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.home.archive.sub);

  return (
    <section data-testid={HOME.archiveSection} className="ca-section ca-archive-overview" aria-labelledby="archive-overview-heading">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <h2 id="archive-overview-heading" className="ca-section-title">{title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1 ca-archive-overview__sub">{sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon] || ICONS[card.key] || Coins;
            return (
              <SettingsLink
                key={card.key}
                url={card.to}
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
              </SettingsLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchiveOverview;
