import React from "react";

/**
 * Premium skeleton primitives — CSS shimmer, no JS animation,
 * respects prefers-reduced-motion. All match final layout dimensions.
 */

const baseProps = (extra = "") => ({
  className: `ca-skeleton ${extra}`.trim(),
  "aria-hidden": "true",
});

export const Skeleton = ({ w, h, r = 8, className = "", style = {} }) => (
  <span
    {...baseProps(className)}
    style={{ width: w, height: h, borderRadius: r, display: "inline-block", ...style }}
  />
);

export const SkeletonText = ({ lines = 3, lastWidth = "60%", className = "" }) => (
  <span className={`ca-skeleton-stack ${className}`.trim()} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <span
        key={i}
        className="ca-skeleton"
        style={{
          width: i === lines - 1 ? lastWidth : "100%",
          height: 14,
          borderRadius: 6,
          display: "block",
          marginBottom: i === lines - 1 ? 0 : 10,
        }}
      />
    ))}
  </span>
);

export const SkeletonCircle = ({ size = "100%", className = "" }) => (
  <span
    {...baseProps(className)}
    style={{ width: size, height: size, borderRadius: "50%", display: "block" }}
  />
);

export const SkeletonImage = ({ aspect = "1 / 1", radius = 18, className = "" }) => (
  <span
    {...baseProps(className)}
    style={{ display: "block", aspectRatio: aspect, borderRadius: radius, width: "100%" }}
  />
);

/* Card skeletons — match dimensions of the real card */

export const SkeletonCoinCard = () => (
  <article className="ca-coin-card-lg" aria-busy="true">
    <div className="ca-coin-card-lg__img"><SkeletonImage aspect="1 / 1" radius={0} /></div>
    <div className="ca-coin-card-lg__body">
      <Skeleton w={120} h={10} r={4} />
      <Skeleton w="92%" h={18} r={6} style={{ marginTop: 12 }} />
      <Skeleton w="60%" h={12} r={4} style={{ marginTop: 10 }} />
    </div>
  </article>
);

export const SkeletonCountryCard = () => (
  <article className="ca-country-card" aria-busy="true">
    <div className="ca-country-card__media">
      <SkeletonCircle size="62%" />
    </div>
    <div className="ca-country-card__body" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
      <div className="flex items-center gap-3 w-full">
        <Skeleton w={28} h={28} r={6} />
        <div className="flex-1">
          <Skeleton w="50%" h={18} r={6} />
          <Skeleton w="70%" h={11} r={4} style={{ marginTop: 8 }} />
        </div>
      </div>
      <SkeletonText lines={2} lastWidth="70%" />
      <Skeleton w="40%" h={11} r={4} />
    </div>
  </article>
);

export const SkeletonSeriesCard = () => (
  <article className="ca-series-card" aria-busy="true" style={{ pointerEvents: "none" }}>
    <div className="ca-series-card__head">
      <Skeleton w={50} h={28} r={6} />
      <Skeleton w={100} h={10} r={4} />
    </div>
    <Skeleton w="80%" h={32} r={8} style={{ marginBottom: 16 }} />
    <SkeletonText lines={3} lastWidth="55%" />
    <div className="ca-series-card__foot" style={{ marginTop: 24 }}>
      <Skeleton w={120} h={10} r={4} />
      <Skeleton w={48} h={10} r={4} />
    </div>
  </article>
);

export const SkeletonStat = () => (
  <div className="text-center" aria-busy="true">
    <Skeleton w="60%" h={104} r={10} style={{ display: "block", margin: "0 auto" }} />
    <Skeleton w={140} h={10} r={4} style={{ display: "block", margin: "16px auto 0" }} />
    <Skeleton w={100} h={9} r={4} style={{ display: "block", margin: "10px auto 0" }} />
  </div>
);

export default Skeleton;
