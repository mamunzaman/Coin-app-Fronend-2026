import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { HERO_COIN, RECENT_COINS, getStats, MOCK_STATS } from "@/services/coinArchiveService";

export const Hero = () => {
  const { t } = useLang();
  const [stats, setStats] = useState(MOCK_STATS);

  useEffect(() => {
    let cancelled = false;
    getStats().then((data) => {
      if (!cancelled) setStats(data);
    });
    return () => { cancelled = true; };
  }, []);

  const panelCoins = RECENT_COINS.slice(0, 3);

  return (
    <section id="top" data-testid={HOME.heroSection} className="ca-hero">
      <div className="ca-hero__spine" aria-hidden="true">
        <span>001 / Archive</span>
        <span className="rule" />
        <span>Est. 2024</span>
        <span className="rule" />
        <span className="inline-flex items-center gap-2"><span className="dot" /> {stats.coins}+ Live</span>
      </div>

      <div className="ca-container w-full" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="ca-reveal mb-7">
              <span className="ca-hero__ticker">
                <span className="dot" aria-hidden="true" />
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 data-testid={HOME.heroTitle} className="ca-hero-title ca-reveal ca-reveal--delay-1">
              {t.hero.title1}
              <br />
              <em>{t.hero.title2}</em>
              <br />
              {t.hero.title3}
            </h1>

            <p className="ca-reveal ca-reveal--delay-2 mt-8 ca-soft ca-hero__sub">
              {t.hero.sub}
            </p>

            <div className="ca-hero__actions ca-reveal ca-reveal--delay-3 mt-10">
              <Link to="/coins" data-testid={HOME.heroExplore} className="ca-btn ca-btn--primary" aria-label={t.hero.ctaPrimary}>
                {t.hero.ctaPrimary}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/learn" data-testid={HOME.heroBrowse} className="ca-btn ca-btn--secondary" aria-label={t.hero.ctaSecondary}>
                <BookOpen size={14} aria-hidden="true" />
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div
              className="ca-hero__stats ca-reveal ca-reveal--delay-4 mt-12"
              data-testid={HOME.heroStats}
              aria-label={t.hero.statsLabel}
            >
              <div className="ca-hero__stat">
                <span className="ca-hero__stat-num">{stats.coins}+</span>
                <span className="ca-hero__stat-label">{t.stats.coins}</span>
              </div>
              <span className="ca-hero__stat-divider" aria-hidden="true" />
              <div className="ca-hero__stat">
                <span className="ca-hero__stat-num">{stats.countries}+</span>
                <span className="ca-hero__stat-label">{t.stats.countries}</span>
              </div>
              <span className="ca-hero__stat-divider" aria-hidden="true" />
              <div className="ca-hero__stat">
                <span className="ca-hero__stat-num">{stats.years}+</span>
                <span className="ca-hero__stat-label">{t.stats.years}</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 ca-hero__visual ca-reveal ca-reveal--delay-1">
            <div className="ca-hero__panel" aria-hidden="true">
              {panelCoins.map((c, i) => (
                <div
                  key={c.id}
                  className={`ca-hero__panel-card ca-hero__panel-card--${i + 1}`}
                  style={{ backgroundImage: `url(${c.img})` }}
                />
              ))}
              <div className="ca-hero__panel-frame" />
            </div>

            <div className="ca-hero__coin-wrap relative">
              <div className="ca-hero__halo" aria-hidden="true" />
              <div className="ca-hero__coin" data-testid={HOME.heroCoin}>
                <img src={HERO_COIN} alt="2 Euro commemorative coin — Germany 2019, 30 Years Fall of the Berlin Wall" />
              </div>
              <div className="ca-hero__caption">
                <span>{t.hero.plateLabel}</span>
                <span className="sep" aria-hidden="true" />
                <span><strong>DE · 2019</strong></span>
                <span className="sep" aria-hidden="true" />
                <span>{t.hero.mintLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ca-hero__scroll hidden md:flex" aria-hidden="true">{t.hero.scroll}</div>
    </section>
  );
};

export default Hero;
