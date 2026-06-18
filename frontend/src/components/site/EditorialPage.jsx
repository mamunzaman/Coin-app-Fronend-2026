import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionId from "./SectionId";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Generic editorial single-page used for About, Contact, Privacy, Imprint, Contribute, Learn article.
 * Pure typography layout — preserves the existing museum aesthetic.
 */
export const EditorialPage = ({
  title,
  eyebrow,
  num = "I",
  meta,
  intro,
  sections = [],
  testId,
  backTo = { label: "Home", to: "/" },
}) => {
  useDocumentTitle(title);
  useScrollReveal();
  return (
    <div className="ca-page" data-testid={testId}>
      <Navbar />
      <article className="ca-section" style={{ paddingTop: 140 }}>
        <div className="ca-container" style={{ maxWidth: 900 }}>
          <nav className="ca-breadcrumb mb-10">
            <Link to={backTo.to} className="ca-breadcrumb__back">
              <ArrowLeft size={14} /> {backTo.label}
            </Link>
          </nav>

          <SectionId num={num} label={eyebrow} meta={meta} />

          <h1
            className="ca-section-title ca-reveal"
            style={{ fontSize: "clamp(40px, 6vw, 76px)", maxWidth: 780, marginBottom: 32 }}
          >
            {title}
          </h1>

          {intro && (
            <p
              className="ca-soft ca-reveal ca-reveal--delay-1"
              style={{ fontSize: 19, lineHeight: 1.7, maxWidth: 700, marginBottom: 56 }}
            >
              {intro}
            </p>
          )}

          {sections.map((s, i) => (
            <section
              key={i}
              className={`ca-reveal ca-reveal--delay-${Math.min(i + 1, 5)}`}
              style={{ marginBottom: 56 }}
            >
              {s.heading && (
                <h2
                  className="ca-display"
                  style={{ fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "-0.015em", marginBottom: 18 }}
                >
                  {s.heading}
                </h2>
              )}
              {Array.isArray(s.body) ? s.body.map((p, j) => (
                <p
                  key={j}
                  className="ca-soft"
                  style={{ fontSize: 16.5, lineHeight: 1.8, marginBottom: 18, maxWidth: 680 }}
                >
                  {p}
                </p>
              )) : (
                <p className="ca-soft" style={{ fontSize: 16.5, lineHeight: 1.8, maxWidth: 680 }}>
                  {s.body}
                </p>
              )}
              {s.children}
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default EditorialPage;
