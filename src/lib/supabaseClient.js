// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Use environment variables (Vite expects VITE_ prefix)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the variables exist
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase configuration error:");
  console.error("   VITE_SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
  console.error("   VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✅ Set" : "❌ Missing");
  throw new Error(
    "Supabase URL or anon key is missing! Make sure you have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY set in your .env file"
  );
}

console.log("✅ Supabase client initialized");

// Create a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'ikpace-auth-token',
    storage: window.localStorage,
    flowType: 'pkce',
    debug: false,
  },
  global: {
    headers: {
      'x-application-name': 'ikpace-dashboard',
    },
  },
  db: {
    schema: 'public',
  },
});

export default supabase;
