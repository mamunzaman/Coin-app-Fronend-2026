import React, { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { getStats, MOCK_STATS } from "@/services/coinArchiveService";
import SectionId from "./SectionId";

const useCountUp = (end, suffix = "+", duration = 1800) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setVal(0);
  }, [end]);

  useEffect(() => {
    if (!ref.current || started.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(end); return; }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(end * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return [ref, `${val}${suffix}`];
};

export const Stats = () => {
  const { t, lang } = useLang();
  const [stats, setStats] = useState(MOCK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getStats(lang).then((data) => {
      if (!cancelled) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [lang]);

  const [r1, v1] = useCountUp(stats.coins);
  const [r2, v2] = useCountUp(stats.countries);
  const [r3, v3] = useCountUp(stats.years);

  return (
    <section
      data-testid={HOME.statsSection}
      className="ca-section"
      aria-busy={loading}
    >
      <div className="ca-container">
        <SectionId num="VII" label={t.stats.eyebrow} meta="Updated weekly" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 mt-8">
          <div data-testid={HOME.statCoins} className="text-center ca-reveal" ref={r1}>
            <div className="ca-stat__num">{v1}</div>
            <div className="ca-stat__label">{t.stats.coins}</div>
            <div className="ca-stat__meta"><span className="pulse" />Since 2004</div>
          </div>
          <div data-testid={HOME.statCountries} className="text-center ca-reveal ca-reveal--delay-1" ref={r2}>
            <div className="ca-stat__num">{v2}</div>
            <div className="ca-stat__label">{t.stats.countries}</div>
            <div className="ca-stat__meta">Across the Eurozone</div>
          </div>
          <div data-testid={HOME.statYears} className="text-center ca-reveal ca-reveal--delay-2" ref={r3}>
            <div className="ca-stat__num">{v3}</div>
            <div className="ca-stat__label">{t.stats.years}</div>
            <div className="ca-stat__meta">First issue Mar 2004</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
