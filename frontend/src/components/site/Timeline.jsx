import React, { useState, useMemo } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { TIMELINE } from "@/data/coinData";

export const Timeline = () => {
  const { t, lang } = useLang();
  const [activeIdx, setActiveIdx] = useState(TIMELINE.length - 1);

  const active = TIMELINE[activeIdx];
  const progress = useMemo(() => `${((activeIdx + 0.5) / TIMELINE.length) * 100}%`, [activeIdx]);

  return (
    <section data-testid={HOME.timelineSection} className="ca-section" style={{ background: "linear-gradient(180deg, transparent, rgba(23,26,32,0.55), transparent)" }}>
      <div className="ca-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <div className="ca-eyebrow mb-5">{t.timeline.eyebrow}</div>
            <h2 className="ca-section-title">{t.timeline.title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1" style={{ fontSize: 16, lineHeight: 1.7 }}>
            {t.timeline.sub}
          </p>
        </div>

        <div className="ca-timeline ca-reveal">
          <div className="ca-timeline__track">
            <div className="ca-timeline__progress" style={{ width: progress }} />
          </div>
          <div className="ca-timeline__years">
            {TIMELINE.map((tl, i) => (
              <button
                key={tl.year}
                data-testid={HOME.timelineYear(tl.year)}
                onClick={() => setActiveIdx(i)}
                className={`ca-timeline__year ${i === activeIdx ? "ca-timeline__year--active" : ""}`}
                aria-pressed={i === activeIdx}
              >
                {tl.year}
              </button>
            ))}
          </div>
        </div>

        {/* Active highlight panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-20">
          <div className="md:col-span-5">
            <div
              key={active.year}
              className="ca-feature-coin"
              style={{ maxWidth: 420, margin: "0 auto", animation: "ca-float 9s ease-in-out infinite" }}
            >
              <img src={active.img} alt={active.title[lang]} />
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="ca-eyebrow mb-4" style={{ color: "var(--ca-gold-light)" }}>
              {active.year} · {active.country}
            </div>
            <h3 className="ca-display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {active.title[lang]}
            </h3>
            <p className="ca-muted mt-5" style={{ fontSize: 15, letterSpacing: "0.05em" }}>
              {active.label[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
