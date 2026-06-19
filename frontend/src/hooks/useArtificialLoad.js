import { useEffect, useState } from "react";

/**
 * Brief minimum loading state for skeleton polish alongside real API flags.
 * Resets when resetKey changes (e.g. route slug).
 */
export const useArtificialLoad = (delay = 400, resetKey) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }
    setLoading(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setLoading(false), reduce ? 0 : delay);
    return () => clearTimeout(t);
  }, [delay, resetKey]);

  return loading;
};

export default useArtificialLoad;
