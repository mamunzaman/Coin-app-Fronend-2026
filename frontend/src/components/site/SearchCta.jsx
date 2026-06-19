import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";

const openSearch = () => {
  window.dispatchEvent(new CustomEvent("ca-open-search"));
};

export const SearchCta = () => {
  const { t } = useLang();

  return (
    <section data-testid={HOME.searchCtaSection} className="ca-section ca-search-cta" aria-labelledby="search-cta-heading">
      <div className="ca-container">
        <div className="ca-search-cta__inner ca-reveal">
          <div className="ca-mono ca-search-cta__eyebrow">{t.home.searchCta.eyebrow}</div>
          <h2 id="search-cta-heading" className="ca-section-title ca-search-cta__title">{t.home.searchCta.title}</h2>
          <p className="ca-soft ca-search-cta__sub">{t.home.searchCta.sub}</p>

          <div className="ca-search-cta__actions">
            <button
              type="button"
              data-testid={HOME.searchCtaOpen}
              className="ca-btn ca-btn--primary"
              onClick={openSearch}
              aria-label={t.home.searchCta.button}
            >
              <Search size={16} aria-hidden="true" />
              {t.home.searchCta.button}
            </button>
            <Link
              to="/coins"
              data-testid={HOME.searchCtaBrowse}
              className="ca-btn ca-btn--secondary"
              aria-label={t.home.searchCta.fallback}
            >
              {t.home.searchCta.fallback}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <p className="ca-mono ca-search-cta__hint">{t.home.searchCta.hint}</p>
        </div>
      </div>
    </section>
  );
};

export default SearchCta;
