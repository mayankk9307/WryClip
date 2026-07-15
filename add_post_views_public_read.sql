-- ====================================================================
-- WRYCLIP ALLOW PUBLIC READ FOR POST VIEWS
-- ====================================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard (https://supabase.com).
-- 2. Go to the "SQL Editor" from the left menu.
-- 3. Click "New Query", paste this entire script, and click "Run".
-- ====================================================================

-- Create a policy to allow public select (unauthenticated users) on post_views table
DROP POLICY IF EXISTS "Allow public read post_views" ON public.post_views;
CREATE POLICY "Allow public read post_views" 
ON public.post_views 
FOR SELECT 
USING (true);
