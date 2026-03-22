-- Community waitlist requests table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS community_waitlist_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  country text,
  community_idea text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- If table already exists, add the country column
ALTER TABLE community_waitlist_requests ADD COLUMN IF NOT EXISTS country text;

ALTER TABLE community_waitlist_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a waitlist request"
  ON community_waitlist_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own waitlist requests"
  ON community_waitlist_requests FOR SELECT
  USING (auth.uid() = user_id);
