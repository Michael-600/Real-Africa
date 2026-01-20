import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/authContext";


export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  
  
  const signIn = async () => {
    setFormLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setFormLoading(false);
  };

  const signUp = async () => {
    setFormLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setFormLoading(false);
      return;
    }

    const userId = data?.user?.id;

    if (!userId) {
      setErrorMessage("Signup succeeded but user ID was not returned.");
      setFormLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name: email.split("@")[0],
        tier_level: 0,
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      setErrorMessage("Account created, but profile setup failed.");
    } else {
      setSuccessMessage("Account created successfully. You can now log in.");
    }

    setFormLoading(false);
  };

  return (
    <div className="auth-container">
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

        <button className="auth-button secondary" onClick={signUp} disabled={formLoading}>
          Create Account
        </button>
      </div>
    </div>
  );
}
