// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Use environment variables (Vite expects VITE_ prefix)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the variables exist
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or anon key is missing! Make sure you have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY set in your .env file"
  );
}

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);