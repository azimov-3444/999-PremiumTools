
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vqkysyqrikjoigffavfc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxa3lzeXFyaWtqb2lnZmZhdmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzUwNjcsImV4cCI6MjA4MDI1MTA2N30.PqHVCTJXaWgkBcxoUtAIeTPBxV0MXLuo-57af5DVE5A'
const supabase = createClient(supabaseUrl, supabaseKey)

async function get_cats() {
  const { data, error } = await supabase.from('categories').select('*')
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log(JSON.stringify(data))
}

get_cats()
