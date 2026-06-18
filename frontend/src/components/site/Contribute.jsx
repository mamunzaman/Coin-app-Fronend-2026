import React from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";

export const Contribute = () => {
  const { t } = useLang();
  return (
    <section id="learn" data-testid={HOME.contributeSection} className="ca-contribute ca-section">
      <div className="ca-container relative" style={{ zIndex: 2 }}>
        <div className="text-center ca-reveal" style={{ maxWidth: 780, margin: "0 auto" }}>
          <div className="ca-eyebrow mb-6">{t.contribute.eyebrow}</div>
          <h2 className="ca-section-title mb-6">{t.contribute.title}</h2>
          <p className="ca-soft mb-12" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 48px" }}>
            {t.contribute.sub}
          </p>
          <button data-testid={HOME.contributeCta} className="ca-btn ca-btn--primary">
            {t.contribute.cta}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contribute;
