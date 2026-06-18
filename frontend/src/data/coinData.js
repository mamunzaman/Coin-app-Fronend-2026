// Static coin data — frontend-only mock matching the future WordPress CPT shape.
// Schema: id, slug, title, country, countryCode, year, series, coinType, value,
// releaseDate, mintage, mintMarks[], designer, obverseImage, reverseImage,
// gallery[], shortDescription, historicalBackground, specifications

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
  { code: "DE", name: { en: "Germany", de: "Deutschland" }, flag: "🇩🇪", coins: 78, since: 2002, capital: "Berlin", featured: IMG.c1, blurb: { en: "The most prolific issuer in the Eurozone — home to a 16-year federal states series and a deep canon of historical commemoratives.", de: "Der produktivste Emittent der Eurozone — Heimat einer 16-jährigen Bundesländer-Serie und eines tiefen Kanons historischer Gedenkmünzen." } },
  { code: "FR", name: { en: "France", de: "Frankreich" }, flag: "🇫🇷", coins: 41, since: 2002, capital: "Paris", featured: IMG.c2, blurb: { en: "The Monnaie de Paris balances cultural and commemorative issues, with Hercules as its long-running emblem.", de: "Die Monnaie de Paris vereint kulturelle und gedenkende Ausgaben mit Herkules als ihrem langjährigen Wahrzeichen." } },
  { code: "IT", name: { en: "Italy", de: "Italien" }, flag: "🇮🇹", coins: 38, since: 2002, capital: "Rome", featured: IMG.c3, blurb: { en: "Italy's commemoratives lean editorial — literary anniversaries, ministry milestones, and cultural exposés.", de: "Italiens Gedenkmünzen sind editorial geprägt — literarische Jahrestage, Ministeriumsjubiläen und kulturelle Themen." } },
  { code: "ES", name: { en: "Spain", de: "Spanien" }, flag: "🇪🇸", coins: 34, since: 2002, capital: "Madrid", featured: IMG.c4, blurb: { en: "Home of the long-running UNESCO World Heritage series, one annual coin since 2010.", de: "Heimat der langlaufenden UNESCO-Welterbe-Serie — eine Münze jährlich seit 2010." } },
  { code: "AT", name: { en: "Austria", de: "Österreich" }, flag: "🇦🇹", coins: 22, since: 2002, capital: "Vienna", featured: IMG.c5, blurb: { en: "Restrained, classically engraved issues from the Münze Österreich.", de: "Zurückhaltende, klassisch gravierte Ausgaben der Münze Österreich." } },
  { code: "BE", name: { en: "Belgium", de: "Belgien" }, flag: "🇧🇪", coins: 29, since: 2002, capital: "Brussels", featured: IMG.c6, blurb: { en: "Famous for very low mintages — Belgian commemoratives are among the most prized by collectors.", de: "Berühmt für sehr niedrige Auflagen — belgische Gedenkmünzen zählen zu den begehrtesten unter Sammlern." } },
];

export const MINTS = [
  { letter: "A", city: "Berlin",    coord: { x: 52, y: 28 }, note: { en: "Staatliche Münze Berlin", de: "Staatliche Münze Berlin" } },
  { letter: "D", city: "Munich",    coord: { x: 50, y: 78 }, note: { en: "Bayerisches Hauptmünzamt", de: "Bayerisches Hauptmünzamt" } },
  { letter: "F", city: "Stuttgart", coord: { x: 32, y: 70 }, note: { en: "Staatliche Münze Baden-Württemberg", de: "Staatliche Münze Baden-Württemberg" } },
  { letter: "G", city: "Karlsruhe", coord: { x: 26, y: 64 }, note: { en: "Staatliche Münze Baden-Württemberg", de: "Staatliche Münze Baden-Württemberg" } },
  { letter: "J", city: "Hamburg",   coord: { x: 40, y: 18 }, note: { en: "Hamburgische Münze", de: "Hamburgische Münze" } },
];

const SPECS_DEFAULT = {
  diameter: "25.75 mm",
  weight: "8.50 g",
  thickness: "2.20 mm",
  composition: "Bi-metal · CuNi / Ni-brass",
  edge: { en: "Reeded with inscription", de: "Geriffelt mit Inschrift" },
};

// Series catalog
export const SERIES_LIST = [
  { slug: "german-federal-states", name: { en: "German Federal States", de: "Bundesländer-Serie" }, range: "2006 — 2022", country: "DE", count: 16, accent: "#D4AF37", description: { en: "A sixteen-year cycle issued by Germany, one coin per federal state, in alphabetical order — a complete cartographic portrait of the country in metal.", de: "Ein sechzehnjähriger Zyklus Deutschlands — eine Münze pro Bundesland in alphabetischer Reihenfolge. Ein vollständiges Kartenporträt des Landes in Metall." } },
  { slug: "treaty-of-rome",        name: { en: "Treaty of Rome", de: "Römische Verträge" },        range: "2007",         country: null, count: 13, accent: "#4F82FF", description: { en: "The first joint European commemorative, issued simultaneously by all thirteen Eurozone states in 2007 to mark fifty years of the Treaty of Rome.", de: "Die erste gemeinschaftliche europäische Gedenkmünze — 2007 von allen dreizehn Eurozonen-Staaten gleichzeitig zum fünfzigjährigen Jubiläum der Römischen Verträge ausgegeben." } },
  { slug: "erasmus",               name: { en: "Erasmus Programme", de: "Erasmus-Programm" },      range: "2022",         country: null, count: 19, accent: "#1E5EFF", description: { en: "Nineteen Eurozone states joined the 2022 joint issue celebrating thirty-five years of the Erasmus student exchange programme.", de: "Neunzehn Eurozonen-Staaten beteiligten sich an der Gemeinschaftsausgabe 2022 zum fünfunddreißigjährigen Bestehen des Erasmus-Austauschprogramms." } },
  { slug: "european-history",      name: { en: "European History", de: "Europäische Geschichte" }, range: "2004 — Present", country: null, count: 142, accent: "#A97E12", description: { en: "Single issues across the Eurozone marking pivotal historical moments — from the fall of the Berlin Wall to the centenary of women's suffrage.", de: "Einzelausgaben aus der gesamten Eurozone, die entscheidende historische Momente markieren — vom Mauerfall bis zum hundertjährigen Jubiläum des Frauenwahlrechts." } },
  { slug: "olympics",              name: { en: "Olympics", de: "Olympische Spiele" },              range: "2004 — Present", country: null, count: 7,  accent: "#2CB67D", description: { en: "Each Olympic Games hosted by a Eurozone city has been marked with a dedicated 2 Euro commemorative — from Athens 2004 to Paris 2024.", de: "Jede Olympische Spiele in einer Eurozonen-Stadt wurde mit einer eigenen 2-Euro-Gedenkmünze gewürdigt — von Athen 2004 bis Paris 2024." } },
];

const slugify = (series, slug) => {
  // Map coin record's series to a series slug — derived from title heuristics
  return null; // unused
};

// 24 coins — full schema
export const COINS = [
  {
    id: 1, slug: "germany-2025-saarland",
    title: { en: "Saarland — Federal States", de: "Saarland — Bundesländer" },
    country: "Germany", countryCode: "DE", year: 2025, mint: "A", mintMarks: ["A", "D", "F", "G", "J"],
    series: { en: "German Federal States", de: "Bundesländer-Serie" }, seriesSlug: "german-federal-states",
    coinType: { en: "Commemorative · Federal States", de: "Gedenkmünze · Bundesländer" },
    value: "€2.00", releaseDate: "2025-01-30",
    designer: "Bodo Broschat", mintage: 30_000_000,
    obverseImage: IMG.c1, reverseImage: IMG.c2,
    gallery: [IMG.c1, IMG.c2, IMG.c4, IMG.c7],
    specifications: SPECS_DEFAULT,
    isNew: true, isFeatured: true, isRare: false,
    shortDescription: { en: "The Saarland instalment of Germany's federal states series, featuring the Ludwigskirche.", de: "Die Saarland-Ausgabe der deutschen Bundesländer-Serie mit der Ludwigskirche." },
    historicalBackground: {
      en: [
        "The 2025 issue closes a near-twenty-year tradition: a single coin for each German federal state in alphabetical order. Saarland anchors the western edge of the country and its smallest state by area.",
        "The reverse depicts the Ludwigskirche in Saarbrücken, a baroque landmark and one of Germany's most important protestant churches.",
      ],
      de: [
        "Die Ausgabe 2025 schließt eine fast zwanzigjährige Tradition: jeweils eine Münze pro Bundesland in alphabetischer Reihenfolge. Das Saarland bildet den westlichen Rand des Landes und ist flächenmäßig das kleinste.",
        "Die Rückseite zeigt die Ludwigskirche in Saarbrücken, ein barockes Wahrzeichen und eine der bedeutendsten protestantischen Kirchen Deutschlands.",
      ],
    },
  },
  {
    id: 2, slug: "germany-2019-berlin-wall",
    title: { en: "30 Years — Fall of the Berlin Wall", de: "30 Jahre Mauerfall" },
    country: "Germany", countryCode: "DE", year: 2019, mint: "A", mintMarks: ["A", "D", "F", "G", "J"],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" },
    value: "€2.00", releaseDate: "2019-09-30",
    designer: "Bodo Broschat", mintage: 30_000_000,
    obverseImage: IMG.c1, reverseImage: IMG.c2,
    gallery: [IMG.c1, IMG.c2, IMG.c3, IMG.c7],
    specifications: SPECS_DEFAULT,
    isNew: false, isFeatured: true, isRare: false,
    shortDescription: { en: "Three decades since the wall came down, told through rising figures and the Brandenburg Gate.", de: "Drei Jahrzehnte nach dem Mauerfall, erzählt durch aufsteigende Figuren und das Brandenburger Tor." },
    historicalBackground: {
      en: [
        "Issued in 2019, the coin marks three decades since the wall came down. Broschat's composition reads from left to right as a procession of figures climbing toward freedom, an iconography deliberately distinct from triumphalist coinage of earlier eras.",
        "The Brandenburg Gate sits as the silent anchor of the design — restored, illuminated, no longer a backdrop to division.",
      ],
      de: [
        "Die 2019 ausgegebene Münze erinnert an drei Jahrzehnte seit dem Fall der Berliner Mauer. Broschats Komposition liest sich von links nach rechts wie eine Prozession von Figuren auf dem Weg in die Freiheit.",
        "Das Brandenburger Tor steht als stiller Anker der Gestaltung — restauriert, beleuchtet, nicht mehr Kulisse der Teilung.",
      ],
    },
  },
  {
    id: 3, slug: "france-2024-paris-olympics",
    title: { en: "Paris 2024 — Hercules", de: "Paris 2024 — Herkules" },
    country: "France", countryCode: "FR", year: 2024, mint: null, mintMarks: [],
    series: { en: "Olympics", de: "Olympische Spiele" }, seriesSlug: "olympics",
    coinType: { en: "Commemorative · Olympics", de: "Gedenkmünze · Olympia" },
    value: "€2.00", releaseDate: "2024-04-09",
    designer: "Joaquin Jimenez", mintage: 7_500_000,
    obverseImage: IMG.c2, reverseImage: IMG.c3,
    gallery: [IMG.c2, IMG.c3, IMG.c8],
    specifications: SPECS_DEFAULT,
    isNew: true, isFeatured: false, isRare: false,
    shortDescription: { en: "The return of the Olympic Games to Paris after a century, embodied by Hercules.", de: "Die Rückkehr der Olympischen Spiele nach Paris nach einem Jahrhundert, verkörpert durch Herkules." },
    historicalBackground: {
      en: ["Marking the return of the Olympic Games to Paris after a century, the coin places a contemporary athlete beside the figure of Hercules — a long-standing emblem of the Monnaie de Paris."],
      de: ["Anlässlich der Rückkehr der Olympischen Spiele nach Paris nach einem Jahrhundert zeigt die Münze einen zeitgenössischen Athleten neben der Figur des Herkules."],
    },
  },
  {
    id: 4, slug: "germany-2023-paulskirche",
    title: { en: "175 Years Paulskirche", de: "175 Jahre Paulskirche" },
    country: "Germany", countryCode: "DE", year: 2023, mint: "G", mintMarks: ["A", "D", "F", "G", "J"],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" },
    value: "€2.00", releaseDate: "2023-05-18",
    designer: "Bodo Broschat", mintage: 30_000_000,
    obverseImage: IMG.c1, reverseImage: IMG.c4,
    gallery: [IMG.c1, IMG.c4, IMG.c7],
    specifications: SPECS_DEFAULT,
    isNew: true, isFeatured: false, isRare: false,
    shortDescription: { en: "175 years since Germany's first elected national assembly convened in Frankfurt's Paulskirche.", de: "175 Jahre seit der ersten gewählten deutschen Nationalversammlung in der Frankfurter Paulskirche." },
    historicalBackground: {
      en: ["The 2023 issue commemorates 175 years since the first elected German national assembly convened in Frankfurt's Paulskirche — a foundational moment of German democracy."],
      de: ["Die Ausgabe von 2023 erinnert an 175 Jahre seit der ersten gewählten deutschen Nationalversammlung in der Frankfurter Paulskirche — ein Gründungsmoment der deutschen Demokratie."],
    },
  },
  {
    id: 5, slug: "italy-2023-calvino",
    title: { en: "Italo Calvino Centenary", de: "100 Jahre Italo Calvino" },
    country: "Italy", countryCode: "IT", year: 2023, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · Culture", de: "Gedenkmünze · Kultur" },
    value: "€2.00", releaseDate: "2023-10-15",
    designer: "Maria Carmela Colaneri", mintage: 3_000_000,
    obverseImage: IMG.c3, reverseImage: IMG.c5,
    gallery: [IMG.c3, IMG.c5],
    specifications: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    shortDescription: { en: "A literary tribute to Italo Calvino, one of the twentieth century's most beloved Italian writers.", de: "Eine literarische Hommage an Italo Calvino, einen der beliebtesten italienischen Autoren des 20. Jahrhunderts." },
    historicalBackground: {
      en: ["A literary tribute whose Invisible Cities continues to shape contemporary thought on urban memory."],
      de: ["Eine literarische Hommage, deren Unsichtbare Städte bis heute das zeitgenössische Denken über urbane Erinnerung prägt."],
    },
  },
  {
    id: 6, slug: "spain-2023-caceres",
    title: { en: "Cáceres — UNESCO World Heritage", de: "Cáceres — UNESCO-Welterbe" },
    country: "Spain", countryCode: "ES", year: 2023, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · UNESCO", de: "Gedenkmünze · UNESCO" },
    value: "€2.00", releaseDate: "2023-02-20",
    designer: "Luis Gárate", mintage: 1_500_000,
    obverseImage: IMG.c4, reverseImage: IMG.c6,
    gallery: [IMG.c4, IMG.c6],
    specifications: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    shortDescription: { en: "The medieval rooftops of Cáceres against an emblematic tower.", de: "Die mittelalterlichen Dächer von Cáceres vor einem markanten Turm." },
    historicalBackground: {
      en: ["Part of Spain's long-running UNESCO World Heritage series."],
      de: ["Teil der langjährigen UNESCO-Welterbe-Serie Spaniens."],
    },
  },
  {
    id: 7, slug: "austria-2022-erasmus",
    title: { en: "35 Years Erasmus Programme", de: "35 Jahre Erasmus-Programm" },
    country: "Austria", countryCode: "AT", year: 2022, mint: null, mintMarks: [],
    series: { en: "Erasmus Programme", de: "Erasmus-Programm" }, seriesSlug: "erasmus",
    coinType: { en: "Joint Issue · Erasmus", de: "Gemeinschaftsausgabe · Erasmus" },
    value: "€2.00", releaseDate: "2022-07-01",
    designer: "Joaquin Jimenez", mintage: 4_000_000,
    obverseImage: IMG.c5, reverseImage: IMG.c7,
    gallery: [IMG.c5, IMG.c7],
    specifications: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: false,
    shortDescription: { en: "A joint European issue celebrating thirty-five years of Erasmus.", de: "Eine gemeinschaftliche Ausgabe zum 35-jährigen Bestehen von Erasmus." },
    historicalBackground: { en: ["A joint European issue celebrating thirty-five years of the Erasmus exchange programme — an emblem of cultural openness on the continent."], de: ["Eine gemeinschaftliche europäische Ausgabe zum fünfunddreißigjährigen Bestehen des Erasmus-Austauschprogramms."] },
  },
  {
    id: 8, slug: "belgium-2022-eu-flag",
    title: { en: "EU Flag Anniversary", de: "Jahrestag Europaflagge" },
    country: "Belgium", countryCode: "BE", year: 2022, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" },
    value: "€2.00", releaseDate: "2022-10-12",
    designer: "Iris Bruijns", mintage: 155_000,
    obverseImage: IMG.c6, reverseImage: IMG.c8,
    gallery: [IMG.c6, IMG.c8],
    specifications: SPECS_DEFAULT,
    isNew: false, isFeatured: false, isRare: true,
    shortDescription: { en: "Belgium's contribution to the joint EU flag anniversary — famously low mintage.", de: "Belgiens Beitrag zur Gemeinschaftsausgabe — bekannt für sehr niedrige Auflage." },
    historicalBackground: { en: ["Belgium's contribution to the joint European issue marking the EU flag's anniversary, struck in a famously low mintage."], de: ["Belgiens Beitrag zur europäischen Gemeinschaftsausgabe zum Jahrestag der Europaflagge — bekannt für eine sehr niedrige Auflage."] },
  },
  {
    id: 9, slug: "germany-2021-magdeburg",
    title: { en: "Magdeburg — Saxony-Anhalt", de: "Magdeburg — Sachsen-Anhalt" },
    country: "Germany", countryCode: "DE", year: 2021, mint: "F", mintMarks: ["A", "D", "F", "G", "J"],
    series: { en: "German Federal States", de: "Bundesländer-Serie" }, seriesSlug: "german-federal-states",
    coinType: { en: "Commemorative · Federal States", de: "Gedenkmünze · Bundesländer" },
    value: "€2.00", releaseDate: "2021-01-26",
    designer: "Bodo Broschat", mintage: 30_000_000,
    obverseImage: IMG.c1, reverseImage: IMG.c3,
    gallery: [IMG.c1, IMG.c3],
    specifications: SPECS_DEFAULT,
    shortDescription: { en: "The Magdeburg Cathedral anchors the 2021 federal states issue.", de: "Der Magdeburger Dom prägt die Ausgabe 2021 der Bundesländer-Serie." },
    historicalBackground: { en: ["The Magdeburg Cathedral anchors the 2021 instalment of Germany's federal states series."], de: ["Der Magdeburger Dom prägt die Ausgabe 2021 der Bundesländer-Serie."] },
  },
  {
    id: 10, slug: "france-2017-coluche",
    title: { en: "30 Years Restos du Cœur — Coluche", de: "30 Jahre Restos du Cœur — Coluche" },
    country: "France", countryCode: "FR", year: 2017, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · Culture", de: "Gedenkmünze · Kultur" },
    value: "€2.00", releaseDate: "2017-10-26",
    designer: "Joaquin Jimenez", mintage: 10_000_000,
    obverseImage: IMG.c2, reverseImage: IMG.c4,
    gallery: [IMG.c2, IMG.c4],
    specifications: SPECS_DEFAULT,
    shortDescription: { en: "A tribute to comedian Coluche and the food-aid network he founded in 1985.", de: "Eine Hommage an den Komiker Coluche und das 1985 von ihm gegründete Nahrungsmittelhilfsnetzwerk." },
    historicalBackground: { en: ["A tribute to comedian Coluche and the food-aid network he founded."], de: ["Eine Hommage an den Komiker Coluche und das von ihm gegründete Nahrungsmittelhilfsnetzwerk."] },
  },
  {
    id: 11, slug: "italy-2018-ministry-health",
    title: { en: "60 Years — Italian Ministry of Health", de: "60 Jahre Gesundheitsministerium" },
    country: "Italy", countryCode: "IT", year: 2018, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" }, value: "€2.00", releaseDate: "2018-03-12",
    designer: "Annalisa Masini", mintage: 4_000_000,
    obverseImage: IMG.c3, reverseImage: IMG.c5, gallery: [IMG.c3, IMG.c5], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Six decades of the Italian Ministry of Health.", de: "Sechs Jahrzehnte des italienischen Gesundheitsministeriums." },
    historicalBackground: { en: ["Marks six decades of the Italian Ministry of Health."], de: ["Erinnert an sechs Jahrzehnte des italienischen Gesundheitsministeriums."] },
  },
  {
    id: 12, slug: "spain-2016-segovia",
    title: { en: "Aqueduct of Segovia", de: "Aquädukt von Segovia" },
    country: "Spain", countryCode: "ES", year: 2016, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · UNESCO", de: "Gedenkmünze · UNESCO" }, value: "€2.00", releaseDate: "2016-02-18",
    designer: "Luis Gárate", mintage: 4_000_000,
    obverseImage: IMG.c4, reverseImage: IMG.c6, gallery: [IMG.c4, IMG.c6], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Spain's UNESCO series — the Roman aqueduct of Segovia.", de: "Spaniens UNESCO-Serie — das römische Aquädukt von Segovia." },
    historicalBackground: { en: ["The Roman aqueduct of Segovia, one of Spain's most photographed monuments."], de: ["Das römische Aquädukt von Segovia, eines der meistfotografierten Monumente Spaniens."] },
  },
  {
    id: 13, slug: "austria-2016-national-bank",
    title: { en: "200 Years Austrian National Bank", de: "200 Jahre Oesterreichische Nationalbank" },
    country: "Austria", countryCode: "AT", year: 2016, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" }, value: "€2.00", releaseDate: "2016-06-01",
    designer: "Helmut Andexlinger", mintage: 16_000_000,
    obverseImage: IMG.c5, reverseImage: IMG.c7, gallery: [IMG.c5, IMG.c7], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Two centuries of central banking in Austria.", de: "Zwei Jahrhunderte Zentralbankwesen in Österreich." },
    historicalBackground: { en: ["Two centuries of central banking in Austria."], de: ["Zwei Jahrhunderte Zentralbankwesen in Österreich."] },
  },
  {
    id: 14, slug: "belgium-2018-may-68",
    title: { en: "50 Years — May 1968", de: "50 Jahre Mai 1968" },
    country: "Belgium", countryCode: "BE", year: 2018, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" }, value: "€2.00", releaseDate: "2018-05-04",
    designer: "Iris Bruijns", mintage: 310_000,
    obverseImage: IMG.c6, reverseImage: IMG.c8, gallery: [IMG.c6, IMG.c8], specifications: SPECS_DEFAULT,
    isRare: true,
    shortDescription: { en: "The cultural upheaval of May 1968, commemorated by Belgium.", de: "Die Kulturumwälzung im Mai 1968, gewürdigt von Belgien." },
    historicalBackground: { en: ["Belgium's commemoration of the cultural upheaval of May 1968."], de: ["Belgiens Gedenken an die Kulturumwälzung im Mai 1968."] },
  },
  {
    id: 15, slug: "germany-2019-bundesrat",
    title: { en: "70 Years Bundesrat", de: "70 Jahre Bundesrat" },
    country: "Germany", countryCode: "DE", year: 2019, mint: "D", mintMarks: ["A", "D", "F", "G", "J"],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" }, value: "€2.00", releaseDate: "2019-02-13",
    designer: "Patricija Šukienė", mintage: 30_000_000,
    obverseImage: IMG.c1, reverseImage: IMG.c7, gallery: [IMG.c1, IMG.c7], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Seventy years of the German Federal Council.", de: "Siebzig Jahre des deutschen Bundesrates." },
    historicalBackground: { en: ["Seventy years of the German Federal Council."], de: ["Siebzig Jahre des deutschen Bundesrates."] },
  },
  {
    id: 16, slug: "france-2022-erasmus",
    title: { en: "35 Years Erasmus — France", de: "35 Jahre Erasmus — Frankreich" },
    country: "France", countryCode: "FR", year: 2022, mint: null, mintMarks: [],
    series: { en: "Erasmus Programme", de: "Erasmus-Programm" }, seriesSlug: "erasmus",
    coinType: { en: "Joint Issue · Erasmus", de: "Gemeinschaftsausgabe · Erasmus" }, value: "€2.00", releaseDate: "2022-07-01",
    designer: "Joaquin Jimenez", mintage: 7_000_000,
    obverseImage: IMG.c2, reverseImage: IMG.c8, gallery: [IMG.c2, IMG.c8], specifications: SPECS_DEFAULT,
    shortDescription: { en: "The French issue of the 2022 Erasmus joint commemorative.", de: "Die französische Ausgabe der Erasmus-Gemeinschaftsausgabe 2022." },
    historicalBackground: { en: ["The French issue of the Erasmus joint commemorative."], de: ["Die französische Ausgabe der Erasmus-Gemeinschaftsausgabe."] },
  },
  {
    id: 17, slug: "italy-2015-expo-milan",
    title: { en: "Expo Milano 2015", de: "Expo Mailand 2015" },
    country: "Italy", countryCode: "IT", year: 2015, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · Culture", de: "Gedenkmünze · Kultur" }, value: "€2.00", releaseDate: "2015-05-01",
    designer: "Maria Carmela Colaneri", mintage: 3_500_000,
    obverseImage: IMG.c3, reverseImage: IMG.c1, gallery: [IMG.c3, IMG.c1], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Feeding the planet, energy for life — the World Expo's theme in coin form.", de: "Den Planeten ernähren, Energie für das Leben — das Motto der Weltausstellung in Münzform." },
    historicalBackground: { en: ["Feeding the planet — Expo Milano in coin form."], de: ["Den Planeten ernähren — Expo Mailand in Münzform."] },
  },
  {
    id: 18, slug: "spain-2015-altamira",
    title: { en: "Cave of Altamira", de: "Höhle von Altamira" },
    country: "Spain", countryCode: "ES", year: 2015, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · UNESCO", de: "Gedenkmünze · UNESCO" }, value: "€2.00", releaseDate: "2015-02-12",
    designer: "Luis Gárate", mintage: 4_000_000,
    obverseImage: IMG.c4, reverseImage: IMG.c2, gallery: [IMG.c4, IMG.c2], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Prehistoric paintings of Altamira, recognised by UNESCO.", de: "Die prähistorischen Höhlenmalereien von Altamira." },
    historicalBackground: { en: ["Prehistoric paintings of Altamira."], de: ["Die prähistorischen Höhlenmalereien von Altamira."] },
  },
  {
    id: 19, slug: "austria-2018-republic-100",
    title: { en: "100 Years Republic of Austria", de: "100 Jahre Republik Österreich" },
    country: "Austria", countryCode: "AT", year: 2018, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" }, value: "€2.00", releaseDate: "2018-10-26",
    designer: "Helmut Andexlinger", mintage: 18_000_000,
    obverseImage: IMG.c5, reverseImage: IMG.c3, gallery: [IMG.c5, IMG.c3], specifications: SPECS_DEFAULT,
    shortDescription: { en: "A centenary of the Austrian republic.", de: "Ein Jahrhundert der Republik Österreich." },
    historicalBackground: { en: ["A centenary of the Austrian republic."], de: ["Ein Jahrhundert der Republik Österreich."] },
  },
  {
    id: 20, slug: "belgium-2015-eu-flag",
    title: { en: "30 Years EU Flag", de: "30 Jahre Europaflagge" },
    country: "Belgium", countryCode: "BE", year: 2015, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Commemorative · History", de: "Gedenkmünze · Geschichte" }, value: "€2.00", releaseDate: "2015-10-15",
    designer: "Iris Bruijns", mintage: 207_000,
    obverseImage: IMG.c6, reverseImage: IMG.c1, gallery: [IMG.c6, IMG.c1], specifications: SPECS_DEFAULT,
    isRare: true,
    shortDescription: { en: "Belgium's contribution to the 2015 joint EU flag commemorative.", de: "Belgiens Beitrag zur Gemeinschaftsausgabe von 2015." },
    historicalBackground: { en: ["Belgium's joint EU-flag contribution."], de: ["Belgiens Beitrag zur EU-Flag-Gemeinschaftsausgabe."] },
  },
  {
    id: 21, slug: "germany-2012-bavaria",
    title: { en: "Neuschwanstein — Bavaria", de: "Neuschwanstein — Bayern" },
    country: "Germany", countryCode: "DE", year: 2012, mint: "F", mintMarks: ["A", "D", "F", "G", "J"],
    series: { en: "German Federal States", de: "Bundesländer-Serie" }, seriesSlug: "german-federal-states",
    coinType: { en: "Commemorative · Federal States", de: "Gedenkmünze · Bundesländer" }, value: "€2.00", releaseDate: "2012-01-27",
    designer: "Erich Ott", mintage: 30_000_000,
    obverseImage: IMG.c1, reverseImage: IMG.c4, gallery: [IMG.c1, IMG.c4], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Bavaria's instalment features Neuschwanstein Castle.", de: "Bayerns Beitrag zeigt Schloss Neuschwanstein." },
    historicalBackground: { en: ["Bavaria's instalment in the federal states series features Neuschwanstein Castle."], de: ["Bayerns Beitrag zur Bundesländer-Serie zeigt Schloss Neuschwanstein."] },
  },
  {
    id: 22, slug: "france-2012-euro-cash",
    title: { en: "10 Years of Euro Cash", de: "10 Jahre Euro-Bargeld" },
    country: "France", countryCode: "FR", year: 2012, mint: null, mintMarks: [],
    series: { en: "European History", de: "Europäische Geschichte" }, seriesSlug: "european-history",
    coinType: { en: "Joint Issue · Euro", de: "Gemeinschaftsausgabe · Euro" }, value: "€2.00", releaseDate: "2012-01-01",
    designer: "Helmut Andexlinger", mintage: 10_000_000,
    obverseImage: IMG.c2, reverseImage: IMG.c5, gallery: [IMG.c2, IMG.c5], specifications: SPECS_DEFAULT,
    shortDescription: { en: "A joint European issue marking a decade of euro coins in circulation.", de: "Eine gemeinschaftliche Ausgabe zum 10-jährigen Jubiläum des Euro-Bargelds." },
    historicalBackground: { en: ["A joint European issue marking ten years since euro coins entered circulation."], de: ["Eine gemeinschaftliche Ausgabe zum zehnjährigen Jubiläum des Euro-Bargelds."] },
  },
  {
    id: 23, slug: "italy-2007-treaty-rome",
    title: { en: "50 Years Treaty of Rome", de: "50 Jahre Römische Verträge" },
    country: "Italy", countryCode: "IT", year: 2007, mint: null, mintMarks: [],
    series: { en: "Treaty of Rome", de: "Römische Verträge" }, seriesSlug: "treaty-of-rome",
    coinType: { en: "Joint Issue · Treaty of Rome", de: "Gemeinschaftsausgabe · Römische Verträge" }, value: "€2.00", releaseDate: "2007-03-25",
    designer: "Maria Carmela Colaneri", mintage: 5_000_000,
    obverseImage: IMG.c3, reverseImage: IMG.c7, gallery: [IMG.c3, IMG.c7], specifications: SPECS_DEFAULT,
    shortDescription: { en: "Italy's contribution to the first joint European commemorative.", de: "Italiens Beitrag zur ersten europäischen Gemeinschaftsausgabe." },
    historicalBackground: { en: ["Italy's contribution to the joint commemorative of the Treaty of Rome — the first joint Eurozone issue ever struck."], de: ["Italiens Beitrag zur Gemeinschaftsausgabe zum 50. Jahrestag der Römischen Verträge — die erste gemeinschaftliche Eurozonen-Ausgabe."] },
  },
  {
    id: 24, slug: "germany-2007-mecklenburg",
    title: { en: "Schwerin Castle — Mecklenburg-Vorpommern", de: "Schweriner Schloss — Mecklenburg-Vorpommern" },
    country: "Germany", countryCode: "DE", year: 2007, mint: "A", mintMarks: ["A", "D", "F", "G", "J"],
    series: { en: "German Federal States", de: "Bundesländer-Serie" }, seriesSlug: "german-federal-states",
    coinType: { en: "Commemorative · Federal States", de: "Gedenkmünze · Bundesländer" }, value: "€2.00", releaseDate: "2007-02-02",
    designer: "Heinz Hoyer", mintage: 30_000_000,
    obverseImage: IMG.c1, reverseImage: IMG.c8, gallery: [IMG.c1, IMG.c8], specifications: SPECS_DEFAULT,
    shortDescription: { en: "The second instalment in Germany's federal states series.", de: "Die zweite Ausgabe der deutschen Bundesländer-Serie." },
    historicalBackground: { en: ["The second instalment in Germany's federal states series — Schwerin Castle anchors the design."], de: ["Die zweite Ausgabe der Bundesländer-Serie — das Schweriner Schloss prägt die Gestaltung."] },
  },
];

export const TIMELINE = [
  { year: 2004, label: { en: "First commemoratives", de: "Erste Gedenkmünzen" }, country: "Greece", title: { en: "2004 Athens Olympics", de: "Olympische Spiele Athen 2004" }, img: IMG.c2 },
  { year: 2007, label: { en: "Treaty of Rome", de: "Römische Verträge" }, country: "Joint Issue", title: { en: "50 Years Treaty of Rome", de: "50 Jahre Römische Verträge" }, img: IMG.c3 },
  { year: 2009, label: { en: "EMU 10 Years", de: "10 Jahre WWU" }, country: "Joint Issue", title: { en: "10 Years of EMU", de: "10 Jahre Wirtschafts- und Währungsunion" }, img: IMG.c4 },
  { year: 2012, label: { en: "Euro 10 Years", de: "10 Jahre Euro" }, country: "Joint Issue", title: { en: "10 Years of Euro Cash", de: "10 Jahre Euro-Bargeld" }, img: IMG.c5 },
  { year: 2015, label: { en: "EU Flag", de: "Europaflagge" }, country: "Joint Issue", title: { en: "30 Years EU Flag", de: "30 Jahre Europaflagge" }, img: IMG.c6 },
  { year: 2019, label: { en: "Berlin Wall", de: "Mauerfall" }, country: "Germany", title: { en: "30 Years Fall of the Berlin Wall", de: "30 Jahre Mauerfall" }, img: IMG.c1 },
  { year: 2022, label: { en: "Erasmus", de: "Erasmus" }, country: "Joint Issue", title: { en: "35 Years Erasmus Programme", de: "35 Jahre Erasmus-Programm" }, img: IMG.c7 },
  { year: 2024, label: { en: "Latest", de: "Aktuell" }, country: "Multiple", title: { en: "Paris Olympics 2024", de: "Olympische Spiele Paris 2024" }, img: IMG.c8 },
];

// Convenience accessors
export const RECENT_COINS = [...COINS]
  .sort((a, b) => b.year - a.year || (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  .slice(0, 6)
  .map((c, i) => ({
    id: c.id, slug: c.slug,
    country: COUNTRIES.find((co) => co.code === c.countryCode)?.name || { en: c.country, de: c.country },
    year: c.year, title: c.title, img: c.obverseImage, designer: c.designer,
  }));

export const HERO_COIN    = IMG.c1;
export const FEATURE_COIN = IMG.c1;

// Helpers
export const findCoinBySlug   = (slug)  => COINS.find((c) => c.slug === slug);
export const findCountry      = (code)  => COUNTRIES.find((c) => c.code === code);
export const findSeries       = (slug)  => SERIES_LIST.find((s) => s.slug === slug);
export const coinsByCountry   = (code)  => COINS.filter((c) => c.countryCode === code).sort((a, b) => b.year - a.year);
export const coinsBySeries    = (slug)  => COINS.filter((c) => c.seriesSlug === slug).sort((a, b) => b.year - a.year);
export const relatedCoins     = (slug, n = 3) => {
  const c = findCoinBySlug(slug);
  if (!c) return [];
  return COINS.filter((x) => x.slug !== slug && x.countryCode === c.countryCode).slice(0, n);
};
export const allYears         = ()      => Array.from(new Set(COINS.map((c) => c.year))).sort((a, b) => b - a);
export const searchCoins      = (q)     => {
  if (!q) return [];
  const k = q.trim().toLowerCase();
  return COINS.filter((c) => {
    const hay = [
      c.title.en, c.title.de, c.designer, c.country, c.countryCode,
      c.series.en, c.series.de, String(c.year),
      c.mint || "",
    ].join(" ").toLowerCase();
    return hay.includes(k);
  }).slice(0, 12);
};
