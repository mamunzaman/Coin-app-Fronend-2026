import React from "react";
import { useParams } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import EditorialPage from "./EditorialPage";
import NotFoundPage from "./NotFoundPage";

// Mock article bodies. Will be migrated to WordPress posts later.
const BODIES = {
  "what-are-2-euro": {
    en: [
      { heading: "A pan-European canvas", body: ["In 2004, twelve years after the Maastricht Treaty introduced the euro, Eurozone countries began issuing commemorative 2 Euro coins. Every issue must depict a subject of national or European significance and follow strict design conventions — most notably, the European flag's twelve stars must encircle the design.",
        "The result is a remarkable thing: a single coin in active circulation that doubles as a curated portrait of the continent itself."] },
      { heading: "What makes one collectible?",
        body: ["Three factors decide value: mintage (how many were struck), condition (proof, BU, or circulation), and historical significance. A Belgian commemorative struck at 100,000 pieces will trade at €30–€60 even in circulated grade; a German federal-states coin struck at 30 million is worth roughly its face value."] },
    ],
    de: [
      { heading: "Eine paneuropäische Leinwand", body: ["2004 — zwölf Jahre nach Maastricht — begannen die Eurozonen-Staaten mit der Ausgabe von 2-Euro-Gedenkmünzen. Jede Ausgabe muss ein Thema von nationaler oder europäischer Bedeutung zeigen und strenge gestalterische Vorgaben einhalten — insbesondere die zwölf EU-Sterne als Umrandung.",
        "Das Ergebnis ist bemerkenswert: eine im Umlauf befindliche Münze, die zugleich ein kuratiertes Porträt des Kontinents ist."] },
      { heading: "Was macht sie sammelwürdig?",
        body: ["Drei Faktoren entscheiden über den Wert: Auflage, Erhaltung und historische Bedeutung. Eine belgische Gedenkmünze mit 100.000 Stück Auflage erzielt selbst zirkuliert 30–60 €; ein deutsches Bundesländer-Stück mit 30 Mio. Auflage liegt nah am Nennwert."] },
    ],
  },
  "mint-marks": {
    en: [
      { heading: "A single letter, struck into history",
        body: ["German 2 Euro coins carry a tiny letter — A, D, F, G or J — that identifies the mint of origin. The letter is not decorative: it is a centuries-old privy mark that pre-dates the euro by over a hundred years.",
          "A = Berlin, D = Munich, F = Stuttgart, G = Karlsruhe, J = Hamburg."] },
      { heading: "Why does it matter?",
        body: ["Because Germany strikes its coins simultaneously across five mints, the same commemorative will exist in five letter variants. Some collectors complete the full set of five — an A-D-F-G-J quintet — for every commemorative issued since 2002."] },
    ],
    de: [
      { heading: "Ein Buchstabe in die Geschichte geprägt",
        body: ["Deutsche 2-Euro-Münzen tragen einen kleinen Buchstaben — A, D, F, G oder J — der die Münzstätte angibt. Das ist keine Verzierung: es ist ein jahrhundertealtes Münzmeisterzeichen, das den Euro um über hundert Jahre vorausdatiert.",
          "A = Berlin, D = München, F = Stuttgart, G = Karlsruhe, J = Hamburg."] },
      { heading: "Warum ist das wichtig?",
        body: ["Weil Deutschland seine Münzen gleichzeitig in fünf Prägestätten ausgibt, existiert dieselbe Gedenkmünze in fünf Buchstabenvarianten. Manche Sammler vervollständigen das gesamte A-D-F-G-J-Set für jede Ausgabe seit 2002."] },
    ],
  },
  "mintage": {
    en: [
      { heading: "The arithmetic of rarity",
        body: ["Mintage is the total number of coins struck for a given issue. Germany typically strikes 30 million per commemorative; Belgium has issued runs as low as 70,000. That four-hundred-fold difference is the single largest driver of secondary-market value."] },
      { heading: "Reading a mintage figure",
        body: ["A 30 million mintage means the coin is, for collecting purposes, common. Below 5 million begins to be interesting; below 1 million is meaningful; below 500,000 is genuinely rare."] },
    ],
    de: [
      { heading: "Die Arithmetik der Seltenheit",
        body: ["Die Auflage ist die Gesamtzahl der geprägten Münzen einer Ausgabe. Deutschland prägt typischerweise 30 Millionen pro Gedenkmünze; Belgien hat Auflagen von nur 70.000 ausgegeben. Diese vierhundertfache Differenz ist der wichtigste Treiber des Sekundärmarktwerts."] },
      { heading: "Eine Auflage lesen",
        body: ["30 Millionen Auflage bedeutet sammlertechnisch häufig. Unter 5 Millionen wird es interessant; unter 1 Million bedeutsam; unter 500.000 echt selten."] },
    ],
  },
  "collecting": {
    en: [
      { heading: "Start narrow",
        body: ["The most common mistake is to chase every 2 Euro coin at once. Pick a lane — one country (e.g. Germany's federal states), one theme (Olympics, UNESCO), or one year per Eurozone country — and complete it. Depth beats breadth."] },
      { heading: "Three rules of storage",
        body: ["Coin capsules, archival paper sleeves, and a dry, light-controlled environment. Avoid PVC flips and adhesive holders — both attack the metal over time."] },
    ],
    de: [
      { heading: "Schmal anfangen",
        body: ["Der häufigste Fehler ist, jede 2-Euro-Münze auf einmal zu sammeln. Wähle eine Spur — ein Land, ein Thema oder ein Jahr — und schließe sie ab. Tiefe vor Breite."] },
      { heading: "Drei Regeln zur Aufbewahrung",
        body: ["Münzkapseln, archivtaugliche Hüllen und eine trockene, lichtgeschützte Umgebung. Vermeide PVC-Flips und Klebehalter — beide greifen das Metall an."] },
    ],
  },
  "condition": {
    en: [
      { heading: "The grading vocabulary",
        body: ["From most-to-least handled: Proof (PP), Brilliant Uncirculated (BU/Stempelglanz), Uncirculated, Extra Fine, Very Fine, Fine, Good. For 2 Euro commemoratives, the gap between BU and Circulated is the single biggest value step."] },
      { heading: "What to look at first",
        body: ["Field surface (the flat background) before relief — bag marks scar fields long before they reach the high points. Then check the rim for nicks."] },
    ],
    de: [
      { heading: "Die Bewertungsvokabel",
        body: ["Von meist- zu am wenigsten gehandhabt: Polierte Platte (PP), Stempelglanz (St), Vorzüglich (vz), Sehr Schön (ss), Schön. Für 2-Euro-Gedenkmünzen ist die Lücke zwischen St und zirkuliert die größte Wertstufe."] },
      { heading: "Worauf zuerst achten",
        body: ["Das Feld (der flache Hintergrund) vor dem Relief — Beutelschäden zerkratzen das Feld lange vor den hohen Punkten. Anschließend den Rand auf Kerben prüfen."] },
    ],
  },
};

export const LearnArticle = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const article = t.learn.articles.find((a) => a.slug === slug);
  const body = BODIES[slug];
  if (!article || !body) return <NotFoundPage />;

  return (
    <EditorialPage
      title={article.title}
      eyebrow={article.category}
      num="i"
      meta={`${article.readTime} ${t.learn.readTime}`}
      intro={article.excerpt}
      sections={body[lang]}
      testId={`learn-article-${slug}`}
      backTo={{ label: lang === "de" ? "Zurück zu Wissen" : "Back to Learn", to: "/learn" }}
    />
  );
};

export default LearnArticle;
