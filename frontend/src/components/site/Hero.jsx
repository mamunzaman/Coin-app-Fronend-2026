import React, { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { HERO_COIN, getStats, MOCK_STATS } from "@/services/coinArchiveService";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickSettingMultilineText, pickSettingText, renderHighlightedText, SettingsLink } from "@/utils/settingsHelpers";

export const Hero = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const hero = homepage?.hero;
  const [stats, setStats] = useState(MOCK_STATS);

  useEffect(() => {
    let cancelled = false;
    getStats().then((data) => {
      if (!cancelled) setStats(data);
    });
    return () => { cancelled = true; };
  }, []);

  const defaultTitle = `${t.hero.title1}\n${t.hero.title2}\n${t.hero.title3}`;
  const heroTitle = pickSettingMultilineText(hero?.title, lang, defaultTitle);
  const highlightSource =
    hero?.highlight_word ??
    homepage?.hero?.highlight_word ??
    hero?.highlightWord ??
    homepage?.hero?.highlightWord;
  const heroHighlightWord = pickSettingMultilineText(highlightSource, lang, t.hero.title2);

  if (process.env.NODE_ENV === "development") {
    console.debug("Hero highlight debug", { heroTitle, heroHighlightWord });
  }
  const heroImageUrl = hero?.image?.url || "";
  const coinSrc = heroImageUrl || HERO_COIN;
  const hasApiImage = Boolean(heroImageUrl);
  const heroDesc = pickSettingText(hero?.description, lang, t.hero.sub);
  const heroEyebrow = hero?.eyebrow || t.hero.eyebrow;
  const primaryBtn = {
    text: hero?.primary_button_text || t.hero.ctaPrimary,
    url: hero?.primary_button_url || "/coins",
  };
  const secondaryBtn = {
    text: hero?.secondary_button_text || t.hero.ctaSecondary,
    url: hero?.secondary_button_url || "#countries",
  };

  const titleAlt = heroTitle.replace(/\n/g, " ").trim() || "2 Euro commemorative coin";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="order-1 lg:order-2 lg:col-span-6 ca-hero__coin-wrap relative">
            <div className="ca-hero__halo" aria-hidden="true" />

            <svg className="ca-hero__orbits" viewBox="0 0 600 600" aria-hidden="true">
              <defs>
                <linearGradient id="caOrbitGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F2D16B" stopOpacity="0.6" />
                  <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#A97E12" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <circle cx="300" cy="300" r="282" fill="none" stroke="url(#caOrbitGold)" strokeWidth="1" strokeDasharray="2 7" />
              <circle cx="300" cy="300" r="248" fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="1" />
              <circle cx="300" cy="300" r="226" fill="none" stroke="rgba(212,175,55,0.10)" strokeWidth="1" strokeDasharray="1 3" />
              {[0, 90, 180, 270].map((deg) => (
                <line key={deg} x1="300" y1="14" x2="300" y2="34" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.7" transform={`rotate(${deg} 300 300)`} />
              ))}
              <circle cx="486" cy="120" r="2.2" fill="#F2D16B" fillOpacity="0.7" />
              <circle cx="120" cy="486" r="2.2" fill="#F2D16B" fillOpacity="0.7" />
            </svg>
            <span className="ca-hero__annot ca-hero__annot--tl" aria-hidden="true">
              <span className="ca-hero__annot-line" /> Obverse · Bodo Broschat
            </span>
            <span className="ca-hero__annot ca-hero__annot--br" aria-hidden="true">
              Ø 25.75 mm · 8.50 g <span className="ca-hero__annot-line" />
            </span>
            <span className="ca-hero__annot ca-hero__annot--bl" aria-hidden="true">
              <span className="ca-hero__annot-line" /> Bi-metal · CuNi / Ni-brass
            </span>

            <div className={`ca-hero__coin ca-float ${hasApiImage ? "ca-hero__coin--api" : ""}`} data-testid={HOME.heroCoin}>
              <img src={coinSrc} alt={titleAlt} />
            </div>
            <div className="ca-hero__caption">
              <span>{t.hero.plateLabel}</span>
              <span className="sep" aria-hidden="true" />
              <span><strong>DE · 2019</strong></span>
              <span className="sep" aria-hidden="true" />
              <span>{t.hero.mintLabel}</span>
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-6 ca-hero__copy min-w-0">
            <div className="ca-reveal mb-7">
              <span className="ca-hero__ticker">
                <span className="dot" aria-hidden="true" />
                {heroEyebrow}
              </span>
            </div>

            <h1 data-testid={HOME.heroTitle} className="ca-hero-title ca-reveal ca-reveal--delay-1">
              {renderHighlightedText(heroTitle, heroHighlightWord)}
            </h1>

            <p className="ca-reveal ca-reveal--delay-2 mt-8 ca-soft ca-hero__sub">{heroDesc}</p>

            <div className="ca-hero__actions ca-reveal ca-reveal--delay-3 mt-10">
              <SettingsLink url={primaryBtn.url} data-testid={HOME.heroExplore} className="ca-btn ca-btn--primary" aria-label={primaryBtn.text}>
                {primaryBtn.text}
                <ArrowRight size={14} aria-hidden="true" />
              </SettingsLink>
              <SettingsLink url={secondaryBtn.url} data-testid={HOME.heroBrowse} className="ca-btn ca-btn--secondary" aria-label={secondaryBtn.text}>
                <MapPin size={14} aria-hidden="true" />
                {secondaryBtn.text}
              </SettingsLink>
            </div>

            <div className="ca-hero__stats ca-reveal ca-reveal--delay-4 mt-12" data-testid={HOME.heroStats} aria-label={t.hero.statsLabel}>
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
        </div>
      </div>

      <div className="ca-hero__scroll hidden md:flex" aria-hidden="true">{t.hero.scroll}</div>
    </section>
  );
};

export default Hero;
