import { supabase } from "./supabase";

const REFERRAL_STORAGE_KEY = "referral_code";
const REFERRAL_COMMUNITY_KEY = "referral_community";
const REFERRAL_TIMESTAMP_KEY = "referral_timestamp";
const REFERRAL_EXPIRY_DAYS = 14;

const isExpired = (timestamp) => {
  if (!timestamp) return true;
  const ageMs = Date.now() - Number(timestamp);
  return ageMs > REFERRAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
};

export const storeReferralAttribution = (code, communitySlug) => {
  if (!code) return;
  localStorage.setItem(REFERRAL_STORAGE_KEY, code);
  localStorage.setItem(REFERRAL_COMMUNITY_KEY, communitySlug || "");
  localStorage.setItem(REFERRAL_TIMESTAMP_KEY, String(Date.now()));
};

export const getStoredReferral = () => {
  const code = localStorage.getItem(REFERRAL_STORAGE_KEY);
  const community = localStorage.getItem(REFERRAL_COMMUNITY_KEY);
  const timestamp = localStorage.getItem(REFERRAL_TIMESTAMP_KEY);

  if (!code || isExpired(timestamp)) {
    clearStoredReferral();
    return null;
  }

  return { code, community };
};

export const clearStoredReferral = () => {
  localStorage.removeItem(REFERRAL_STORAGE_KEY);
  localStorage.removeItem(REFERRAL_COMMUNITY_KEY);
  localStorage.removeItem(REFERRAL_TIMESTAMP_KEY);
};

const generateReferralCode = () => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
};

export const ensureReferralCode = async (userId) => {
  if (!userId) return null;

  const { data: existing, error: existingError } = await supabase
    .from("referral_codes")
    .select("code")
    .eq("referrer_id", userId)
    .maybeSingle();

  if (!existingError && existing?.code) {
    return existing.code;
  }

  const code = generateReferralCode();
  const { data, error } = await supabase
    .from("referral_codes")
    .insert({ referrer_id: userId, code, is_active: true })
    .select("code")
    .single();

  if (error) {
    console.error("Failed to create referral code:", error);
    return null;
  }

  return data?.code || null;
};

export const trackReferralSignup = async () => {
  const stored = getStoredReferral();
  if (!stored?.code) return;

  const { error } = await supabase.rpc("track_referral_conversion", {
    referral_code: stored.code,
    community_slug: stored.community || null,
    event_type: "signup",
  });

  if (error) {
    console.error("Referral signup tracking failed:", error);
    return;
  }

  clearStoredReferral();
};

export const trackReferralConversion = async (eventType, communitySlug) => {
  const stored = getStoredReferral();
  if (!stored?.code) return;

  const { error } = await supabase.rpc("track_referral_conversion", {
    referral_code: stored.code,
    community_slug: communitySlug || stored.community || null,
    event_type: eventType,
  });

  if (error) {
    console.error("Referral conversion tracking failed:", error);
  }
};
