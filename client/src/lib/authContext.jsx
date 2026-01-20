import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

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

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authUser = session?.user ?? null;
      setUser(authUser);

      await loadProfile(authUser);
      setLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, profile, loading, authResolvedOnce }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);