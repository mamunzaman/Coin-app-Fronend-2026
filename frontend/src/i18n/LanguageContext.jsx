import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { translations } from "./translations";
import { DEFAULT_LANGUAGE, getCurrentLanguage, getLocalizedPath, isSupportedLanguage } from "@/utils/language";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    return getCurrentLanguage(window.location.pathname);
  });

  const setLanguage = useCallback((next) => {
    const safe = isSupportedLanguage(next) ? next : DEFAULT_LANGUAGE;
    setLangState(safe);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === "en" ? DEFAULT_LANGUAGE : "en"));
  }, []);

  const localPath = useCallback((path) => {
    if (!path) return path;
    if (/^https?:\/\//i.test(path)) return path;
    return getLocalizedPath(path, lang);
  }, [lang]);

  const t = useMemo(() => translations[lang] || translations[DEFAULT_LANGUAGE], [lang]);

  const value = useMemo(
    () => ({ lang, t, toggle, setLanguage, localPath }),
    [lang, t, toggle, setLanguage, localPath],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
