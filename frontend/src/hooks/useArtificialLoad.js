import { useEffect, useState } from "react";

/**
 * Tiny "loading on mount" hook used while data is still static.
 * Returns `true` for `delay` ms after mount, then `false`.
 * When the WP API layer arrives, replace with the actual `isLoading` flag.
 */
export const useArtificialLoad = (delay = 400) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") { setLoading(false); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setLoading(false), reduce ? 0 : delay);
    return () => clearTimeout(t);
  }, [delay]);
  return loading;
};

export default useArtificialLoad;
