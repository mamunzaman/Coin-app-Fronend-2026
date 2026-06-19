import React, { createContext, useContext, useEffect, useState } from "react";
import { getHomepageSettings, getSiteSettings } from "@/services/coinArchiveService";

const SettingsContext = createContext({
  homepage: { source: "mock" },
  site: { source: "mock" },
  loading: true,
});

export function SettingsProvider({ children }) {
  const [homepage, setHomepage] = useState({ source: "mock" });
  const [site, setSite] = useState({ source: "mock" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([getHomepageSettings(), getSiteSettings()])
      .then(([hp, st]) => {
        if (!cancelled) {
          setHomepage(hp);
          setSite(st);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHomepage({ source: "mock" });
          setSite({ source: "mock" });
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return (
    <SettingsContext.Provider value={{ homepage, site, loading }}>
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
