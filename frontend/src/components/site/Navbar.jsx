import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, User, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";

export const Navbar = () => {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const onHome = location.pathname === "/";

  const links = [
    { key: "coins",     id: HOME.navCoins,     label: t.nav.coins,     to: "/coins" },
    { key: "countries", id: HOME.navCountries, label: t.nav.countries, to: onHome ? "#countries" : "/#countries" },
    { key: "series",    id: HOME.navSeries,    label: t.nav.series,    to: "/coins?sort=country" },
    { key: "learn",     id: HOME.navLearn,     label: t.nav.learn,     to: onHome ? "#learn" : "/#learn" },
  ];

  const renderLink = (l, isMobile = false) => {
    const cls = isMobile ? "ca-mobile-menu__link" : "ca-nav__link";
    const testId = isMobile ? `${l.id}-mobile` : l.id;
    if (l.to.startsWith("#")) {
      return <a key={l.key} href={l.to} data-testid={testId} className={cls} onClick={() => isMobile && setOpen(false)}>{l.label}</a>;
    }
    return <Link key={l.key} to={l.to} data-testid={testId} className={cls} onClick={() => isMobile && setOpen(false)}>{l.label}</Link>;
  };

  return (
    <>
      <header className={`ca-nav ${scrolled ? "ca-nav--scrolled" : ""}`}>
        <div className="ca-container flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#top" data-testid={HOME.navLogo} className="flex items-center gap-2 group">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: "linear-gradient(180deg, #F2D16B 0%, #A97E12 100%)" }}>
              <span className="ca-display italic" style={{ color: "#0F1115", fontSize: 14, fontWeight: 700 }}>€</span>
            </span>
            <span className="ca-display" style={{ fontSize: 20, letterSpacing: "-0.01em" }}>
              Coin<span style={{ color: "var(--ca-gold-light)" }}>Archive</span>
            </span>
          </a>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => renderLink(l))}
          </nav>

          {/* Right cluster */}
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
            <button data-testid={HOME.navSearch} onClick={() => navigate("/coins")} className="ca-btn ca-btn--ghost ca-btn--sm" aria-label={t.nav.search}>
              <Search size={16} />
            </button>
            <button data-testid={HOME.navAccount} className="ca-btn ca-btn--ghost ca-btn--sm" aria-label={t.nav.account}>
              <User size={16} />
            </button>
            <button data-testid={HOME.navCta} className="ca-btn ca-btn--primary ca-btn--sm">
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            data-testid={HOME.navMobileToggle}
            className="md:hidden ca-btn ca-btn--ghost ca-btn--sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            style={{ padding: 10 }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`ca-mobile-menu ${open ? "is-open" : ""} md:hidden`}>
        {links.map((l) => renderLink(l, true))}
        <div className="flex gap-3 mt-8">
          <button className="ca-btn ca-btn--ghost ca-btn--sm" onClick={toggle}>
            {lang === "en" ? "Deutsch" : "English"}
          </button>
          <button className="ca-btn ca-btn--primary ca-btn--sm flex-1" onClick={() => setOpen(false)}>
            {t.nav.cta}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
