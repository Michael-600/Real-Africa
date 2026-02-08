// components/UpgradeModal.jsx
import React from "react";
import "./courses.css";

export default function UpgradeModal({
  open,
  onClose,
  onUpgrade,
  requiredTier,
  courseTitle,
  unlockList = [],
}) {
  if (!open) return null;

  return (
    <div className="um__overlay" role="dialog" aria-modal="true" aria-label="Upgrade prompt">
      <div className="um__card">
        <div className="um__header">
          <h3 className="um__title">Upgrade to unlock this course</h3>
          <button className="um__x" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <p className="um__text">
          <strong>{courseTitle}</strong> requires tier{" "}
          <strong>{requiredTier}</strong> or higher.
        </p>

        <div className="um__panel">
          <p className="um__panelTitle">What you’ll unlock</p>
          {unlockList.length === 0 ? (
            <p className="um__muted">Full course content, lessons, and progress tracking.</p>
          ) : (
            <ul className="um__list">
              {unlockList.map((item, idx) => (
                <li key={idx} className="um__listItem">{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="um__actions">
          <button className="btn btn--ghost" onClick={onClose}>
            Not now
          </button>
          <button className="btn btn--primary" onClick={onUpgrade}>
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
