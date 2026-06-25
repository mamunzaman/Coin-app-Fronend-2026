import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LanguageRouteSync from "@/i18n/LanguageRouteSync";
import { SettingsProvider } from "@/context/SettingsContext";
import HomePage from "@/components/site/HomePage";
import CoinsListing from "@/components/site/CoinsListing";
import CoinDetail from "@/components/site/CoinDetail";
import CountriesPage from "@/components/site/CountriesPage";
import CountryDetail from "@/components/site/CountryDetail";
import SeriesPage from "@/components/site/SeriesPage";
import SeriesDetail from "@/components/site/SeriesDetail";
import LearnPage from "@/components/site/LearnPage";
import LearnArticle from "@/components/site/LearnArticle";
import MintMarksPage from "@/components/site/MintMarksPage";
import SubmitPage from "@/components/site/SubmitPage";
import AboutPage from "@/components/site/AboutPage";
import ContactPage from "@/components/site/ContactPage";
import PrivacyPage from "@/components/site/PrivacyPage";
import ImprintPage from "@/components/site/ImprintPage";
import NotFoundPage from "@/components/site/NotFoundPage";

const Home = () => <HomePage />;

function SharedRoutes() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="coins" element={<CoinsListing />} />
      <Route path="coins/:slug" element={<CoinDetail />} />
      <Route path="countries" element={<CountriesPage />} />
      <Route path="countries/:code" element={<CountryDetail />} />
      <Route path="series" element={<SeriesPage />} />
      <Route path="series/:slug" element={<SeriesDetail />} />
      <Route path="learn" element={<LearnPage />} />
      <Route path="learn/:slug" element={<LearnArticle />} />
      <Route path="mint-marks" element={<MintMarksPage />} />
      <Route path="submit" element={<SubmitPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="imprint" element={<ImprintPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/en" element={<LanguageRouteSync />}>
              {SharedRoutes()}
            </Route>
            <Route path="/" element={<LanguageRouteSync />}>
              {SharedRoutes()}
            </Route>
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </LanguageProvider>
  );
}

export default App;
