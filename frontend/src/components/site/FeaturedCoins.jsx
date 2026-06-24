import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { COINS } from "@/services/coinArchiveService";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, pickSettingText, SettingsLink } from "@/utils/settingsHelpers";
import CoinCard from "./CoinCard";
import SectionId from "./SectionId";

const FALLBACK_COINS = [...COINS]
  .sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || (b.isRare ? 1 : 0) - (a.isRare ? 1 : 0) || b.year - a.year)
  .slice(0, 4);

export const FeaturedCoins = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.featuredCatalogue;

  const coins = useMemo(() => {
    if (section?.coins?.length) return section.coins;
    if (section != null) return [];
    return FALLBACK_COINS;
  }, [section]);

  const sectionNum = pickField(section?.sectionNumber, "III");
  const sectionLabel = pickField(section?.sectionLabel, t.home.featuredCoins.eyebrow);
  const meta = pickField(section?.countLabel, pickField(section?.rightLabel, `${coins.length} ${t.home.featuredCoins.meta}`));
  const title = pickField(section?.title, t.home.featuredCoins.title);
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.home.featuredCoins.sub);
  const buttonText = pickField(section?.button_text, t.home.featuredCoins.cta);
  const buttonUrl = pickField(section?.button_url, "/coins");

  return (
    <section id="featured-coins" data-testid={HOME.featuredCoinsSection} className="ca-section" aria-labelledby="featured-coins-heading">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="flex items-end justify-between gap-6 mb-12 ca-reveal flex-wrap">
          <h2 id="featured-coins-heading" className="ca-section-title">{title}</h2>
          <p className="ca-muted ca-home-section-sub">{sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coins.map((coin, i) => (
            <div key={coin.slug || coin.id} className={`ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}>
              <CoinCard coin={coin} compact testId={HOME.featuredCoinCard(coin.slug)} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center ca-reveal">
          <SettingsLink url={buttonUrl} data-testid={HOME.featuredCoinsBrowse} className="ca-btn ca-btn--secondary" aria-label={buttonText}>
            {buttonText}
            <ArrowUpRight size={14} aria-hidden="true" />
          </SettingsLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoins;
