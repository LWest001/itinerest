import { createClient } from "@/utils/supabase/server";


export async function getTripById(tripId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single();

    if (error) {
        console.error('Error fetching trip:', error);
        return null;
    }

    return data;
}