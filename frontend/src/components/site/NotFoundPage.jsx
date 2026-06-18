import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const NotFoundPage = () => {
  useScrollReveal();
  const { lang } = useLang();
  useDocumentTitle(lang === "de" ? "Seite nicht gefunden" : "Page not found");
  return (
    <div className="ca-page" data-testid="not-found-page">
      <Navbar />
      <main className="ca-section" style={{ paddingTop: 180, paddingBottom: 180, textAlign: "center", position: "relative" }}>
        <div className="ca-container" style={{ maxWidth: 640 }}>
          <div
            className="ca-display ca-reveal"
            style={{
              fontSize: "clamp(120px, 18vw, 220px)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              fontStyle: "italic",
              background: "linear-gradient(180deg, #F2D16B 0%, #A97E12 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 24,
            }}
          >
            404
          </div>
          <h1 className="ca-section-title ca-reveal ca-reveal--delay-1" style={{ marginBottom: 18 }}>
            {lang === "de" ? "Dieser Eintrag fehlt im Archiv." : "This entry is not in the archive."}
          </h1>
          <p className="ca-soft ca-reveal ca-reveal--delay-2" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 36px" }}>
            {lang === "de"
              ? "Die gesuchte Seite existiert nicht oder wurde noch nicht katalogisiert."
              : "The page you are looking for does not exist or has not yet been catalogued."}
          </p>
          <div className="flex gap-3 justify-center ca-reveal ca-reveal--delay-3">
            <Link to="/" className="ca-btn ca-btn--secondary" data-testid="not-found-home">
              <ArrowLeft size={14} /> {lang === "de" ? "Startseite" : "Home"}
            </Link>
            <Link to="/coins" className="ca-btn ca-btn--primary" data-testid="not-found-browse">
              {lang === "de" ? "Archiv durchsuchen" : "Browse archive"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
