import React from "react";
import { Link } from "react-router-dom";
import { pickLocalized } from "@/services/normalizers/normalizeSettings";

export function pickField(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : value;
  if (trimmed == null || trimmed === "") return fallback;
  return trimmed;
}

export function isSectionVisible(section) {
  if (section == null) return true;
  if (section.is_visible === false || section.isVisible === false) return false;
  return true;
}

export function isFeaturedCatalogueVisible(homepage) {
  const section = homepage?.featuredCatalogue;
  if (section == null) return true;
  if (!isSectionVisible(section)) return false;
  return Boolean(section.coins?.length);
}

export function pickSettingText(value, lang, fallback = "") {
  const picked = pickLocalized(value, lang);
  return picked || fallback;
}

export function normalizeLineBreaks(text) {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n");
}

export function pickSettingMultilineText(value, lang, fallback = "") {
  const picked = pickSettingText(value, lang, fallback);
  return normalizeLineBreaks(picked);
}

export function renderHighlightedText(text, highlight) {
  const raw = normalizeLineBreaks(text);
  if (!raw) return [];

  const word = normalizeLineBreaks(highlight).split("\n")[0].trim();
  const lines = raw.split("\n");
  const nodes = [];

  const pushHighlightedLine = (line, lineKey) => {
    if (!word || !line.includes(word)) {
      if (line) nodes.push(line);
      return;
    }

    let rest = line;
    let matchIndex = 0;

    while (rest.length > 0) {
      const idx = rest.indexOf(word);
      if (idx === -1) {
        if (rest) nodes.push(rest);
        break;
      }
      if (idx > 0) nodes.push(rest.slice(0, idx));
      nodes.push(<em key={`${lineKey}-em-${matchIndex}`}>{word}</em>);
      rest = rest.slice(idx + word.length);
      matchIndex += 1;
    }
  };

  lines.forEach((line, i) => {
    if (i > 0) nodes.push(<br key={`br-${i}`} />);
    pushHighlightedLine(line, i);
  });

  return nodes;
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
