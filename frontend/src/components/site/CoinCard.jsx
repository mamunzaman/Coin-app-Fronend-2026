import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { findCountry } from "@/data/coinData";
import { COINS_PAGE } from "@/constants/testIds/home";

/**
 * Coin card — accepts coins shaped with the new schema
 * (obverseImage, countryCode, mint, year, isNew, isRare, title{en,de}, designer, slug)
 */
export const CoinCard = ({ coin, compact = false, testId }) => {
  const { lang, t } = useLang();
  const country = findCountry(coin.countryCode);
  return (
    <Link
      to={`/coins/${coin.slug}`}
      data-testid={testId || COINS_PAGE.card(coin.slug)}
      className="ca-coin-card-lg"
    >
      <div className="ca-coin-card-lg__img">
        {coin.isNew && <span className="ca-badge ca-badge--new">New</span>}
        {coin.isRare && <span className="ca-badge ca-badge--rare">Rare</span>}
        <img src={coin.obverseImage} alt={coin.title[lang]} loading="lazy" />
      </div>
      <div className="ca-coin-card-lg__body">
        <div className="ca-mono" style={{ fontSize: 10 }}>
          {coin.countryCode} · {coin.year}{coin.mint ? ` · Mint ${coin.mint}` : ""}
        </div>
        <h4 className="ca-coin-card-lg__title">{coin.title[lang]}</h4>
        {!compact && (
          <p className="ca-coin-card-lg__meta">
            {coin.designer} · {country?.name[lang]}
          </p>
        )}
        <div className="ca-coin-card-lg__cta">
          {t.detail.story} <ArrowUpRight size={12} />
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
