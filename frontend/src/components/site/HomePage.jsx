import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useSettingsLoading } from "@/context/SettingsContext";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Manifesto from "@/components/site/Manifesto";
import ArchiveOverview from "@/components/site/ArchiveOverview";
import FeaturedCoins from "@/components/site/FeaturedCoins";
import FeaturedStory from "@/components/site/FeaturedStory";
import Countries from "@/components/site/Countries";
import CollectorLearning from "@/components/site/CollectorLearning";
import SearchCta from "@/components/site/SearchCta";
import TrustQuality from "@/components/site/TrustQuality";
import Timeline from "@/components/site/Timeline";
import Contribute from "@/components/site/Contribute";
import Footer from "@/components/site/Footer";

export const HomePage = () => {
  const settingsLoading = useSettingsLoading();
  useScrollReveal([settingsLoading]);
  useDocumentTitle("");

  return (
    <div className="ca-page">
      <a href="#main" className="ca-skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Manifesto />
        <ArchiveOverview />
        <FeaturedCoins />
        <FeaturedStory />
        <Countries />
        <CollectorLearning />
        <SearchCta />
        <TrustQuality />
        <Timeline />
        <Contribute />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
