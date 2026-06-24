import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useHomepageSettings, useSettingsLoading } from "@/context/SettingsContext";
import { isSectionVisible } from "@/utils/settingsHelpers";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Stats from "@/components/site/Stats";
import Manifesto from "@/components/site/Manifesto";
import ArchiveOverview from "@/components/site/ArchiveOverview";
import FeaturedCoins from "@/components/site/FeaturedCoins";
import FeaturedStory from "@/components/site/FeaturedStory";
import Countries from "@/components/site/Countries";
import CollectorLearning from "@/components/site/CollectorLearning";
import MintMarksSection from "@/components/site/MintMarksSection";
import SearchCta from "@/components/site/SearchCta";
import TrustQuality from "@/components/site/TrustQuality";
import Timeline from "@/components/site/Timeline";
import Contribute from "@/components/site/Contribute";
import Footer from "@/components/site/Footer";

export const HomePage = () => {
  const settingsLoading = useSettingsLoading();
  const homepage = useHomepageSettings();
  useScrollReveal([settingsLoading]);
  useDocumentTitle("");

  return (
    <div className="ca-page">
      <a href="#main" className="ca-skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        {isSectionVisible(homepage?.hero) && <Hero />}
        <Stats />
        {isSectionVisible(homepage?.quote) && <Manifesto />}
        {isSectionVisible(homepage?.archiveOverview) && <ArchiveOverview />}
        <FeaturedCoins />
        {isSectionVisible(homepage?.featuredStory) && <FeaturedStory />}
        <Countries />
        {isSectionVisible(homepage?.collectorEducation) && <CollectorLearning />}
        {isSectionVisible(homepage?.mintMarks) && <MintMarksSection />}
        {isSectionVisible(homepage?.searchCta) && <SearchCta />}
        {isSectionVisible(homepage?.archiveQuality) && <TrustQuality />}
        {isSectionVisible(homepage?.timeline) && <Timeline />}
        {isSectionVisible(homepage?.contribute) && <Contribute />}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
