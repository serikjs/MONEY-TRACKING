
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kedngyolrvucixyriwvp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZG5neW9scnZ1Y2l4eXJpd3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2MDg3MTEsImV4cCI6MjA0MDE4NDcxMX0.t2WnmMlPo924yo3cZ6GP1ClMHj00L7JbR615azYJPsw'
export  const supabase = createClient(supabaseUrl, supabaseKey)