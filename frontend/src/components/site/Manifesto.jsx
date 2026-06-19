import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickSettingText } from "@/utils/settingsHelpers";

export const Manifesto = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const quoteText = pickSettingText(homepage?.quote?.text, lang, t.manifesto.text);
  const attribution = homepage?.quote?.attribution || "— Coin Archive · Curatorial Statement";

  const words = quoteText.split(" ");
  const tailCount = Math.min(5, Math.max(3, Math.round(words.length * 0.18)));
  const head = words.slice(0, words.length - tailCount).join(" ");
  const tail = words.slice(words.length - tailCount).join(" ");

  return (
    <section data-testid={HOME.manifestoSection} className="ca-section">
      <div className="ca-container">
        <div className="ca-manifesto ca-reveal" style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="ca-manifesto__mark" aria-hidden="true">&ldquo;</div>
          <p className="ca-manifesto-text">
            {head} <em>{tail}</em>
          </p>
          <div className="ca-manifesto__attr">{attribution}</div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
