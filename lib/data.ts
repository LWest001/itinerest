import { Trip } from "@/global.types";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getUser() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return data.user as User
}

export async function getAllTrips() {
    const supabase = createClient();
    const { data, error } = await supabase.from('trips').select('*');

    if (error) {
        console.error('Error fetching trips:', error);
        return null;
    }

    return data as Trip[];
}

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

    return data as Trip;
}