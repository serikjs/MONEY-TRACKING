declare module '@/lib/supabaseClient.js' {
  import { createClient } from '@supabase/supabase-js';
  const supabaseUrl: string;
  const supabaseKey: string;
  const supabase: ReturnType<typeof createClient>;
  export { supabase };
}