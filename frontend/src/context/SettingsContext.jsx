import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { getHomepageSettings, getSiteSettings } from "@/services/coinArchiveService";
import { useLang } from "@/i18n/LanguageContext";

const PENDING = { source: "pending" };

const SettingsContext = createContext({
  homepage: { source: "mock" },
  site: { source: "mock" },
  loading: true,
  settingsLang: "de",
});

export function SettingsProvider({ children }) {
  const { lang } = useLang();
  const requestId = useRef(0);
  const [homepage, setHomepage] = useState({ source: "mock" });
  const [site, setSite] = useState({ source: "mock" });
  const [loading, setLoading] = useState(true);
  const [settingsLang, setSettingsLang] = useState(lang);

  useEffect(() => {
    const id = ++requestId.current;
    setLoading(true);
    setHomepage(PENDING);
    setSite(PENDING);

    Promise.all([getHomepageSettings(lang), getSiteSettings(lang)])
      .then(([hp, st]) => {
        if (id !== requestId.current) return;
        setHomepage(hp);
        setSite(st);
        setSettingsLang(lang);
        setLoading(false);
      })
      .catch(() => {
        if (id !== requestId.current) return;
        setHomepage({ source: "mock" });
        setSite({ source: "mock" });
        setSettingsLang(lang);
        setLoading(false);
      });

    return () => { requestId.current += 1; };
  }, [lang]);

  return (
    <SettingsContext.Provider value={{ homepage, site, loading, settingsLang }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useHomepageSettings() {
  return useContext(SettingsContext).homepage;
}

export function useSiteSettings() {
  return useContext(SettingsContext).site;
}

export function useSettingsLoading() {
  return useContext(SettingsContext).loading;
}

export default SettingsContext;
