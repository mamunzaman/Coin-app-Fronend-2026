import React, { useMemo } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { MINTS } from "@/services/coinArchiveService";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, pickSettingText } from "@/utils/settingsHelpers";
import SectionId from "./SectionId";

export const MintMarksSection = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.mintMarks;
  const fallbackMints = MINTS;

  const marks = useMemo(() => {
    const apiMarks = section?.cards;
    if (!apiMarks?.length) return fallbackMints;

    return apiMarks.map((m, i) => {
      const fallback = fallbackMints[i] || fallbackMints.find((x) => x.letter === m.letter) || {};
      const noteFallback = fallback.note?.[lang] || fallback.note?.en || "";
      return {
        letter: pickField(m.letter, fallback.letter || ""),
        city: pickField(m.city, fallback.city || ""),
        note: typeof m.note === "object"
          ? m.note
          : { en: pickField(m.note, fallback.note?.en || ""), de: pickField(m.note, fallback.note?.de || m.note || noteFallback) },
      };
    }).filter((m) => m.letter);
  }, [section?.cards, fallbackMints, lang]);

  const sectionNum = pickField(section?.sectionNumber, "VI");
  const sectionLabel = pickField(section?.sectionLabel, t.mints.eyebrow);
  const meta = pickField(section?.countLabel, t.mints.meta || "Federal Republic of Germany");
  const title = pickField(section?.title, t.mints.title);
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.mints.sub);

  return (
    <section id="mint-marks" data-testid={HOME.mintsSection} className="ca-section ca-mint-marks-section" aria-labelledby="mint-marks-heading">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="text-center ca-reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 id="mint-marks-heading" className="ca-section-title mb-6">{title}</h2>
          <p className="ca-soft" style={{ fontSize: 16, lineHeight: 1.7 }}>{sub}</p>
        </div>

        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-5 ca-reveal ca-reveal--delay-1"
          style={{ border: "1px solid var(--ca-border)", borderRadius: 24, overflow: "hidden", background: "linear-gradient(180deg, rgba(23,26,32,0.6), rgba(15,17,21,0.6))" }}
        >
          {marks.map((m) => (
            <div key={m.letter} data-testid={HOME.mintMark(m.letter)} className="ca-mint">
              <div className="ca-mint__stamp">
                <span className="ca-mint__letter">{m.letter}</span>
              </div>
              <div className="ca-mint__city">{m.city}</div>
              <div className="ca-mint__note">{m.note?.[lang] || m.note?.en || ""}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MintMarksSection;
