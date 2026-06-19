import { Link } from "react-router-dom";
import { pickLocalized } from "@/services/normalizers/normalizeSettings";

export function pickSettingText(value, lang, fallback = "") {
  const picked = pickLocalized(value, lang);
  return picked || fallback;
}

export function parseHeroTitleLines(title, lang) {
  const raw = pickLocalized(title, lang);
  if (!raw) return null;
  const lines = raw.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  if (!lines.length) return null;
  return { line1: lines[0], line2: lines[1] || "", line3: lines[2] || "" };
}

export function isInternalUrl(url = "") {
  if (!url) return true;
  return url.startsWith("/") || url.startsWith("#") || !/^https?:\/\//i.test(url);
}

export function resolveNavUrl(url = "/") {
  if (!url) return "/";
  if (url.startsWith("#")) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

export function SettingsLink({ url, className, children, onClick, ...rest }) {
  const href = resolveNavUrl(url);
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

export function navRomanNumeral(index) {
  return ROMAN[index] || String(index + 1);
}
