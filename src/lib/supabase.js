const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || null;

let _supabase = null;
let _supabaseAdmin = null;

const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

const getSupabase = () => {
  if (!isSupabaseConfigured()) return null;
  if (!_supabase) {
    const { createClient } = require("@supabase/supabase-js");
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
};

const getSupabaseAdmin = () => {
  if (!isSupabaseConfigured()) return null;
  if (!_supabaseAdmin) {
    const { createClient } = require("@supabase/supabase-js");
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }
  return _supabaseAdmin;
};

export { getSupabase, getSupabaseAdmin, isSupabaseConfigured };
export const supabase = null; // Legacy export
export const supabaseAdmin = null; // Legacy export