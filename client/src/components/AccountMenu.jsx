import React from 'react';
import { useState, useRef, useEffect } from "react";

export default function AccountMenu({
  user,
  userTierLevel = null,
  tiers = [],
  onUpgrade,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || null);
  const fileInputRef = useRef(null);

  const currentTier =
    Array.isArray(tiers) && userTierLevel != null
      ? tiers.find(t => t.level === userTierLevel)
      : null;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="account-menu-wrapper" ref={menuRef}>
      {/* Avatar */}
      <button className="account-avatar" onClick={() => setOpen(!open)}>
  {avatarUrl ? (
    <img
      src={avatarUrl}
      alt="Profile"
      className="account-avatar-img"
    />
  ) : (
    <span>{user?.initials || "U"}</span>
  )}
</button>

      {/* Dropdown */}
      {open && (
        <div className="account-menu">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const previewUrl = URL.createObjectURL(file);
              setAvatarUrl(previewUrl);
            }}
          />
          <div className="account-header">
            <p className="account-name">{user?.name || "User"}</p>
            <p className="account-tier">
              {currentTier?.name}
            </p>
          </div>

          <div className="account-section">
            <p className="account-label">Current Plan</p>
            <p className="account-plan">
              {currentTier?.name}
            </p>
            <p className="account-price">
              {currentTier?.price || "—"}
            </p>
          </div>

          <div className="account-actions">
            <button
              className="account-link"
              onClick={() => fileInputRef.current?.click()}
            >
              Change profile photo
            </button>
            <button
              className="account-upgrade"
              onClick={() => {
                if (!Array.isArray(tiers) || userTierLevel == null || !onUpgrade) return;

                const nextTier = tiers.find(t => t.level === userTierLevel + 1);
                if (nextTier) {
                  onUpgrade(nextTier);
                  setOpen(false);
                }
              }}
            >
              Upgrade Plan
            </button>

            <button className="account-link">
              Billing & Payments
            </button>

            <button className="account-link">
              Invoices
            </button>
          </div>

          <div className="account-footer">
            <button className="account-logout">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}