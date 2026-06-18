import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { searchCoins } from "@/data/coinData";
import { SEARCH } from "@/constants/testIds/home";

export const SearchOverlay = ({ open, onClose }) => {
  const { t, lang } = useLang();
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ("");
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

  const results = useMemo(() => searchCoins(q), [q]);

  if (!open) return null;

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
          {q.trim() ? `${results.length} ${t.search.results}` : t.search.hintKey}
        </div>

        <div className="ca-search-overlay__results">
          {q.trim() && results.length === 0 && (
            <div data-testid={SEARCH.empty} className="ca-search-overlay__empty">
              {t.search.empty}
            </div>
          )}
          {results.map((c) => (
            <Link
              key={c.slug}
              to={`/coins/${c.slug}`}
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
