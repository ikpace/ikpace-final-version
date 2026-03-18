// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://agiyudvwmaanwpsozcsh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.lXCZm1DVU9Dke3MEA0k8u09FejzoB1sW8kYte6YAyGo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);