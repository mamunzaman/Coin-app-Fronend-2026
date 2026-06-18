import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("ca_lang") || "en";
  });

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "de" : "en";
      window.localStorage.setItem("ca_lang", next);
      return next;
    });
  }, []);

  const setLanguage = useCallback((next) => {
    setLang(next);
    window.localStorage.setItem("ca_lang", next);
  }, []);

  const t = useMemo(() => translations[lang], [lang]);

  const value = useMemo(() => ({ lang, t, toggle, setLanguage }), [lang, t, toggle, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
