import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { getCurrentLanguage } from "@/utils/language";

export function LanguageRouteSync() {
  const location = useLocation();
  const { setLanguage } = useLang();

  useEffect(() => {
    setLanguage(getCurrentLanguage(location.pathname));
  }, [location.pathname, setLanguage]);

  return <Outlet />;
}

export default LanguageRouteSync;
