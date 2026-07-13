// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// The anon key is safe to ship in client code (it is public by design and
// protected by Row Level Security). Env vars override these when set.
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://ossbzkgjbjufyefupkzo.supabase.co";
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zc2J6a2dqYmp1ZnllZnVwa3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzMwNzgsImV4cCI6MjA2NDc0OTA3OH0.oi51qZLyvbQKADU0R9YcOyAOopeNQCH6-eyebYW9X8k";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
