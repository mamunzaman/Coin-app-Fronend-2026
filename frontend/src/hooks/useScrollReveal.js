import { useEffect } from "react";

function revealTargets() {
  if (typeof window === "undefined") return null;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".ca-reveal").forEach((el) => el.classList.add("is-visible"));
    return null;
  }

  const targets = document.querySelectorAll(".ca-reveal:not(.is-visible)");
  if (!targets.length) return null;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      el.classList.add("is-visible");
    } else {
      obs.observe(el);
    }
  });

  return obs;
}

/**
 * Adds .is-visible to elements with .ca-reveal when they enter viewport.
 * Pass deps (e.g. [loading, items.length]) so async pages re-scan after content mounts.
 */
export const useScrollReveal = (deps = []) => {
  useEffect(() => {
    let obs = null;
    let raf1 = 0;
    let raf2 = 0;
    let cancelled = false;

    const scan = () => {
      if (cancelled) return;
      obs?.disconnect();
      obs = revealTargets();
    };

    raf1 = requestAnimationFrame(() => {
      scan();
      raf2 = requestAnimationFrame(scan);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      obs?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
