import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import EditorialPage from "./EditorialPage";

export const PrivacyPage = () => {
  const { lang } = useLang();
  return (
    <EditorialPage
      testId="privacy-page"
      num="I"
      eyebrow={lang === "de" ? "Datenschutz" : "Privacy"}
      meta={lang === "de" ? "Stand: 2025" : "Last updated: 2025"}
      title={lang === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
      intro={lang === "de"
        ? "CoinArchive verarbeitet Daten so sparsam wie möglich. Diese Seite erklärt, was wir erfassen, warum und wie lange."
        : "CoinArchive processes data as sparingly as possible. This page explains what we collect, why, and for how long."}
      sections={[
        {
          heading: lang === "de" ? "Was wir nicht tun" : "What we do not do",
          body: lang === "de"
            ? ["Wir setzen weder Werbe-Cookies noch Tracking-Pixel ein. Es werden keine Profile erstellt, keine Daten an Dritte verkauft."]
            : ["We use no advertising cookies and no tracking pixels. We do not build profiles and we do not sell data to third parties."],
        },
        {
          heading: lang === "de" ? "Was wir speichern" : "What we store",
          body: lang === "de"
            ? ["Bei Einreichungen oder Kontaktnachrichten speichern wir den eingegebenen Namen und die E-Mail-Adresse, um auf den Beitrag antworten zu können. Diese Daten werden nach Abschluss der Bearbeitung gelöscht — spätestens nach zwölf Monaten.",
               "Server-Zugriffslogs werden 14 Tage aufbewahrt und dienen ausschliesslich der Betriebssicherheit."]
            : ["For submissions or contact messages we store the name and email address you provided so we can reply. This data is deleted after processing is complete — at the latest after twelve months.",
               "Server access logs are kept for 14 days and serve operational security only."],
        },
        {
          heading: lang === "de" ? "Deine Rechte" : "Your rights",
          body: lang === "de"
            ? ["Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit — schreib an privacy@coinarchive.eu, wir antworten innerhalb von 14 Tagen."]
            : ["Access, rectification, erasure, restriction, portability — write to privacy@coinarchive.eu and we will respond within 14 days."],
        },
      ]}
    />
  );
};

export default PrivacyPage;
