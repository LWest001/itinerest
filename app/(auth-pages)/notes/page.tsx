import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: trips } = await supabase.from("trips").select();

  return <pre>{JSON.stringify(trips, null, 2)}</pre>;
}
