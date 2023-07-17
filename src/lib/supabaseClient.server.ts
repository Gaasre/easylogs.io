import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SECRET } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'

const supabaseBypass = createClient(
    PUBLIC_SUPABASE_URL,
    SUPABASE_SECRET,
    {
        auth: {
            persistSession: false //or true
        }
    }
)

export default supabaseBypass