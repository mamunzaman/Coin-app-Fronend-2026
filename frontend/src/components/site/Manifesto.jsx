import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";

export const Manifesto = () => {
  const { t } = useLang();
  // split text to highlight a phrase italic-gold
  // pattern: take last segment after em-dash
  const [main, accent] = t.manifesto.text.includes(" — ")
    ? t.manifesto.text.split(/ — (.+)/)
    : [t.manifesto.text, null];

  return (
    <section data-testid={HOME.manifestoSection} className="ca-section">
      <div className="ca-container">
        <div className="ca-reveal" style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div className="ca-eyebrow mb-8">{t.manifesto.small}</div>
          <p className="ca-manifesto-text">
            {main}
            {accent && (
              <>
                {" — "}
                <em>{accent}</em>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
