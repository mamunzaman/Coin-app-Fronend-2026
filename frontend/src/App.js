import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Manifesto from "@/components/site/Manifesto";
import FeaturedStory from "@/components/site/FeaturedStory";
import Countries from "@/components/site/Countries";
import Timeline from "@/components/site/Timeline";
import Mints from "@/components/site/Mints";
import Stats from "@/components/site/Stats";
import Recent from "@/components/site/Recent";
import Contribute from "@/components/site/Contribute";
import Footer from "@/components/site/Footer";
import CoinsListing from "@/components/site/CoinsListing";
import CoinDetail from "@/components/site/CoinDetail";

const Home = () => {
  useScrollReveal();
  return (
    <div className="ca-page">
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <FeaturedStory />
        <Countries />
        <Timeline />
        <Mints />
        <Stats />
        <Recent />
        <Contribute />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<CoinsListing />} />
          <Route path="/coins/:slug" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
