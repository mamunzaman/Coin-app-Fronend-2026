import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, User, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import SearchOverlay from "./SearchOverlay";

export const Navbar = () => {
  const { t, lang, toggle } = useLang();
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

  // Cmd-K / Ctrl-K opens search
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

  const links = [
    { key: "coins",     id: HOME.navCoins,     label: t.nav.coins,     to: "/coins" },
    { key: "countries", id: HOME.navCountries, label: t.nav.countries, to: "/countries" },
    { key: "series",    id: HOME.navSeries,    label: t.nav.series,    to: "/series" },
    { key: "learn",     id: HOME.navLearn,     label: t.nav.learn,     to: "/learn" },
  ];

  const renderLink = (l, isMobile = false) => {
    const cls = isMobile ? "ca-mobile-menu__link" : "ca-nav__link";
    const testId = isMobile ? `${l.id}-mobile` : l.id;
    return (
      <Link
        key={l.key}
        to={l.to}
        data-testid={testId}
        className={cls}
        onClick={() => isMobile && setMenuOpen(false)}
      >
        {l.label}
      </Link>
    );
  };

  return (
    <>
      <header className={`ca-nav ${scrolled ? "ca-nav--scrolled" : ""}`}>
        <div className="ca-container flex items-center justify-between h-[72px]">
          <Link to="/" data-testid={HOME.navLogo} className="flex items-center gap-2 group">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: "linear-gradient(180deg, #F2D16B 0%, #A97E12 100%)" }}>
              <span className="ca-display italic" style={{ color: "#0F1115", fontSize: 14, fontWeight: 700 }}>€</span>
            </span>
            <span className="ca-display" style={{ fontSize: 20, letterSpacing: "-0.01em" }}>
              Coin<span style={{ color: "var(--ca-gold-light)" }}>Archive</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => renderLink(l))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
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
            <button data-testid={HOME.navSearch} onClick={() => setSearchOpen(true)} className="ca-btn ca-btn--ghost ca-btn--sm" aria-label={t.nav.search}>
              <Search size={16} />
            </button>
            <button data-testid={HOME.navAccount} className="ca-btn ca-btn--ghost ca-btn--sm" aria-label={t.nav.account}>
              <User size={16} />
            </button>
            <button data-testid={HOME.navCta} onClick={() => navigate("/submit")} className="ca-btn ca-btn--primary ca-btn--sm">
              {t.nav.cta}
            </button>
          </div>

          <button
            data-testid={HOME.navMobileToggle}
            className="md:hidden ca-btn ca-btn--ghost ca-btn--sm"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{ padding: 10 }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`ca-mobile-menu ${menuOpen ? "is-open" : ""} md:hidden`}>
        {links.map((l) => renderLink(l, true))}
        <button
          className="ca-mobile-menu__link text-left"
          onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
          data-testid="nav-search-btn-mobile"
        >
          {t.nav.search}
        </button>
        <button className="ca-mobile-menu__link text-left" data-testid="nav-account-btn-mobile">
          {t.nav.account}
        </button>
        <div className="flex gap-3 mt-8">
          <button className="ca-btn ca-btn--ghost ca-btn--sm" onClick={toggle}>
            {lang === "en" ? "Deutsch" : "English"}
          </button>
          <button data-testid="nav-mobile-cta-submit" className="ca-btn ca-btn--primary ca-btn--sm flex-1" onClick={() => { setMenuOpen(false); navigate("/submit"); }}>
            {t.nav.cta}
          </button>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
