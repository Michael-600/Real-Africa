import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/authContext";

export default function AccountMenu({
  tiers = [],
  onUpgrade,
}) {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null);
  const fileInputRef = useRef(null);
  const currentTier =
    Array.isArray(tiers) && profile?.tier_level != null
      ? tiers.find(t => t.level === profile.tier_level)
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

  const displayName =
    profile?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const initials =
    displayName
      .split(" ")
      .map(n => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  if (!profile) return null;

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
    <span>{initials}</span>
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
            <p className="account-name">{displayName}</p>
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
                if (!Array.isArray(tiers) || profile?.tier_level == null || !onUpgrade) return;

                const nextTier = tiers.find(t => t.level === profile.tier_level + 1);
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
            <button
              className="account-logout"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/auth";
              }}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}