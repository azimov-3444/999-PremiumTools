import { createClient } from '@supabase/supabase-js';

// Supabase konfiguratsiyasi
// Bu ma'lumotlarni Supabase Dashboard dan olasiz
const supabaseUrl = 'https://vqkysyqrikjoigffavfc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxa3lzeXFyaWtqb2lnZmZhdmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzUwNjcsImV4cCI6MjA4MDI1MTA2N30.PqHVCTJXaWgkBcxoUtAIeTPBxV0MXLuo-57af5DVE5A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
