import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { COUNTRIES } from "@/services/coinArchiveService";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, pickSettingText, resolveNavUrl, SettingsLink } from "@/utils/settingsHelpers";
import SectionId from "./SectionId";
import CountryFlag from "./CountryFlag";

const formatYearRange = (c) => {
  if (c.yearStart && c.yearEnd) return `${c.yearStart} — ${c.yearEnd}`;
  if (c.yearStart) return `${c.yearStart} — Present`;
  if (c.since) return `${c.since} — 2025`;
  return "2004 — 2025";
};

const Card = ({ c, lang, t, feature, idx }) => {
  const href = c.url ? resolveNavUrl(c.url) : `/countries/${(c.code || c.slug || "").toLowerCase()}`;
  const displayCode = c.code || c.slug?.slice(0, 2).toUpperCase() || "EU";

  return (
    <SettingsLink
      url={href}
      data-testid={HOME.countryCard(displayCode)}
      className={`ca-country-card ca-reveal ca-reveal--delay-${Math.min(idx, 5)}`}
    >
      <div className={`ca-country-card__media ${feature ? "ca-country-card__media--feature" : ""}`}>
        <div className="ca-country-card__flag-wrap">
          <CountryFlag country={c} size={feature ? 56 : 40} />
        </div>
        {c.featured ? (
          <img src={c.featured} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div className="ca-monogram">
            <span className="ca-monogram__letters">{displayCode}</span>
            <span className="ca-monogram__year">{formatYearRange(c)}</span>
          </div>
        )}
      </div>
      <div className="ca-country-card__body">
        <div>
          <h3 className="ca-country-card__name">{c.name?.[lang] || c.name?.en || ""}</h3>
          <div className="ca-country-card__meta">{displayCode} · {c.coins ?? c.coinCount ?? 0} {t.countries.count}</div>
        </div>
        <span className="ca-country-card__cta">
          View <ArrowUpRight size={14} />
        </span>
      </div>
    </SettingsLink>
  );
};

export const Countries = () => {
  const { t, lang } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.countriesShowcase;

  const { primary, secondary } = useMemo(() => {
    if (section) {
      return {
        primary: section.primaryCountry || null,
        secondary: section.secondaryCountries || [],
      };
    }
    const [feature, ...rest] = COUNTRIES;
    return { primary: feature, secondary: rest };
  }, [section]);

  const sectionNum = pickField(section?.sectionNumber, "V");
  const sectionLabel = pickField(section?.sectionLabel, t.countries.eyebrow || t.countries.title);
  const meta = pickField(section?.countLabel, pickField(section?.rightLabel, `${COUNTRIES.length} of 20 states`));
  const title = pickField(section?.title, t.countries.title);
  const sub = pickSettingText(section?.descriptionLocalized ?? section?.description, lang, t.countries.sub);

  return (
    <section id="countries" data-testid={HOME.countriesSection} className="ca-section">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-7 ca-reveal">
            <h2 className="ca-section-title">{title}</h2>
          </div>
          <p className="md:col-span-5 ca-soft ca-reveal ca-reveal--delay-1" style={{ fontSize: 16, lineHeight: 1.7 }}>
            {sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {primary && (
            <div className="md:col-span-2 lg:col-span-2 md:row-span-2">
              <Card c={primary} lang={lang} t={t} feature idx={0} />
            </div>
          )}
          {secondary.map((c, i) => (
            <Card key={c.slug || c.code || c.id || i} c={c} lang={lang} t={t} idx={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countries;
