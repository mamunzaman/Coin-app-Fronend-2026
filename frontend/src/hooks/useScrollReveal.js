import { useEffect, useRef } from "react";

/**
 * Adds .is-visible to elements with .ca-reveal when they enter viewport.
 * Pass any dependency that should trigger a re-scan (e.g. loading flag flip).
 */
export const useScrollReveal = (trigger) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".ca-reveal").forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const targets = document.querySelectorAll(".ca-reveal:not(.is-visible)");
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [trigger]);

  return ref;
};

export default useScrollReveal;
