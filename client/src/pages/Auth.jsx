import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/authContext";


export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const from = location.state?.from || "/";
  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [loading, user, navigate, from]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");

  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const signIn = async () => {
    setFormLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      setFormLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate(from, { replace: true });
    }

    setFormLoading(false);
  };

  const resetPassword = async () => {
    setErrorMessage("");
    setResetMessage("");

    if (!email) {
      setErrorMessage("Please enter your email to reset your password.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setResetMessage("Password reset email sent. Check your inbox.");
    }
  };

  const signUp = async () => {
    setSignUpLoading(true);
    setSignUpError("");
    setSignUpSuccess("");

    if (
      !signUpFirstName ||
      !signUpLastName ||
      !signUpEmail ||
      !signUpPassword ||
      !confirmPassword ||
      !country
    ) {
      setSignUpError("Please complete all required fields.");
      setSignUpLoading(false);
      return;
    }

    if (signUpPassword !== confirmPassword) {
      setSignUpError("Passwords do not match.");
      setSignUpLoading(false);
      return;
    }

    if (!acceptTerms) {
      setSignUpError("You must accept the Terms and Privacy Policy.");
      setSignUpLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
      options: {
        data: {
          name: `${signUpFirstName} ${signUpLastName}`.trim(),
        },
      },
    });

    if (error) {
      setSignUpError(error.message);
      setSignUpLoading(false);
      return;
    }

    const userId = data?.user?.id;

    if (!userId) {
      setSignUpError("Signup succeeded but user ID was not returned.");
      setSignUpLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name: `${signUpFirstName} ${signUpLastName}`.trim(),
        display_name: `${signUpFirstName}`,
        country,
        tier_level: 1,
        terms_accepted_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      setSignUpError("Account created, but profile setup failed.");
    } else {
      setShowSuccessModal(true);
    }

    setSignUpLoading(false);
  };

  const handleOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + (from === "/" ? "/" : from),
      },
    });
    if (error) setErrorMessage(error.message);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome to The Real Africa</h2>
        <p className="auth-subtitle">Login or create an account</p>

        <div className="auth-oauth-buttons">
          <button
            className="auth-oauth-btn"
            onClick={() => handleOAuth("google")}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>
          <button
            className="auth-oauth-btn"
            onClick={() => handleOAuth("azure")}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
            Continue with Microsoft
          </button>
        </div>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

        <div className="auth-toggle" style={{minWidth: 0}}>
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
            style={{minWidth: 0}}
          >
            Login
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
            style={{minWidth: 0}}
          >
            Create Account
          </button>
        </div>

        <div
          className="auth-form-container"
          style={{ minHeight: "460px" }}
        >
          {errorMessage && (
            <p style={{ color: "red", marginBottom: "12px" }}>
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p style={{ color: "green", marginBottom: "12px" }}>
              {successMessage}
            </p>
          )}

          {resetMessage && (
            <p style={{ color: "green", marginBottom: "12px" }}>
              {resetMessage}
            </p>
          )}

          {mode === "signup" && (
            <>
              <input
                className="auth-input"
                placeholder="First name"
                value={signUpFirstName}
                onChange={(e) => setSignUpFirstName(e.target.value)}
              />
              <input
                className="auth-input"
                placeholder="Last name"
                value={signUpLastName}
                onChange={(e) => setSignUpLastName(e.target.value)}
              />
            </>
          )}

          <input
            className="auth-input"
            placeholder="Email"
            value={mode === "login" ? email : signUpEmail}
            onChange={(e) =>
              mode === "login"
                ? setEmail(e.target.value)
                : setSignUpEmail(e.target.value)
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={mode === "login" ? password : signUpPassword}
            onChange={
              mode === "login"
                ? (e) => setPassword(e.target.value)
                : (e) => {
                    setSignUpPassword(e.target.value);
                    setPasswordStrength(calculateStrength(e.target.value));
                  }
            }
          />
          {mode === "signup" && (
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  height: "6px",
                  borderRadius: "6px",
                  background: "#eee",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${passwordStrength * 25}%`,
                    height: "100%",
                    background:
                      passwordStrength <= 1
                        ? "#e74c3c"
                        : passwordStrength === 2
                        ? "#f1c40f"
                        : "#2ecc71",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <small style={{ fontSize: "12px", color: "#666" }}>
                Password strength
              </small>
            </div>
          )}

          {mode === "signup" && (
            <>
              <input
                className="auth-input"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <select
                className="auth-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select country</option>
                {[
                  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
                  "Bahamas","Bahrain","Bangladesh","Barbados","Belgium","Belize","Benin","Bhutan","Bolivia","Botswana","Brazil",
                  "Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Chile","China","Colombia","Costa Rica",
                  "Croatia","Cuba","Cyprus","Czech Republic","Denmark","Dominican Republic","Ecuador","Egypt","Estonia","Ethiopia",
                  "Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Guatemala","Haiti","Honduras","Hungary",
                  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kenya","Kuwait",
                  "Latvia","Lebanon","Liberia","Libya","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Mali","Malta",
                  "Mexico","Moldova","Mongolia","Morocco","Mozambique","Namibia","Nepal","Netherlands","New Zealand","Nicaragua",
                  "Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palestine","Panama","Peru","Philippines","Poland","Portugal",
                  "Qatar","Romania","Rwanda","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia",
                  "Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria",
                  "Taiwan","Tanzania","Thailand","Togo","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom",
                  "United States","Uruguay","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
                ].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <label style={{ fontSize: "13px", display: "flex", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                I agree to the Terms & Privacy Policy
              </label>
            </>
          )}

          {mode === "login" && (
            <button
              type="button"
              onClick={resetPassword}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                fontSize: "13px",
                marginBottom: "12px",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </button>
          )}

          <button
            className="auth-button primary"
            onClick={mode === "login" ? signIn : signUp}
            disabled={mode === "login" ? formLoading : signUpLoading}
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h3>Account Created 🎉</h3>
            <p style={{ margin: "16px 0", fontSize: "14px" }}>
              Your account has been created successfully. You can now log in.
            </p>
            <button
              className="auth-button primary"
              onClick={() => {
                setShowSuccessModal(false);
                setMode("login");
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
