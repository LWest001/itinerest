import { GeocodeSearchResult, Profile, Trip } from "@/global.types";
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
    if (response.ok) {
        const data = await response.json();
        return data?.filter((result: any) => result.osm_type === "relation" || result.osm_type === "node" || result.osm_type === "way") as GeocodeSearchResult[]
    } else { 
        return [];
    }
}



export async function getWktFromGeometry(geometry: string) {
    const supabase = createClient();

    const { data, error } = await supabase.rpc('get_wkt_from_geometry', { geometry });
    
    if (error) {
        console.error('Error fetching WKT from geometry:', error);
        return null;
    }

    return data;
}

export async function getUsersByIds(ids: string[] | null, excludeCurrentUser = false) {
    const supabase = createClient();
    if (!ids) {
        return [];
    }

    if (excludeCurrentUser) {
        const currentUser = await getUser();
        ids = ids.filter(id => id !== currentUser?.id);
    }

    const { data, error } = await supabase
        .from('profiles').select('*').in('id', ids);

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }

    return data as User[];
}

export async function getUserProfile() {
    const user = await getUser();
    if (!user) {
        return null;
    }
    const {id} = user;
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data as Profile;
}