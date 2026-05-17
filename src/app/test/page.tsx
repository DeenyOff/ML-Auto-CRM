'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function TestPage() {
    useEffect(() => {
        const testConnection = async () => {
            const { data, error } = await supabase
                .from('clients')
                .select('*')

    console.log('DATA:', data)
    console.log('ERROR:', error)
}

testConnection()

        }, [])

        return ( <div className="p-10 text-white">
                Check console for Supabase response </div>
        )
    }
