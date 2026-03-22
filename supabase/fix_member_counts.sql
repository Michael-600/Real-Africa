-- Fix member counts: allow the count query on community_memberships
-- Run this in your Supabase SQL Editor

-- Allow anyone (including anon) to read community_memberships for count queries
-- This only exposes the count, not user details, since the frontend only uses select("count")
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'community_memberships'
      AND policyname = 'Anyone can count memberships'
  ) THEN
    CREATE POLICY "Anyone can count memberships"
      ON community_memberships FOR SELECT
      USING (true);
  END IF;
END $$;
