import React from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, pickSettingText, SettingsLink } from "@/utils/settingsHelpers";

export const Contribute = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.contribute;

  const sectionNum = pickField(section?.sectionNumber, "IX");
  const eyebrow = pickField(section?.sectionLabel, t.contribute.eyebrow);
  const title = pickField(section?.title, t.contribute.title);
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.contribute.sub);
  const primaryBtn = {
    text: pickField(section?.primaryButton?.text, t.contribute.cta),
    url: pickField(section?.primaryButton?.url, "/submit"),
  };
  const secondaryBtn = {
    text: pickField(section?.secondaryButton?.text, "View contributors"),
    url: pickField(section?.secondaryButton?.url, "/about"),
  };
  const stats = section?.stats;

  return (
    <section id="learn" data-testid={HOME.contributeSection} className="ca-contribute ca-section">
      <div className="ca-container relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 ca-reveal">
            <div className="ca-mono mb-6" style={{ color: "var(--ca-gold-light)" }}>{sectionNum}. {eyebrow}</div>
            <h2 className="ca-section-title mb-6">{title}</h2>
            <p className="ca-soft mb-10" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>{sub}</p>
            <div className="flex flex-wrap items-center gap-4">
              <SettingsLink url={primaryBtn.url} data-testid={HOME.contributeCta} className="ca-btn ca-btn--primary">
                {primaryBtn.text}
                <ArrowRight size={14} />
              </SettingsLink>
              <SettingsLink url={secondaryBtn.url} className="ca-btn ca-btn--ghost">
                {secondaryBtn.text}
              </SettingsLink>
            </div>
          </div>

          <div className="lg:col-span-5 ca-reveal ca-reveal--delay-1">
            <div
              style={{
                background: "linear-gradient(180deg, rgba(31,35,44,0.7), rgba(15,17,21,0.7))",
                border: "1px solid var(--ca-border)",
                borderRadius: 22, padding: 32,
              }}
            >
              <div className="ca-mono mb-5">Contributor activity</div>
              <div className="flex items-center gap-5 mb-7">
                <div className="ca-avatar-stack">
                  {["AB", "MR", "JK", "ED", "+"].map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <div>
                  <div className="ca-display" style={{ fontSize: 32, lineHeight: 1 }}>{stats?.contributors ?? 247}</div>
                  <div className="ca-mono" style={{ fontSize: 10 }}>contributors</div>
                </div>
              </div>

              <hr className="ca-divider" />

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="ca-display" style={{ fontSize: 26 }}>{stats?.this_week ?? "+12"}</div>
                  <div className="ca-mono" style={{ fontSize: 10 }}>this week</div>
                </div>
                <div>
                  <div className="ca-display" style={{ fontSize: 26, color: "var(--ca-gold-light)" }}>{stats?.coins_catalogued ?? 651}</div>
                  <div className="ca-mono" style={{ fontSize: 10 }}>coins catalogued</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contribute;
