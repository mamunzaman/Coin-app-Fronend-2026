import React from "react";

/**
 * Curatorial section header — Roman numeral + label + thin rule + optional meta
 */
export const SectionId = ({ num, label, meta }) => (
  <div className="ca-section-id ca-reveal">
    <span className="ca-section-id__num">{num}.</span>
    <span className="ca-section-id__label">{label}</span>
    <span className="ca-section-id__rule" />
    {meta && <span className="ca-section-id__meta">{meta}</span>}
  </div>
);

export default SectionId;
