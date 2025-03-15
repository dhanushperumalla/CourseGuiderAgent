import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzeutwntoufukyzwmtyz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6ZXV0d250b3VmdWt5endtdHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjA5MjIsImV4cCI6MjA1NzQ5NjkyMn0.PbhAyQa-SdjCT_AqOWHLxioh2MJ-5wPrNtS4gTERWmg';

export const supabase = createClient(supabaseUrl, supabaseKey);