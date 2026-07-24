const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ueqoaelaepfekhxnmqem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlcW9hZWxhZXBmZWtoeG5tcWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTkxMDYsImV4cCI6MjA5NDc3NTEwNn0.eUb85AcNKjFetCklmCpHefh_GaX9W6FCLpQqsmi5HUU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  const tables = ['views', 'post_views', 'analytics', 'page_views', 'clicks', 'view_count'];
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        console.log(`Table ${table} error:`, error.message);
      } else {
        console.log(`Table ${table} exists! Columns:`, data.length > 0 ? Object.keys(data[0]) : 'no rows');
      }
    } catch (err) {
      console.log(`Table ${table} throw:`, err.message);
    }
  }
}

checkSchema();
