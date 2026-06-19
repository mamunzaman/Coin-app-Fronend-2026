import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, User, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useSiteSettings } from "@/context/SettingsContext";
import { navRomanNumeral, resolveNavUrl } from "@/utils/settingsHelpers";
import SearchOverlay from "./SearchOverlay";

const DEFAULT_LINKS = (t) => [
  { key: "coins",     id: HOME.navCoins,     label: t.nav.coins,     to: "/coins" },
  { key: "countries", id: HOME.navCountries, label: t.nav.countries, to: "/countries" },
  { key: "series",    id: HOME.navSeries,    label: t.nav.series,    to: "/series" },
  { key: "learn",     id: HOME.navLearn,     label: t.nav.learn,     to: "/learn" },
];

export const Navbar = () => {
  const { t, lang, toggle } = useLang();
  const site = useSiteSettings();
  const header = site?.header;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    const onOpen = () => setSearchOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ca-open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ca-open-search", onOpen);
    };
  }, []);

  const links = useMemo(() => {
    const apiNav = header?.navigation?.length
      ? header.navigation.map((item, i) => ({
        key: `nav-${i}`,
        id: `nav-api-${i}`,
        label: item.label,
        to: resolveNavUrl(item.url),
        num: navRomanNumeral(i),
      }))
      : null;

    const fallback = DEFAULT_LINKS(t).map((l, i) => ({ ...l, num: navRomanNumeral(i) }));
    return apiNav || fallback;
  }, [header?.navigation, t]);

  const logoText = header?.logoText || "";
  const ctaText = header?.primaryCta?.text || t.nav.cta;
  const ctaUrl = header?.primaryCta?.url || "/submit";
  const showSearch = header?.searchEnabled !== false;
  const showAccount = header?.accountEnabled !== false;
  const showLangToggle = !header?.languages?.length || header.languages.length > 1;

  const renderLink = (l, isMobile = false) => {
    const cls = isMobile ? "ca-mobile-menu__link" : "ca-nav__link";
    const testId = isMobile ? `${l.id}-mobile` : l.id;
    const isExternal = l.to.startsWith("http");

    const inner = (
      <>
        <span className="ca-nav__num" aria-hidden="true">{l.num}.</span>
        <span className="ca-nav__label">{l.label}</span>
      </>
    );

    if (isExternal) {
      return (
        <a
          key={l.key}
          href={l.to}
          data-testid={testId}
          className={cls}
          onClick={() => isMobile && setMenuOpen(false)}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link
        key={l.key}
        to={l.to}
        data-testid={testId}
        className={cls}
        onClick={() => isMobile && setMenuOpen(false)}
      >
        {inner}
      </Link>
    );
  };

  const handleCta = () => {
    setMenuOpen(false);
    const url = resolveNavUrl(ctaUrl);
    if (url.startsWith("http")) window.location.href = url;
    else navigate(url);
  };

  return (
    <>
      <header className={`ca-nav ${scrolled ? "ca-nav--scrolled" : ""}`}>
        <div className="ca-container flex items-center justify-between h-[72px]">
          <Link to="/" data-testid={HOME.navLogo} className="ca-nav__logo flex items-center gap-2.5 group">
            {header?.logoUrl ? (
              <img src={header.logoUrl} alt={logoText} className="ca-nav__logo-img" style={{ height: 32, width: "auto" }} />
            ) : (
              <span className="ca-nav__logo-badge">
                <span className="ca-display italic">€</span>
              </span>
            )}
            <span className="ca-nav__logo-text ca-display">
              {logoText && logoText !== "CoinArchive" ? logoText : (
                <>Coin<span className="ca-nav__logo-text--accent">Archive</span></>
              )}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => renderLink(l))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {showLangToggle && (
              <button
                data-testid={HOME.navLangToggle}
                onClick={toggle}
                className="ca-btn ca-btn--ghost ca-btn--sm"
                aria-label="Toggle language"
                style={{ padding: "8px 12px" }}
              >
                <span style={{ color: lang === "en" ? "var(--ca-gold-light)" : "var(--ca-text-muted)" }}>EN</span>
                <span style={{ color: "var(--ca-border)" }}>/</span>
                <span style={{ color: lang === "de" ? "var(--ca-gold-light)" : "var(--ca-text-muted)" }}>DE</span>
              </button>
            )}
            {showSearch && (
              <button data-testid={HOME.navSearch} onClick={() => setSearchOpen(true)} className="ca-btn ca-btn--ghost ca-btn--sm" aria-label={t.nav.search}>
                <Search size={16} />
              </button>
            )}
            {showAccount && (
              <button data-testid={HOME.navAccount} className="ca-btn ca-btn--ghost ca-btn--sm" aria-label={t.nav.account}>
                <User size={16} />
              </button>
            )}
            <button data-testid={HOME.navCta} onClick={handleCta} className="ca-btn ca-btn--primary ca-btn--sm">
              {ctaText}
            </button>
          </div>

          <button
            data-testid={HOME.navMobileToggle}
            className="lg:hidden ca-btn ca-btn--ghost ca-btn--sm"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{ padding: 10 }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className={`ca-mobile-menu ${menuOpen ? "is-open" : ""} lg:hidden`}>
        {links.map((l) => renderLink(l, true))}
        {showSearch && (
          <button
            className="ca-mobile-menu__link text-left"
            onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
            data-testid="nav-search-btn-mobile"
          >
            {t.nav.search}
          </button>
        )}
        {showAccount && (
          <button className="ca-mobile-menu__link text-left" data-testid="nav-account-btn-mobile">
            {t.nav.account}
          </button>
        )}
        <div className="flex gap-3 mt-8">
          {showLangToggle && (
            <button className="ca-btn ca-btn--ghost ca-btn--sm" onClick={toggle}>
              {lang === "en" ? "Deutsch" : "English"}
            </button>
          )}
          <button data-testid="nav-mobile-cta-submit" className="ca-btn ca-btn--primary ca-btn--sm flex-1" onClick={handleCta}>
            {ctaText}
          </button>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
