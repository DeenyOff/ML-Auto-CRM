import { supabase } from '@/lib/supabase/client'

export async function getClients() {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        throw new Error(error.message)
    }

    return data
}