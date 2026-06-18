import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import EditorialPage from "./EditorialPage";

export const ImprintPage = () => {
  const { lang } = useLang();
  return (
    <EditorialPage
      testId="imprint-page"
      num="I"
      eyebrow={lang === "de" ? "Impressum" : "Imprint"}
      meta="§ 5 TMG"
      title={lang === "de" ? "Impressum" : "Imprint"}
      intro={lang === "de"
        ? "Angaben gemäß § 5 TMG."
        : "Information under § 5 of the German Telemedia Act."}
      sections={[
        {
          heading: lang === "de" ? "Anbieter" : "Operator",
          body: ["CoinArchive Editorial gGmbH", "Münzstrasse 1", "10178 Berlin", "Germany"],
        },
        {
          heading: lang === "de" ? "Vertreten durch" : "Represented by",
          body: ["A. M. Steiner (Editor-in-Chief)"],
        },
        {
          heading: "Contact",
          body: ["editorial@coinarchive.eu", "+49 30 0000 0000"],
        },
        {
          heading: lang === "de" ? "Registereintrag" : "Registry entry",
          body: lang === "de"
            ? ["Amtsgericht Berlin-Charlottenburg · HRB 000000 B"]
            : ["District Court Berlin-Charlottenburg · HRB 000000 B"],
        },
        {
          heading: lang === "de" ? "Verantwortlich für den Inhalt" : "Responsible for content",
          body: ["A. M. Steiner", "Münzstrasse 1", "10178 Berlin"],
        },
      ]}
    />
  );
};

export default ImprintPage;
