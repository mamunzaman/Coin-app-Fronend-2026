import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import EditorialPage from "./EditorialPage";

export const ContactPage = () => {
  const { lang } = useLang();
  return (
    <EditorialPage
      testId="contact-page"
      num="I"
      eyebrow={lang === "de" ? "Kontakt" : "Contact"}
      meta={lang === "de" ? "Redaktion" : "Editorial"}
      title={lang === "de" ? "Schreib uns" : "Get in touch"}
      intro={lang === "de"
        ? "Ob Korrekturhinweis, Pressefrage oder Vorschlag — wir lesen jede Nachricht."
        : "Whether it is a correction, a press enquiry or a suggestion — we read every message."}
      sections={[
        {
          heading: lang === "de" ? "Redaktion" : "Editorial",
          body: ["editorial@coinarchive.eu"],
        },
        {
          heading: "Press",
          body: ["press@coinarchive.eu"],
        },
        {
          heading: lang === "de" ? "Korrekturen" : "Corrections",
          body: lang === "de"
            ? ["Verwende bitte die Schaltfläche „Korrektur vorschlagen“ direkt auf der Münzendetailseite — so erreicht sie sofort die richtigen Redakteur:innen."]
            : ["Please use the “Suggest a correction” button directly on a coin detail page — it routes the note straight to the editor responsible for that entry."],
        },
        {
          heading: lang === "de" ? "Postanschrift" : "Postal address",
          body: ["CoinArchive Editorial · Münzstrasse 1 · 10178 Berlin · Germany"],
        },
      ]}
    />
  );
};

export default ContactPage;
