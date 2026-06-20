import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickSettingText } from "@/utils/settingsHelpers";

export const Manifesto = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const quoteText = pickSettingText(homepage?.quote?.text, lang, t.manifesto.text);
  const quoteHighlight = pickSettingText(homepage?.quote?.highlight_text, lang, t.manifesto.highlightText);
  const quoteAttribution = pickSettingText(
    homepage?.quote?.attribution,
    lang,
    t.manifesto.attribution,
  );

  return (
    <section data-testid={HOME.manifestoSection} className="ca-section">
      <div className="ca-container">
        <div className="ca-manifesto ca-reveal" style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="ca-manifesto__mark" aria-hidden="true">&ldquo;</div>
          <p className="ca-manifesto-text">
            {quoteText}
            {quoteHighlight ? (
              <>
                {quoteText ? " " : null}
                <em>{quoteHighlight}</em>
              </>
            ) : null}
          </p>
          {quoteAttribution ? <div className="ca-manifesto__attr">{quoteAttribution}</div> : null}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
