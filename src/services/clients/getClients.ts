import { supabase } from '@/lib/supabase/client'
import type {
    Client,
    ClientNote,
    ClientPreferences,
    ClientProfile,
} from '@/features/clients/types/client'

type ClientRow = {
    id: string
    full_name: string | null
    phone: string | null
    email: string | null
    instagram: string | null
    tags: string[] | null
    vip_status: boolean | null
    preferred_contact_method: string | null
    preferred_employee: string | null
    special_requests: string | null
    total_spent: number | null
    last_visit: string | null
    notes_summary: string | null
    created_at: string | null
    updated_at: string | null
}

function formatContactMethod(
    value: ClientRow['preferred_contact_method'],
): ClientPreferences['contactMethod'] {
    switch (value?.toLowerCase()) {
        case 'phone':
            return 'Phone'
        case 'email':
            return 'Email'
        case 'sms':
            return 'SMS'
        case 'instagram':
            return 'Instagram'
        default:
            return 'Not recorded'
    }
}

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean)

    return (parts[0]?.[0] ?? 'M') + (parts[1]?.[0] ?? parts[0]?.[1] ?? 'L')
}

function mapClientRow(row: ClientRow): Client {
    return {
        id: row.id,
        name: row.full_name ?? 'Unnamed client',
        phone: row.phone ?? 'Not recorded',
        cars: [],
        lastVisit: row.last_visit ?? row.updated_at ?? row.created_at ?? new Date(0).toISOString(),
        totalSpent: row.total_spent ?? 0,
        vipStatus: row.vip_status ? 'VIP' : 'Standard',
    }
}

function mapClientProfile(row: ClientRow): ClientProfile {
    const client = mapClientRow(row)
    const tags = row.tags?.filter(Boolean) ?? []
    const notes: ClientNote[] = row.notes_summary
        ? [
            {
                id: `${row.id}-notes-summary`,
                author: {
                    name: 'Client record',
                    role: 'CRM',
                },
                timestamp: row.updated_at ?? row.created_at ?? client.lastVisit,
                body: row.notes_summary,
            },
        ]
        : []

    return {
        ...client,
        email: row.email ?? 'Not recorded',
        initials: getInitials(client.name).toUpperCase(),
        address: 'Not recorded',
        joinedAt: row.created_at ?? client.lastVisit,
        tags,
        stats: {
            bookings: 0,
            vehicles: 0,
            averageTicket: 0,
            loyaltyScore: row.vip_status ? 100 : 0,
        },
        vehicles: [],
        history: [],
        preferences: {
            contactMethod: formatContactMethod(row.preferred_contact_method),
            pickupWindow: 'Not recorded',
            invoicePreference: 'Not recorded',
            waitingArea: row.preferred_employee
                ? `Preferred employee: ${row.preferred_employee}`
                : 'Not recorded',
            specialInstructions: row.special_requests ? [row.special_requests] : [],
            favoriteServices: tags,
        },
        notes,
        photos: [],
        recentActivity: row.last_visit
            ? [
                {
                    id: `${row.id}-last-visit`,
                    date: row.last_visit,
                    title: 'Last recorded visit',
                    description: 'Latest visit recorded in Supabase.',
                },
            ]
            : [],
    }
}

export async function getClients(): Promise<Client[]> {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('last_visit', { ascending: false, nullsFirst: false })

    if (error) {
        throw new Error(error.message)
    }

    return (data ?? []).map((row) => mapClientRow(row as ClientRow))
}

export async function getClientProfile(id: string): Promise<ClientProfile | null> {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .maybeSingle()

    if (error) {
        throw new Error(error.message)
    }

    return data ? mapClientProfile(data as ClientRow) : null
}
