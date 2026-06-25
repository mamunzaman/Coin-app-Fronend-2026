export const DEFAULT_LANGUAGE = "de";
export const SUPPORTED_LANGUAGES = ["de", "en"];

export function isSupportedLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function getCurrentLanguage(pathname = typeof window !== "undefined" ? window.location.pathname : "/") {
  const path = pathname || "/";
  if (path === "/en" || path.startsWith("/en/")) return "en";
  return DEFAULT_LANGUAGE;
}

export function stripLanguagePrefix(path) {
  if (!path) return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/en") return "/";
  if (normalized.startsWith("/en/")) return normalized.slice(3) || "/";
  return normalized;
}

export function getLocalizedPath(path, lang = DEFAULT_LANGUAGE) {
  const base = stripLanguagePrefix(path.startsWith("/") ? path : `/${path}`);
  if (lang === "en") return base === "/" ? "/en" : `/en${base}`;
  return base;
}

export function withLanguageParam(pathOrUrl, lang = DEFAULT_LANGUAGE) {
  const safeLang = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  if (!pathOrUrl) return `?lang=${safeLang}`;

  const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
  if (isAbsolute) {
    const url = new URL(pathOrUrl);
    url.searchParams.set("lang", safeLang);
    return url.toString();
  }

  const [pathPart, queryPart = ""] = String(pathOrUrl).split("?");
  const params = new URLSearchParams(queryPart);
  params.set("lang", safeLang);
  const qs = params.toString();
  return qs ? `${pathPart}?${qs}` : `${pathPart}?lang=${safeLang}`;
}

export function logApiLanguageDebug(label, requestedLang, raw) {
  if (process.env.NODE_ENV !== "development") return;
  const current = raw?.language?.current;
  if (current == null) return;
  console.debug(`[coinarchive:${label}] requested=${requestedLang} response=${current}`);
}
