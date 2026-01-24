import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/authContext";


export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
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

  const signUp = async () => {
    setSignUpLoading(true);
    setSignUpError("");
    setSignUpSuccess("");

    if (!signUpFirstName || !signUpLastName || !signUpEmail || !signUpPassword) {
      setSignUpError("Please enter your first name, last name, email, and password.");
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
        tier_level: 1,
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      setSignUpError("Account created, but profile setup failed.");
    } else {
      setSignUpSuccess("Account created successfully. You can now log in.");
    }

    setSignUpLoading(false);
  };

  return (
    <div className={`auth-container ${signUpOpen ? "auth-container--modal-open" : ""}`}>
      <div className="auth-card">
        <h2 className="auth-title">Welcome to Real Africa</h2>
        <p className="auth-subtitle">Login or create an account</p>

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

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button primary" onClick={signIn} disabled={formLoading}>
          Login
        </button>

        <button
          className="auth-button secondary"
          onClick={() => {
            setSignUpOpen(true);
            setSignUpError("");
            setSignUpSuccess("");
          }}
          disabled={formLoading}
        >
          Create Account
        </button>
      </div>

      {signUpOpen && (
        <div className="auth-modal-overlay" onClick={() => setSignUpOpen(false)}>
          <div
            className="auth-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="auth-title">Create account</h3>
            <p className="auth-subtitle">Add your details to get started</p>

            {signUpError && (
              <p style={{ color: "red", marginBottom: "12px" }}>
                {signUpError}
              </p>
            )}

            {signUpSuccess && (
              <p style={{ color: "green", marginBottom: "12px" }}>
                {signUpSuccess}
              </p>
            )}

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

            <input
              className="auth-input"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />

            <input
              className="auth-input"
              type="password"
              placeholder="Password (min 6 chars)"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />

            <button
              className="auth-button primary"
              onClick={signUp}
              disabled={signUpLoading}
            >
              Create Account
            </button>

            <button
              className="auth-button secondary"
              onClick={() => setSignUpOpen(false)}
              disabled={signUpLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
