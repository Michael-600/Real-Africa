import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/authContext";

export default function AccountMenu() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null);
  const fileInputRef = useRef(null);

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
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const initials =
    displayName
      .split(" ")
      .map(n => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <div className="account-menu-wrapper" ref={menuRef}>
      <style>{`
        .account-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 280px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          z-index: 1000;
          overflow: hidden;
          font-family: 'Space Grotesk', sans-serif;
        }

        .account-menu__header {
          padding: 20px 20px 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .account-menu__name {
          font-size: 17px;
          font-weight: 700;
          color: #1f2230;
          margin: 0;
        }

        .account-menu__email {
          font-size: 13px;
          color: #9ca3af;
          margin: 4px 0 0;
          word-break: break-all;
        }

        .account-menu__badge {
          display: inline-block;
          margin-top: 8px;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .account-menu__badge--admin {
          background: #ecfdf5;
          color: #047857;
        }

        .account-menu__badge--member {
          background: #fef3c7;
          color: #92400e;
        }

        .account-menu__links {
          padding: 8px 0;
        }

        .account-menu__link {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 20px;
          border: none;
          background: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        }

        .account-menu__link:hover {
          background: #f8fafc;
          color: #1f2230;
        }

        .account-menu__link svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          opacity: 0.6;
        }

        .account-menu__divider {
          height: 1px;
          background: #f1f5f9;
          margin: 0;
        }

        .account-menu__logout {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 20px;
          border: none;
          background: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: #dc2626;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        }

        .account-menu__logout:hover {
          background: #fef2f2;
        }

        .account-menu__logout svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .account-menu__since {
          font-size: 11px;
          color: #9ca3af;
          margin: 6px 0 0;
        }
      `}</style>

      <button className="account-avatar" onClick={() => setOpen(!open)}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="account-avatar-img" />
        ) : (
          <span>{initials}</span>
        )}
      </button>

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
              setAvatarUrl(URL.createObjectURL(file));
            }}
          />

          <div className="account-menu__header">
            <p className="account-menu__name">{displayName}</p>
            <p className="account-menu__email">{user?.email}</p>
            {profile?.role === "admin" && (
              <span className="account-menu__badge account-menu__badge--admin">Admin</span>
            )}
            {memberSince && (
              <p className="account-menu__since">Member since {memberSince}</p>
            )}
          </div>

          <div className="account-menu__links">
            <button className="account-menu__link" onClick={() => { navigate("/communities"); setOpen(false); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              My Communities
            </button>

            <button className="account-menu__link" onClick={() => fileInputRef.current?.click()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              Change profile photo
            </button>

            <button className="account-menu__link" onClick={() => { navigate("/articles"); setOpen(false); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
                <line x1="6" y1="8" x2="18" y2="8"/>
                <line x1="6" y1="12" x2="14" y2="12"/>
                <line x1="6" y1="16" x2="10" y2="16"/>
              </svg>
              Saved Articles
            </button>
          </div>

          <div className="account-menu__divider" />

          <button
            className="account-menu__logout"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth";
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}