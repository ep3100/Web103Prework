import { createClient } from '@supabase/supabase-js'

// supabase setup
const URL = 'https://nqqtiybwjixxdnzfrfau.supabase.co';
const API_KEY = import.meta.env.VITE_APP_API_KEY;
export const supabase = createClient(URL, API_KEY);
