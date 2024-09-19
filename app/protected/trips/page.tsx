import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Database } from "@/database.types";
import { Button } from "@/components/ui/button";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function Trips() {
  const supabase: SupabaseClient<Database> = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return redirect("/sign-in");

  const { data: trips } = await supabase
    .from("trips")
    .select("name, id")
    .eq("created_by", user.id);

  if (!user) {
    return redirect("/sign-in");
  }

  const tripButtons =
    trips &&
    trips.map((trip) => (
      <Button key={trip.id} className="btn">
        {trip.name}
      </Button>
    ));

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your trips</h2>

        {tripButtons}
        <Button variant={"secondary"}>Start a new trip</Button>
      </div>
    </div>
  );
}
