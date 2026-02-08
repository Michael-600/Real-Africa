// components/ProgressBar.jsx
import React from "react";
import "./courses.css";

export default function ProgressBar({ value = 0, disabled = false }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div className={`pb ${disabled ? "pb--disabled" : ""}`} aria-label="Course progress">
      <div className="pb__track" aria-hidden="true">
        <div className="pb__fill" style={{ width: `${disabled ? 0 : safeValue}%` }} />
      </div>
      <div className="pb__meta">
        <span>{disabled ? "Preview" : `${safeValue}% complete`}</span>
      </div>
    </div>
  );
}