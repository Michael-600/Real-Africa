CREATE TABLE IF NOT EXISTS community_join_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  community_slug text NOT NULL,
  community_name text,
  full_name text NOT NULL,
  email text NOT NULL,
  reason text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_join_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert join requests"
  ON community_join_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view join requests"
  ON community_join_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');
