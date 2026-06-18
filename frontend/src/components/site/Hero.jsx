import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { HERO_COIN } from "@/data/coinData";

export const Hero = () => {
  const { t } = useLang();
  return (
    <section id="top" data-testid={HOME.heroSection} className="ca-hero">
      <div className="ca-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coin — mobile first (above text) */}
          <div className="order-1 lg:order-2 lg:col-span-6 ca-hero__coin-wrap relative">
            <div className="ca-hero__halo" aria-hidden="true" />
            <div className="ca-hero__coin" data-testid={HOME.heroCoin}>
              <img src={HERO_COIN} alt="2 Euro commemorative coin — Germany 2019, 30 Years Fall of the Berlin Wall" />
            </div>
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="ca-reveal flex items-center gap-3 mb-7">
              <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--ca-gold)" }} />
              <span className="ca-eyebrow">{t.hero.eyebrow}</span>
            </div>

            <h1 data-testid={HOME.heroTitle} className="ca-hero-title ca-reveal ca-reveal--delay-1">
              {t.hero.title1}
              <br />
              <em>{t.hero.title2}</em>
              <br />
              {t.hero.title3}
            </h1>

            <p className="ca-reveal ca-reveal--delay-2 mt-8 ca-soft" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 520 }}>
              {t.hero.sub}
            </p>

            <div className="ca-reveal ca-reveal--delay-3 mt-10 flex flex-wrap gap-4">
              <button data-testid={HOME.heroExplore} className="ca-btn ca-btn--primary">
                {t.hero.ctaPrimary}
                <ArrowRight size={16} />
              </button>
              <button data-testid={HOME.heroBrowse} className="ca-btn ca-btn--secondary">
                <MapPin size={15} />
                {t.hero.ctaSecondary}
              </button>
            </div>

            {/* fine archive line */}
            <div className="ca-reveal ca-reveal--delay-4 mt-14 flex items-center gap-6 ca-muted" style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              <span>2004 — {new Date().getFullYear()}</span>
              <span style={{ width: 30, height: 1, background: "var(--ca-border)" }} />
              <span>650+ Coins</span>
              <span style={{ width: 30, height: 1, background: "var(--ca-border)" }} />
              <span>20+ States</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ca-hero__scroll hidden md:flex">{t.hero.scroll}</div>
    </section>
  );
};

export default Hero;
