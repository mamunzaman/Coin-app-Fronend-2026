import { useEffect } from "react";

/**
 * Sets <title> per route. Restores previous title on unmount.
 * Will be replaced by react-helmet-async once WP integration adds richer meta.
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} · CoinArchive` : "CoinArchive — The European 2 Euro Coin Archive";
    return () => { document.title = prev; };
  }, [title]);
};

export default useDocumentTitle;
