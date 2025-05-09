import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// These values would typically be stored in environment variables
// For development, we're using placeholder values
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
