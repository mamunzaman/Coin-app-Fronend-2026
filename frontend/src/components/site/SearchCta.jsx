import React from "react";
import { ArrowRight, Search } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, pickSettingText, SettingsLink } from "@/utils/settingsHelpers";

const openSearch = () => {
  window.dispatchEvent(new CustomEvent("ca-open-search"));
};

export const SearchCta = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.searchCta;

  const eyebrow = pickField(section?.eyebrow, t.home.searchCta.eyebrow);
  const title = pickField(section?.title, t.home.searchCta.title);
  const sub = pickSettingText(section?.description, lang, t.home.searchCta.sub);
  const primaryText = pickField(section?.primary_button_text ?? section?.primaryButton?.text, t.home.searchCta.button);
  const secondaryText = pickField(section?.secondary_button_text ?? section?.secondaryButton?.text, t.home.searchCta.fallback);
  const secondaryUrl = pickField(section?.secondary_button_url ?? section?.secondaryButton?.url, "/coins");
  const hint = pickField(section?.tip_text ?? section?.tip, t.home.searchCta.hint);

  return (
    <section data-testid={HOME.searchCtaSection} className="ca-section ca-search-cta" aria-labelledby="search-cta-heading">
      <div className="ca-container">
        <div className="ca-search-cta__inner ca-reveal">
          <div className="ca-mono ca-search-cta__eyebrow">{eyebrow}</div>
          <h2 id="search-cta-heading" className="ca-section-title ca-search-cta__title">{title}</h2>
          <p className="ca-soft ca-search-cta__sub">{sub}</p>

          <div className="ca-search-cta__actions">
            <button
              type="button"
              data-testid={HOME.searchCtaOpen}
              className="ca-btn ca-btn--primary"
              onClick={openSearch}
              aria-label={primaryText}
            >
              <Search size={16} aria-hidden="true" />
              {primaryText}
            </button>
            <SettingsLink
              url={secondaryUrl}
              data-testid={HOME.searchCtaBrowse}
              className="ca-btn ca-btn--secondary"
              aria-label={secondaryText}
            >
              {secondaryText}
              <ArrowRight size={14} aria-hidden="true" />
            </SettingsLink>
          </div>

          <p className="ca-mono ca-search-cta__hint">{hint}</p>
        </div>
      </div>
    </section>
  );
};

export default SearchCta;
