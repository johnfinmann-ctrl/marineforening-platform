import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Advarer i stedet for at kaste en fejl, så `next build` kan gennemføres
  // uden rigtige Supabase-nøgler (fx i CI eller før .env.local er udfyldt).
  // I en rigtig deployment SKAL disse miljøvariabler sættes på Vercel.
  console.warn(
    'Supabase-miljøvariabler mangler. Kopiér .env.example til .env.local og udfyld dem.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
