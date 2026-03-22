import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/auth", { replace: true }), 2000);
    }
    setLoading(false);
  };

  if (!sessionReady) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">
            Verifying your reset link. If nothing happens, the link may have
            expired. Please request a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Set New Password</h2>
        <p className="auth-subtitle">Enter your new password below.</p>

        {error && (
          <p style={{ color: "#b91c1c", marginBottom: 12, fontSize: 14 }}>
            {error}
          </p>
        )}
        {message && (
          <p style={{ color: "#16a34a", marginBottom: 12, fontSize: 14 }}>
            {message}
          </p>
        )}

        <input
          className="auth-input"
          type="password"
          placeholder="New password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="auth-button primary"
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
