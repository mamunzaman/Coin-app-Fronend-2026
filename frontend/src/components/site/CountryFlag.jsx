import React from "react";
import { getCountryFlag, getCountryEmoji } from "@/utils/countryFlag";

export const CountryFlag = ({ country, size = 22, className = "", style = {} }) => {
  const src = getCountryFlag(country);
  const emoji = getCountryEmoji(country);

  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={Math.round(size * 0.75)}
        className={className}
        style={{ objectFit: "cover", borderRadius: 3, display: "block", ...style }}
        loading="lazy"
      />
    );
  }

  if (emoji) {
    return <span style={{ fontSize: size, lineHeight: 1, ...style }} className={className}>{emoji}</span>;
  }

  return (
    <span className={`ca-monogram__letters ${className}`.trim()} style={{ fontSize: size * 0.55, ...style }}>
      {country?.code || "EU"}
    </span>
  );
};

export default CountryFlag;
