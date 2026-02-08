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
    let mounted = true;

    const init = async () => {
      try {
        if (mounted) setLoading(true);

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        const authUser = session?.user ?? null;
        if (mounted) setUser(authUser);

        await loadProfile(authUser);
      } catch (err) {
        // Ignore abort-style errors, but still let finally flip loading off
        if (err?.name !== "AbortError") {
          console.error("Auth init failed:", err);
        }
        if (!mounted) return;
        setUser(null);
        setProfile(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const authUser = session?.user ?? null;
      if (mounted) setUser(authUser);
      // Fire-and-forget; we don't want to block the auth callback
      loadProfile(authUser);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
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