import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { ensureReferralCode, trackReferralSignup } from "./referrals";

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authResolvedOnce, setAuthResolvedOnce] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setAuthResolvedOnce(true);
    }
  }, [loading, user]);
  

  const loadProfile = async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();
  
      if (error && error.code !== "PGRST116") {
        console.error(error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      // ✅ Ignore aborted requests
      if (err.name === "AbortError") return;
  
      console.error("Profile load failed:", err);
      setProfile(null);
    }
  };

  // Removed duplicate auth initialization logic.

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const authUser = session?.user ?? null;
        setUser(authUser);

        await loadProfile(authUser);
      } catch (err) {
        console.error("Auth init failed:", err);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const authUser = session?.user ?? null;
      setUser(authUser);
      await loadProfile(authUser);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    ensureReferralCode(user.id);
    trackReferralSignup();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, authResolvedOnce }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);