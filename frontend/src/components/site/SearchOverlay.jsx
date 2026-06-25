import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { searchArchive } from "@/services/coinArchiveService";
import { SEARCH } from "@/constants/testIds/home";

const DEBOUNCE_MS = 300;

export const SearchOverlay = ({ open, onClose }) => {
  const { t, lang, localPath } = useLang();
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setDebouncedQ("");
      setResults([]);
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const trimmed = debouncedQ.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    searchArchive(trimmed, { lang }).then((data) => {
      if (!cancelled) {
        setResults(data);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [debouncedQ, lang]);

  if (!open) return null;

  const trimmedQ = q.trim();
  const loadingLabel = lang === "de" ? "Suche…" : "Searching…";

  return (
    <div data-testid={SEARCH.overlay} className="ca-search-overlay" role="dialog" aria-modal="true">
      <button
        className="ca-search-overlay__backdrop"
        onClick={onClose}
        aria-label="Close search"
        tabIndex={-1}
      />
      <div className="ca-search-overlay__panel">
        <div className="ca-search-overlay__inputrow">
          <SearchIcon size={18} className="ca-search-overlay__icon" />
          <input
            ref={inputRef}
            data-testid={SEARCH.input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search.placeholder}
            className="ca-search-overlay__input"
            aria-label="Search"
          />
          <button
            data-testid={SEARCH.close}
            onClick={onClose}
            className="ca-search-overlay__close"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="ca-search-overlay__meta">
          {trimmedQ
            ? loading
              ? loadingLabel
              : `${results.length} ${t.search.results}`
            : t.search.hintKey}
        </div>

        <div className="ca-search-overlay__results" aria-busy={loading}>
          {trimmedQ && !loading && results.length === 0 && (
            <div data-testid={SEARCH.empty} className="ca-search-overlay__empty">
              {t.search.empty}
            </div>
          )}
          {results.map((c) => (
            <Link
              key={c.slug}
              to={localPath(`/coins/${c.slug}`)}
              data-testid={SEARCH.result(c.slug)}
              onClick={onClose}
              className="ca-search-overlay__result"
            >
              <img src={c.obverseImage} alt="" loading="lazy" />
              <div className="flex-1">
                <div className="ca-mono" style={{ fontSize: 10 }}>{c.countryCode} · {c.year}{c.mint ? ` · Mint ${c.mint}` : ""}</div>
                <div className="title">{c.title[lang]}</div>
                <div className="ca-mono mt-1" style={{ color: "var(--ca-text-muted)" }}>{c.series[lang]} · {c.designer}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
