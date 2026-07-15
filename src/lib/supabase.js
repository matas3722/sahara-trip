import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const tripId = import.meta.env.VITE_TRIP_ID || 'kaunas-sahara-2026';
export const cloudReady = Boolean(url && key && !url.includes('YOUR_PROJECT'));
export const supabase = cloudReady ? createClient(url, key) : null;
