import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { HOME } from "@/constants/testIds/home";
import { FEATURE_COIN } from "@/services/coinArchiveService";
import { useHomepageSettings } from "@/context/SettingsContext";
import { pickField, SettingsLink } from "@/utils/settingsHelpers";
import SectionId from "./SectionId";

const STATIC_SPECS = {
  designer: "Bodo Broschat",
  mintage: "30,000,000",
  diameter: "25.75 mm",
  weight: "8.50 g",
  composition: "Bi-metal · CuNi / Ni-brass",
};

function stripHtml(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&#8220;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function formatMintage(value) {
  if (!value) return "";
  const num = Number(String(value).replace(/,/g, ""));
  if (Number.isFinite(num)) return num.toLocaleString("en-US");
  return String(value);
}

export const FeaturedStory = () => {
  const { t } = useLang();
  const homepage = useHomepageSettings();
  const section = homepage?.featuredStory;
  const coin = section?.coin;

  const story = useMemo(() => {
    const historyPreview = stripHtml(coin?.historicalBackground || "");
    const body = pickField(coin?.shortDescription, pickField(historyPreview, t.feature.body));

    return {
      country: pickField(coin?.country, t.feature.country),
      year: pickField(coin?.year, t.feature.year),
      title: pickField(coin?.title, t.feature.title),
      body,
      designer: pickField(coin?.designer, STATIC_SPECS.designer),
      mintage: pickField(formatMintage(coin?.mintage), STATIC_SPECS.mintage),
      diameter: pickField(coin?.diameter, STATIC_SPECS.diameter),
      weight: pickField(coin?.weight, STATIC_SPECS.weight),
      composition: pickField(coin?.material, STATIC_SPECS.composition),
      image: pickField(coin?.obverseImageUrl, pickField(coin?.reverseImageUrl, FEATURE_COIN)),
      url: pickField(coin?.url, "/coins/germany-2019-berlin-wall"),
    };
  }, [coin, t]);

  const sectionNum = pickField(section?.sectionNumber, "IV");
  const sectionLabel = pickField(section?.sectionLabel, t.feature.eyebrow);
  const meta = pickField(section?.countLabel, pickField(section?.rightLabel, "Exhibit 01"));

  return (
    <section data-testid={HOME.featureSection} className="ca-section">
      <div className="ca-container">
        <SectionId num={sectionNum} label={sectionLabel} meta={meta} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 ca-reveal">
            <div className="ca-feature-coin">
              <img src={story.image} alt={story.title} />
            </div>
          </div>

          <div className="lg:col-span-6 ca-reveal ca-reveal--delay-1">
            <div className="flex items-center gap-4 mb-6 ca-mono">
              <span style={{ color: "var(--ca-gold-light)" }}>{story.country}</span>
              <span style={{ width: 22, height: 1, background: "var(--ca-border)" }} />
              <span>{story.year}</span>
              <span style={{ width: 22, height: 1, background: "var(--ca-border)" }} />
              <span>Plate II.</span>
            </div>

            <h2 className="ca-section-title mb-7">{story.title}</h2>
            <p className="ca-soft" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>
              {story.body}
            </p>

            <dl className="ca-data-list">
              <dt>Designer</dt><dd>{story.designer}</dd>
              <dt>Mintage</dt><dd>{story.mintage}</dd>
              <dt>Diameter</dt><dd>{story.diameter}</dd>
              <dt>Weight</dt><dd>{story.weight}</dd>
              <dt>Composition</dt><dd>{story.composition}</dd>
            </dl>

            <SettingsLink url={story.url} data-testid={HOME.featureReadStory} className="ca-btn ca-btn--secondary mt-10">
              {t.feature.cta}
              <ArrowUpRight size={14} />
            </SettingsLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;
