import React, { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { TIMELINE } from "@/services/coinArchiveService";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, pickSettingText, SettingsLink } from "@/utils/settingsHelpers";
import SectionId from "./SectionId";

export const Timeline = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.timeline;

  const items = useMemo(() => {
    const apiMilestones = section?.milestones;
    if (!apiMilestones?.length) return TIMELINE;

    return apiMilestones.map((m, i) => {
      const fallback = TIMELINE[i] || TIMELINE[TIMELINE.length - 1] || {};
      return {
        year: m.year || fallback.year,
        country: pickField(m.country, fallback.country || "Europe"),
        title: m.title || fallback.title,
        label: m.label || fallback.label,
        img: pickField(m.img, fallback.img || ""),
        extraDescription: pickField(m.extraDescription, fallback.extraDescription || ""),
        buttonText: pickField(m.buttonText, fallback.buttonText || `Browse ${m.year || fallback.year}`),
        buttonUrl: pickField(m.buttonUrl, fallback.buttonUrl || `/coins?year=${m.year || fallback.year}`),
      };
    });
  }, [section?.milestones]);

  const [activeIdx, setActiveIdx] = useState(Math.max(0, items.length - 1));
  const safeIdx = Math.min(activeIdx, items.length - 1);
  const active = items[safeIdx] || items[0];
  const progress = `${((safeIdx + 0.5) / items.length) * 100}%`;

  const sectionNum = pickField(section?.sectionNumber, "V");
  const sectionLabel = pickField(section?.sectionLabel, t.timeline.title);
  const meta = pickField(section?.rightLabel, pickField(section?.countLabel, "2004 — Present"));
  const title = pickField(section?.title, t.timeline.title);
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.timeline.sub);

  const activeTitle = pickSettingText(active?.title, lang, active?.title?.[lang] || "");
  const activeLabel = pickSettingText(active?.label, lang, active?.label?.[lang] || "");
  const activeDesc = pickField(
    active?.extraDescription,
    `${activeLabel} — one of ${Math.floor(8 + safeIdx * 4)} coins issued in ${active?.year}, now catalogued in the CoinArchive.`,
  );
  const btnText = pickField(active?.buttonText, `Browse ${active?.year}`);
  const btnUrl = pickField(active?.buttonUrl, `/coins?year=${active?.year}`);

  return (
    <section data-testid={HOME.timelineSection} className="ca-section">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <h2 className="ca-section-title">{title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1" style={{ fontSize: 16, lineHeight: 1.7 }}>{sub}</p>
        </div>

        <div className="ca-timeline ca-reveal">
          <div className="ca-timeline__track">
            <div className="ca-timeline__progress" style={{ width: progress }} />
          </div>
          <div className="ca-timeline__years">
            {items.map((tl, i) => (
              <button
                key={`${tl.year}-${i}`}
                data-testid={HOME.timelineYear(tl.year)}
                onClick={() => setActiveIdx(i)}
                className={`ca-timeline__year ${i === safeIdx ? "ca-timeline__year--active" : ""}`}
                aria-pressed={i === safeIdx}
              >
                {tl.year}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-20">
          <div className="md:col-span-5">
            <div key={active.year} className="ca-feature-coin" style={{ maxWidth: 420, margin: "0 auto" }}>
              {active.img && <img src={active.img} alt={activeTitle} />}
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="ca-mono mb-4" style={{ color: "var(--ca-gold-light)" }}>
              {active.year} · {active.country} · Plate {String(safeIdx + 1).padStart(2, "0")}
            </div>
            <h3 className="ca-display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {activeTitle}
            </h3>
            <p className="ca-soft mt-6" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 540 }}>{activeDesc}</p>
            <SettingsLink url={btnUrl} data-testid={HOME.timelineBrowseYear} className="ca-btn ca-btn--ghost ca-btn--sm mt-8">
              {btnText} <ArrowUpRight size={12} />
            </SettingsLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
