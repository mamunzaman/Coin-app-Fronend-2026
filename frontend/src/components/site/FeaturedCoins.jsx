import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { COINS } from "@/services/coinArchiveService";
import CoinCard from "./CoinCard";
import SectionId from "./SectionId";

const FEATURED = [...COINS]
  .sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || (b.isRare ? 1 : 0) - (a.isRare ? 1 : 0) || b.year - a.year)
  .slice(0, 4);

export const FeaturedCoins = () => {
  const { t } = useLang();

  return (
    <section id="featured-coins" data-testid={HOME.featuredCoinsSection} className="ca-section" aria-labelledby="featured-coins-heading">
      <div className="ca-container">
        <SectionId num="III" label={t.home.featuredCoins.eyebrow} meta={`${FEATURED.length} ${t.home.featuredCoins.meta}`} />

        <div className="flex items-end justify-between gap-6 mb-12 ca-reveal flex-wrap">
          <h2 id="featured-coins-heading" className="ca-section-title">{t.home.featuredCoins.title}</h2>
          <p className="ca-muted ca-home-section-sub">{t.home.featuredCoins.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((coin, i) => (
            <div key={coin.slug} className={`ca-reveal ca-reveal--delay-${Math.min(i, 5)}`}>
              <CoinCard coin={coin} compact testId={HOME.featuredCoinCard(coin.slug)} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center ca-reveal">
          <Link to="/coins" data-testid={HOME.featuredCoinsBrowse} className="ca-btn ca-btn--secondary" aria-label={t.home.featuredCoins.cta}>
            {t.home.featuredCoins.cta}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoins;
