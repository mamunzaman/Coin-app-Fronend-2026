// Static coin data — will move to API + real coin assets later.
// Images are premium coin/numismatic stock photography placeholders.

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

export const MINTS = [
  { letter: "A", city: "Berlin",    note: { en: "Staatliche Münze Berlin", de: "Staatliche Münze Berlin" } },
  { letter: "D", city: "Munich",    note: { en: "Bayerisches Hauptmünzamt", de: "Bayerisches Hauptmünzamt" } },
  { letter: "F", city: "Stuttgart", note: { en: "Staatliche Münze Baden-Württemberg", de: "Staatliche Münze Baden-Württemberg" } },
  { letter: "G", city: "Karlsruhe", note: { en: "Staatliche Münze Baden-Württemberg", de: "Staatliche Münze Baden-Württemberg" } },
  { letter: "J", city: "Hamburg",   note: { en: "Hamburgische Münze", de: "Hamburgische Münze" } },
];

export const RECENT_COINS = [
  { id: 1, country: { en: "France",     de: "Frankreich"   }, year: 2024, title: { en: "Paris 2024 — Hercules",      de: "Paris 2024 — Herkules"     }, img: IMG.c2 },
  { id: 2, country: { en: "Germany",    de: "Deutschland"  }, year: 2024, title: { en: "175 Years Paulskirche",      de: "175 Jahre Paulskirche"     }, img: IMG.c1 },
  { id: 3, country: { en: "Italy",      de: "Italien"      }, year: 2023, title: { en: "Italo Calvino Centenary",    de: "100 Jahre Italo Calvino"   }, img: IMG.c3 },
  { id: 4, country: { en: "Spain",      de: "Spanien"      }, year: 2023, title: { en: "Cáceres — World Heritage",   de: "Cáceres — Welterbe"        }, img: IMG.c4 },
  { id: 5, country: { en: "Austria",    de: "Österreich"   }, year: 2022, title: { en: "35 Years Erasmus",           de: "35 Jahre Erasmus"          }, img: IMG.c5 },
  { id: 6, country: { en: "Belgium",    de: "Belgien"      }, year: 2022, title: { en: "EU Flag Anniversary",        de: "Jahrestag Europaflagge"    }, img: IMG.c6 },
];

export const HERO_COIN    = IMG.c1;
export const FEATURE_COIN = IMG.c1;
