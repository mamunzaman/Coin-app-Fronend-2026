import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import EditorialPage from "./EditorialPage";

export const AboutPage = () => {
  const { lang } = useLang();
  return (
    <EditorialPage
      testId="about-page"
      num="I"
      eyebrow={lang === "de" ? "Über das Archiv" : "About"}
      meta={lang === "de" ? "Kuratiert in Berlin" : "Curated in Berlin"}
      title={lang === "de" ? "Über CoinArchive" : "About CoinArchive"}
      intro={lang === "de"
        ? "CoinArchive ist ein digitales Museum für die europäischen 2-Euro-Gedenkmünzen. Wir katalogisieren, fotografieren und kommentieren jede Ausgabe seit 2004."
        : "CoinArchive is a digital museum dedicated to Europe's 2 Euro commemorative coins. We catalogue, photograph and annotate every issue since 2004."}
      sections={[
        {
          heading: lang === "de" ? "Was wir tun" : "What we do",
          body: lang === "de"
            ? ["Für jede Ausgabe dokumentieren wir Land, Jahr, Prägestätte, Auflage, Entwurf, technische Daten und einen redaktionellen Kontext. Jeder Eintrag wird vor Veröffentlichung von zwei Redakteur:innen verifiziert.",
               "Wir verfolgen keine kommerziellen Ziele. Das Archiv ist frei zugänglich und werbefrei."]
            : ["For every issue we record country, year, mint, mintage, designer, technical specifications and an editorial context. Each entry is verified by two editors before publication.",
               "We pursue no commercial agenda. The archive is free and ad-free."],
        },
        {
          heading: lang === "de" ? "Wie das Archiv wächst" : "How the archive grows",
          body: lang === "de"
            ? ["Beiträge kommen von Sammler:innen, Numismatiker:innen und Münzhäusern aus ganz Europa. Du kannst über die Schaltfläche „Münze einreichen“ jederzeit neue Daten beisteuern."]
            : ["Contributions come from collectors, numismatists and mint houses across Europe. You can submit new data at any time via the “Submit Coin” button."],
        },
      ]}
    />
  );
};

export default AboutPage;
