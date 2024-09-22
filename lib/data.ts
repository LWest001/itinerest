import { GeocodeSearchResult, Trip } from "@/global.types";
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
    const { data, error } = await supabase.from('trips').select('*').order('start_date');

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

export async function searchLocation(searchTerm?: string) {
    if (!searchTerm) {
        return [];
    }
    const response = await fetch(`https://geocode.maps.co/search?q=${searchTerm}&api_key=${process.env.GEOCODER_API_KEY}`);
    const data = await response.json();

    return data.filter((result: any) => result.osm_type === "relation" || result.osm_type === "node"|| result.osm_type === "way") as GeocodeSearchResult[];
}