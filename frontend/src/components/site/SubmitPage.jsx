import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { COUNTRIES, allYears } from "@/data/coinData";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const SubmitPage = () => {
  useScrollReveal();
  const { t, lang } = useLang();
  useDocumentTitle(lang === "de" ? "Münze einreichen" : "Submit a coin");

  const [form, setForm] = useState({
    title: "", country: "", year: "", mint: "", designer: "",
    description: "", contributor: "", email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock submission — would POST to /wp-json/coinarchive/v1/submissions later
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="ca-page" data-testid="submit-page">
        <Navbar />
        <article className="ca-section" style={{ paddingTop: 160, minHeight: "60vh" }}>
          <div className="ca-container" style={{ maxWidth: 720, textAlign: "center" }}>
            <div
              className="ca-reveal"
              style={{
                width: 80, height: 80, margin: "0 auto 32px",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(180deg, rgba(44, 182, 125, 0.18), rgba(44, 182, 125, 0.06))",
                border: "1px solid rgba(44, 182, 125, 0.32)",
              }}
            >
              <Check size={32} style={{ color: "#2CB67D" }} />
            </div>
            <h1 className="ca-section-title ca-reveal ca-reveal--delay-1" style={{ marginBottom: 18 }}>
              {lang === "de" ? "Danke für deinen Beitrag." : "Thank you for contributing."}
            </h1>
            <p className="ca-soft ca-reveal ca-reveal--delay-2" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 32px" }}>
              {lang === "de"
                ? "Unsere Redaktion prüft jede Einreichung manuell. Du erhältst eine Nachricht, sobald die Münze im Archiv aufgenommen wurde."
                : "Our editorial team reviews every submission manually. You will be notified as soon as your coin enters the archive."}
            </p>
            <Link to="/coins" className="ca-btn ca-btn--secondary" data-testid="submit-success-back">
              {lang === "de" ? "Zum Archiv" : "Back to archive"} <ArrowRight size={14} />
            </Link>
          </div>
        </article>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ca-page" data-testid="submit-page">
      <Navbar />
      <article className="ca-section" style={{ paddingTop: 140 }}>
        <div className="ca-container" style={{ maxWidth: 980 }}>
          <nav className="ca-breadcrumb mb-10">
            <Link to="/" className="ca-breadcrumb__back">
              <ArrowLeft size={14} /> {lang === "de" ? "Startseite" : "Home"}
            </Link>
          </nav>

          <SectionId num="I" label={lang === "de" ? "Mitmachen" : "Contribute"} meta={lang === "de" ? "Redaktionelle Prüfung" : "Editorially reviewed"} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 ca-reveal">
              <h1 className="ca-section-title" style={{ fontSize: "clamp(40px, 5.6vw, 68px)", marginBottom: 24 }}>
                {lang === "de" ? "Münze einreichen" : "Submit a coin"}
              </h1>
              <p className="ca-soft" style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 24 }}>
                {lang === "de"
                  ? "Hilf das Archiv zu vervollständigen. Reiche eine fehlende oder neue 2-Euro-Gedenkmünze ein — unsere Redaktion verifiziert jeden Eintrag, bevor er veröffentlicht wird."
                  : "Help complete the archive. Submit a missing or newly issued 2 Euro commemorative coin — our editors verify every entry before it is published."}
              </p>

              <ul className="ca-soft" style={{ fontSize: 14.5, lineHeight: 1.85, listStyle: "none", padding: 0 }}>
                <li className="flex items-start gap-3 mb-2">
                  <Check size={16} style={{ color: "var(--ca-gold-light)", marginTop: 4, flexShrink: 0 }} />
                  {lang === "de" ? "Eine Münze pro Einreichung" : "One coin per submission"}
                </li>
                <li className="flex items-start gap-3 mb-2">
                  <Check size={16} style={{ color: "var(--ca-gold-light)", marginTop: 4, flexShrink: 0 }} />
                  {lang === "de" ? "Eigene Fotos werden bevorzugt" : "Original photography preferred"}
                </li>
                <li className="flex items-start gap-3 mb-2">
                  <Check size={16} style={{ color: "var(--ca-gold-light)", marginTop: 4, flexShrink: 0 }} />
                  {lang === "de" ? "Quellen verlinken, wenn möglich" : "Link your sources when possible"}
                </li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-7 ca-reveal ca-reveal--delay-1 ca-submit-form" data-testid="submit-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="ca-form-field sm:col-span-2">
                  <span>{lang === "de" ? "Münzname" : "Coin title"}</span>
                  <input data-testid="submit-title" required value={form.title} onChange={set("title")} placeholder={lang === "de" ? "z. B. Paulskirche" : "e.g. Berlin Wall"} />
                </label>

                <label className="ca-form-field">
                  <span>{lang === "de" ? "Land" : "Country"}</span>
                  <select data-testid="submit-country" required value={form.country} onChange={set("country")}>
                    <option value="">—</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} — {c.name[lang]}</option>
                    ))}
                  </select>
                </label>

                <label className="ca-form-field">
                  <span>{lang === "de" ? "Jahr" : "Year"}</span>
                  <select data-testid="submit-year" required value={form.year} onChange={set("year")}>
                    <option value="">—</option>
                    {allYears().map((y) => (<option key={y} value={y}>{y}</option>))}
                  </select>
                </label>

                <label className="ca-form-field">
                  <span>{lang === "de" ? "Prägezeichen (optional)" : "Mint mark (optional)"}</span>
                  <input data-testid="submit-mint" value={form.mint} onChange={set("mint")} placeholder="A / D / F / G / J" maxLength={1} />
                </label>

                <label className="ca-form-field">
                  <span>{lang === "de" ? "Entwurf (optional)" : "Designer (optional)"}</span>
                  <input data-testid="submit-designer" value={form.designer} onChange={set("designer")} />
                </label>

                <label className="ca-form-field sm:col-span-2">
                  <span>{lang === "de" ? "Kurzbeschreibung" : "Short description"}</span>
                  <textarea data-testid="submit-description" required rows={4} value={form.description} onChange={set("description")} placeholder={lang === "de" ? "Was ist auf der Münze abgebildet?" : "What does the coin depict?"} />
                </label>

                <label className="ca-form-field sm:col-span-2">
                  <span>{lang === "de" ? "Foto-Upload (optional)" : "Photo upload (optional)"}</span>
                  <div className="ca-form-upload" aria-disabled="true">
                    <Upload size={18} />
                    <span>{lang === "de" ? "Datei wählen (Upload wird mit WordPress aktiviert)" : "Choose file (upload enabled after WordPress wiring)"}</span>
                  </div>
                </label>

                <label className="ca-form-field">
                  <span>{lang === "de" ? "Dein Name" : "Your name"}</span>
                  <input data-testid="submit-contributor" required value={form.contributor} onChange={set("contributor")} />
                </label>

                <label className="ca-form-field">
                  <span>E-mail</span>
                  <input data-testid="submit-email" type="email" required value={form.email} onChange={set("email")} />
                </label>
              </div>

              <div className="flex flex-wrap gap-4 mt-8 items-center">
                <button type="submit" data-testid="submit-submit" className="ca-btn ca-btn--primary">
                  {lang === "de" ? "Einreichen" : "Submit"}
                  <ArrowRight size={14} />
                </button>
                <span className="ca-mono">{lang === "de" ? "Wird redaktionell geprüft" : "Editorially reviewed"}</span>
              </div>
            </form>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default SubmitPage;
