// Static coin data — frontend-only. Will be replaced by WordPress + MySQL API later.
// All images are premium numismatic stock placeholders.

const IMG = {
  c1: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=900&q=80&auto=format&fit=crop",
  c2: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=900&q=80&auto=format&fit=crop",
  c3: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=900&q=80&auto=format&fit=crop",
  c4: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=900&q=80&auto=format&fit=crop",
  c5: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=900&q=80&auto=format&fit=crop",
  c6: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=900&q=80&auto=format&fit=crop",
  c7: "https://images.unsplash.com/photo-1554672408-730436b60dde?w=900&q=80&auto=format&fit=crop",
  c8: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=900&q=80&auto=format&fit=crop",
};

export const COUNTRIES = [
  { code: "DE", name: { en: "Germany", de: "Deutschland" }, flag: "🇩🇪", coins: 78, featured: IMG.c1 },
  { code: "FR", name: { en: "France", de: "Frankreich" }, flag: "🇫🇷", coins: 41, featured: IMG.c2 },
  { code: "IT", name: { en: "Italy", de: "Italien" }, flag: "🇮🇹", coins: 38, featured: IMG.c3 },
  { code: "ES", name: { en: "Spain", de: "Spanien" }, flag: "🇪🇸", coins: 34, featured: IMG.c4 },
  { code: "AT", name: { en: "Austria", de: "Österreich" }, flag: "🇦🇹", coins: 22, featured: IMG.c5 },
  { code: "BE", name: { en: "Belgium", de: "Belgien" }, flag: "🇧🇪", coins: 29, featured: IMG.c6 },
];

export const MINTS = [
  { letter: "A", city: "Berlin",    note: { en: "Staatliche Münze Berlin", de: "Staatliche Münze Berlin" } },
  { letter: "D", city: "Munich",    note: { en: "Bayerisches Hauptmünzamt", de: "Bayerisches Hauptmünzamt" } },
  { letter: "F", city: "Stuttgart", note: { en: "Staatliche Münze Baden-Württemberg", de: "Staatliche Münze Baden-Württemberg" } },
  { letter: "G", city: "Karlsruhe", note: { en: "Staatliche Münze Baden-Württemberg", de: "Staatliche Münze Baden-Württemberg" } },
  { letter: "J", city: "Hamburg",   note: { en: "Hamburgische Münze", de: "Hamburgische Münze" } },
];

const SPECS_DEFAULT = {
  diameter: "25.75 mm",
  weight: "8.50 g",
  thickness: "2.20 mm",
  composition: "Bi-metal · CuNi / Ni-brass",
  edge: { en: "Reeded with inscription", de: "Geriffelt mit Inschrift" },
};

const SERIES = {
  joint: { en: "Joint Issue", de: "Gemeinschaftsausgabe" },
  german: { en: "German Federal States", de: "Deutsche Bundesländer" },
  unesco: { en: "UNESCO Heritage", de: "UNESCO-Welterbe" },
  history: { en: "Historical", de: "Historisch" },
  culture: { en: "Culture", de: "Kultur" },
};

// 24 coins — full detail
export const COINS = [
  {
    slug: "de-2019-berlin-wall",
    country: "DE", year: 2019, mint: "A",
    title: { en: "30 Years — Fall of the Berlin Wall", de: "30 Jahre Mauerfall" },
    series: SERIES.history,
    designer: "Bodo Broschat",
    mintage: 30_000_000,
    obverse: IMG.c1, reverse: IMG.c2,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: true, isRare: false,
    story: {
      en: [
        "Issued in 2019, this coin marks three decades since the wall came down. Its design weaves together rising hands and the silhouette of the Brandenburg Gate — a monument to peaceful revolution and the reunification of Europe.",
        "Broschat's composition reads from left to right as a procession of figures climbing toward freedom, an iconography deliberately distinct from triumphalist coinage of earlier eras.",
      ],
      de: [
        "Die 2019 ausgegebene Münze erinnert an drei Jahrzehnte seit dem Fall der Berliner Mauer. Erhobene Hände und die Silhouette des Brandenburger Tors verweben sich zu einem Denkmal der friedlichen Revolution und der Wiedervereinigung Europas.",
        "Broschats Komposition liest sich von links nach rechts wie eine Prozession von Figuren auf dem Weg in die Freiheit — eine Ikonographie, die sich bewusst von triumphalen Münzgestaltungen früherer Epochen abhebt.",
      ],
    },
  },
  {
    slug: "fr-2024-paris-olympics",
    country: "FR", year: 2024, mint: null,
    title: { en: "Paris 2024 — Hercules", de: "Paris 2024 — Herkules" },
    series: SERIES.culture,
    designer: "J. Yzerman",
    mintage: 7_500_000,
    obverse: IMG.c2, reverse: IMG.c3,
    specs: SPECS_DEFAULT,
    isNew: true, isFeatured: false, isRare: false,
    story: {
      en: [
        "Marking the return of the Olympic Games to Paris after a century, the coin places a contemporary athlete beside the figure of Hercules — a long-standing emblem of the Monnaie de Paris.",
        "The reverse balances strength and stillness, a reference to the Games' opening ceremony along the Seine.",
      ],
      de: [
        "Anlässlich der Rückkehr der Olympischen Spiele nach Paris nach einem Jahrhundert zeigt die Münze einen zeitgenössischen Athleten neben der Figur des Herkules — einem traditionsreichen Wahrzeichen der Monnaie de Paris.",
        "Die Rückseite balanciert Kraft und Ruhe — eine Anspielung auf die Eröffnungsfeier entlang der Seine.",
      ],
    },
  },
  {
    slug: "de-2023-paulskirche",
    country: "DE", year: 2023, mint: "G",
    title: { en: "175 Years Paulskirche", de: "175 Jahre Paulskirche" },
    series: SERIES.history,
    designer: "Bodo Broschat",
    mintage: 30_000_000,
    obverse: IMG.c1, reverse: IMG.c4,
    specs: SPECS_DEFAULT,
    isNew: true, isFeatured: false, isRare: false,
    story: {
      en: [
        "The 2023 issue commemorates 175 years since the first elected German national assembly convened in Frankfurt's Paulskirche — a foundational moment of German democracy.",
      ],
      de: [
        "Die Ausgabe von 2023 erinnert an 175 Jahre seit der ersten gewählten deutschen Nationalversammlung in der Frankfurter Paulskirche — ein Gründungsmoment der deutschen Demokratie.",
      ],
    },
  },
  {
    slug: "it-2023-calvino",
    country: "IT", year: 2023, mint: null,
    title: { en: "Italo Calvino Centenary", de: "100 Jahre Italo Calvino" },
    series: SERIES.culture,
    designer: "M. Cassol",
    mintage: 3_000_000,
    obverse: IMG.c3, reverse: IMG.c5,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    story: {
      en: [
        "A literary tribute to one of the twentieth century's most beloved Italian writers, whose Invisible Cities continues to shape contemporary thought on urban memory.",
      ],
      de: [
        "Eine literarische Hommage an einen der beliebtesten italienischen Autoren des 20. Jahrhunderts, dessen Unsichtbare Städte bis heute das zeitgenössische Denken über urbane Erinnerung prägt.",
      ],
    },
  },
  {
    slug: "es-2023-caceres",
    country: "ES", year: 2023, mint: null,
    title: { en: "Cáceres — UNESCO World Heritage", de: "Cáceres — UNESCO-Welterbe" },
    series: SERIES.unesco,
    designer: "L. Gárate",
    mintage: 1_500_000,
    obverse: IMG.c4, reverse: IMG.c6,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    story: {
      en: [
        "Part of Spain's long-running UNESCO World Heritage series, this coin frames the medieval rooftops of Cáceres against an emblematic tower.",
      ],
      de: [
        "Teil der langjährigen UNESCO-Welterbe-Serie Spaniens. Die Münze rahmt die mittelalterlichen Dächer von Cáceres vor einem markanten Turm.",
      ],
    },
  },
  {
    slug: "at-2022-erasmus",
    country: "AT", year: 2022, mint: null,
    title: { en: "35 Years Erasmus Programme", de: "35 Jahre Erasmus-Programm" },
    series: SERIES.joint,
    designer: "T. Berger",
    mintage: 4_000_000,
    obverse: IMG.c5, reverse: IMG.c7,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: {
      en: [
        "A joint European issue celebrating thirty-five years of the Erasmus exchange programme — an emblem of cultural openness on the continent.",
      ],
      de: [
        "Eine gemeinschaftliche europäische Ausgabe zum fünfunddreißigjährigen Bestehen des Erasmus-Austauschprogramms — ein Sinnbild kultureller Offenheit auf dem Kontinent.",
      ],
    },
  },
  {
    slug: "be-2022-eu-flag",
    country: "BE", year: 2022, mint: null,
    title: { en: "EU Flag Anniversary", de: "Jahrestag Europaflagge" },
    series: SERIES.joint,
    designer: "A. Janssens",
    mintage: 155_000,
    obverse: IMG.c6, reverse: IMG.c8,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    story: {
      en: [
        "Belgium's contribution to the joint European issue marking the EU flag's anniversary, struck in a famously low mintage that makes it a collector's prize.",
      ],
      de: [
        "Belgiens Beitrag zur europäischen Gemeinschaftsausgabe zum Jahrestag der Europaflagge — bekannt für eine sehr niedrige Auflage und damit ein Sammlerstück.",
      ],
    },
  },
  {
    slug: "de-2021-magdeburg",
    country: "DE", year: 2021, mint: "F",
    title: { en: "Magdeburg — Saxony-Anhalt", de: "Magdeburg — Sachsen-Anhalt" },
    series: SERIES.german,
    designer: "Bodo Broschat",
    mintage: 30_000_000,
    obverse: IMG.c1, reverse: IMG.c3,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: {
      en: ["The Magdeburg Cathedral anchors the 2021 instalment of Germany's federal states series."],
      de: ["Der Magdeburger Dom prägt die Ausgabe 2021 der Bundesländer-Serie."],
    },
  },
  {
    slug: "fr-2017-coluche",
    country: "FR", year: 2017, mint: null,
    title: { en: "30 Years Restos du Cœur — Coluche", de: "30 Jahre Restos du Cœur — Coluche" },
    series: SERIES.culture,
    designer: "J. Yzerman",
    mintage: 10_000_000,
    obverse: IMG.c2, reverse: IMG.c4,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: {
      en: ["A tribute to comedian Coluche and the food-aid network he founded in 1985."],
      de: ["Eine Hommage an den Komiker Coluche und das 1985 von ihm gegründete Nahrungsmittelhilfsnetzwerk."],
    },
  },
  {
    slug: "it-2018-ministry-health",
    country: "IT", year: 2018, mint: null,
    title: { en: "60 Years — Italian Ministry of Health", de: "60 Jahre Gesundheitsministerium" },
    series: SERIES.history,
    designer: "M. Cassol",
    mintage: 4_000_000,
    obverse: IMG.c3, reverse: IMG.c5,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Marks six decades of the Italian Ministry of Health."], de: ["Erinnert an sechs Jahrzehnte des italienischen Gesundheitsministeriums."] },
  },
  {
    slug: "es-2016-segovia",
    country: "ES", year: 2016, mint: null,
    title: { en: "Aqueduct of Segovia", de: "Aquädukt von Segovia" },
    series: SERIES.unesco,
    designer: "L. Gárate",
    mintage: 4_000_000,
    obverse: IMG.c4, reverse: IMG.c6,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["The Roman aqueduct of Segovia, one of Spain's most photographed monuments."], de: ["Das römische Aquädukt von Segovia, eines der meistfotografierten Monumente Spaniens."] },
  },
  {
    slug: "at-2016-banque-nationale",
    country: "AT", year: 2016, mint: null,
    title: { en: "200 Years Austrian National Bank", de: "200 Jahre Oesterreichische Nationalbank" },
    series: SERIES.history,
    designer: "T. Berger",
    mintage: 16_000_000,
    obverse: IMG.c5, reverse: IMG.c7,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Two centuries of central banking in Austria."], de: ["Zwei Jahrhunderte Zentralbankwesen in Österreich."] },
  },
  {
    slug: "be-2018-may-68",
    country: "BE", year: 2018, mint: null,
    title: { en: "50 Years — May 1968", de: "50 Jahre Mai 1968" },
    series: SERIES.history,
    designer: "A. Janssens",
    mintage: 310_000,
    obverse: IMG.c6, reverse: IMG.c8,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    story: { en: ["Belgium's commemoration of the cultural upheaval of May 1968."], de: ["Belgiens Gedenken an die Kulturumwälzung im Mai 1968."] },
  },
  {
    slug: "de-2019-bundesrat",
    country: "DE", year: 2019, mint: "D",
    title: { en: "70 Years Bundesrat", de: "70 Jahre Bundesrat" },
    series: SERIES.history,
    designer: "Bodo Broschat",
    mintage: 30_000_000,
    obverse: IMG.c1, reverse: IMG.c7,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Seventy years of the German Federal Council."], de: ["Siebzig Jahre des deutschen Bundesrates."] },
  },
  {
    slug: "fr-2022-erasmus",
    country: "FR", year: 2022, mint: null,
    title: { en: "35 Years Erasmus — France", de: "35 Jahre Erasmus — Frankreich" },
    series: SERIES.joint,
    designer: "J. Yzerman",
    mintage: 7_000_000,
    obverse: IMG.c2, reverse: IMG.c8,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["The French issue of the 2022 Erasmus joint commemorative."], de: ["Die französische Ausgabe der Erasmus-Gemeinschaftsausgabe 2022."] },
  },
  {
    slug: "it-2015-expo-milan",
    country: "IT", year: 2015, mint: null,
    title: { en: "Expo Milano 2015", de: "Expo Mailand 2015" },
    series: SERIES.culture,
    designer: "M. Cassol",
    mintage: 3_500_000,
    obverse: IMG.c3, reverse: IMG.c1,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Feeding the planet, energy for life — the World Expo's theme in coin form."], de: ["Den Planeten ernähren, Energie für das Leben — das Motto der Weltausstellung in Münzform."] },
  },
  {
    slug: "es-2015-cueva-altamira",
    country: "ES", year: 2015, mint: null,
    title: { en: "Cave of Altamira", de: "Höhle von Altamira" },
    series: SERIES.unesco,
    designer: "L. Gárate",
    mintage: 4_000_000,
    obverse: IMG.c4, reverse: IMG.c2,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Prehistoric paintings of Altamira, recognised by UNESCO."], de: ["Die prähistorischen Höhlenmalereien von Altamira, anerkannt durch die UNESCO."] },
  },
  {
    slug: "at-2018-anti-fascist",
    country: "AT", year: 2018, mint: null,
    title: { en: "100 Years Republic of Austria", de: "100 Jahre Republik Österreich" },
    series: SERIES.history,
    designer: "T. Berger",
    mintage: 18_000_000,
    obverse: IMG.c5, reverse: IMG.c3,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["A centenary of the Austrian republic."], de: ["Ein Jahrhundert der Republik Österreich."] },
  },
  {
    slug: "be-2015-eu-flag",
    country: "BE", year: 2015, mint: null,
    title: { en: "30 Years EU Flag", de: "30 Jahre Europaflagge" },
    series: SERIES.joint,
    designer: "A. Janssens",
    mintage: 207_000,
    obverse: IMG.c6, reverse: IMG.c1,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    story: { en: ["Belgium's contribution to the 2015 joint EU flag commemorative."], de: ["Belgiens Beitrag zur Gemeinschaftsausgabe von 2015."] },
  },
  {
    slug: "de-2012-bavaria",
    country: "DE", year: 2012, mint: "F",
    title: { en: "Neuschwanstein — Bavaria", de: "Neuschwanstein — Bayern" },
    series: SERIES.german,
    designer: "Bodo Broschat",
    mintage: 30_000_000,
    obverse: IMG.c1, reverse: IMG.c4,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Bavaria's instalment in the federal states series features Neuschwanstein Castle."], de: ["Bayerns Beitrag zur Bundesländer-Serie zeigt Schloss Neuschwanstein."] },
  },
  {
    slug: "fr-2012-euro-cash",
    country: "FR", year: 2012, mint: null,
    title: { en: "10 Years of Euro Cash", de: "10 Jahre Euro-Bargeld" },
    series: SERIES.joint,
    designer: "J. Yzerman",
    mintage: 10_000_000,
    obverse: IMG.c2, reverse: IMG.c5,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["A joint European issue marking a decade since euro coins entered circulation."], de: ["Eine gemeinschaftliche Ausgabe zum zehnjährigen Jubiläum des Euro-Bargelds."] },
  },
  {
    slug: "it-2007-treaty-rome",
    country: "IT", year: 2007, mint: null,
    title: { en: "50 Years Treaty of Rome", de: "50 Jahre Römische Verträge" },
    series: SERIES.joint,
    designer: "M. Cassol",
    mintage: 5_000_000,
    obverse: IMG.c3, reverse: IMG.c7,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Italy's contribution to the joint commemorative of the Treaty of Rome."], de: ["Italiens Beitrag zur Gemeinschaftsausgabe zum 50. Jahrestag der Römischen Verträge."] },
  },
  {
    slug: "de-2007-mecklenburg",
    country: "DE", year: 2007, mint: "A",
    title: { en: "Schwerin Castle — Mecklenburg-Vorpommern", de: "Schweriner Schloss — Mecklenburg-Vorpommern" },
    series: SERIES.german,
    designer: "Heinz Hoyer",
    mintage: 30_000_000,
    obverse: IMG.c1, reverse: IMG.c8,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["The second instalment in Germany's federal states series."], de: ["Die zweite Ausgabe der deutschen Bundesländer-Serie."] },
  },
  {
    slug: "es-2010-cordoba",
    country: "ES", year: 2010, mint: null,
    title: { en: "Historic Centre of Córdoba", de: "Historisches Zentrum von Córdoba" },
    series: SERIES.unesco,
    designer: "L. Gárate",
    mintage: 4_000_000,
    obverse: IMG.c4, reverse: IMG.c5,
    specs: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    story: { en: ["Spain's UNESCO series — the Mosque-Cathedral of Córdoba."], de: ["Spaniens UNESCO-Serie — die Mezquita-Catedral von Córdoba."] },
  },
];

export const TIMELINE = [
  { year: 2004, label: { en: "First commemoratives", de: "Erste Gedenkmünzen" }, country: "Greece",       title: { en: "2004 Athens Olympics", de: "Olympische Spiele Athen 2004" }, img: IMG.c2 },
  { year: 2007, label: { en: "Treaty of Rome",        de: "Römische Verträge"  }, country: "Joint Issue", title: { en: "50 Years Treaty of Rome", de: "50 Jahre Römische Verträge" },   img: IMG.c3 },
  { year: 2009, label: { en: "EMU 10 Years",          de: "10 Jahre WWU"       }, country: "Joint Issue", title: { en: "10 Years of EMU", de: "10 Jahre Wirtschafts- und Währungsunion" }, img: IMG.c4 },
  { year: 2012, label: { en: "Euro 10 Years",         de: "10 Jahre Euro"      }, country: "Joint Issue", title: { en: "10 Years of Euro Cash", de: "10 Jahre Euro-Bargeld" },         img: IMG.c5 },
  { year: 2015, label: { en: "EU Flag",               de: "Europaflagge"       }, country: "Joint Issue", title: { en: "30 Years EU Flag", de: "30 Jahre Europaflagge" },              img: IMG.c6 },
  { year: 2019, label: { en: "Berlin Wall",           de: "Mauerfall"          }, country: "Germany",     title: { en: "30 Years Fall of the Berlin Wall", de: "30 Jahre Mauerfall" }, img: IMG.c1 },
  { year: 2022, label: { en: "Erasmus",               de: "Erasmus"            }, country: "Joint Issue", title: { en: "35 Years Erasmus Programme", de: "35 Jahre Erasmus-Programm" }, img: IMG.c7 },
  { year: 2024, label: { en: "Latest",                de: "Aktuell"            }, country: "Multiple",    title: { en: "Paris Olympics 2024", de: "Olympische Spiele Paris 2024" },   img: IMG.c8 },
];

// Latest 6 from COINS sorted by year desc (memo at module load)
export const RECENT_COINS = [...COINS]
  .sort((a, b) => b.year - a.year || (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  .slice(0, 6)
  .map((c, i) => ({
    id: i + 1,
    slug: c.slug,
    country: COUNTRIES.find((co) => co.code === c.country)?.name || { en: c.country, de: c.country },
    year: c.year,
    title: c.title,
    img: c.obverse,
    designer: c.designer,
  }));

export const HERO_COIN    = IMG.c1;
export const FEATURE_COIN = IMG.c1;

// Helpers
export const findCoinBySlug = (slug) => COINS.find((c) => c.slug === slug);
export const findCountry = (code) => COUNTRIES.find((c) => c.code === code);
export const relatedCoins = (slug, n = 3) => {
  const c = findCoinBySlug(slug);
  if (!c) return [];
  return COINS.filter((x) => x.slug !== slug && x.country === c.country).slice(0, n);
};
export const allYears = () => Array.from(new Set(COINS.map((c) => c.year))).sort((a, b) => b - a);
