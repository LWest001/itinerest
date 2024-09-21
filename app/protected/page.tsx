import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import TripLinks from "@/components/ui/trips/triplinks";
import { getAllTrips, getUser } from "@/lib/data";

export default async function ProtectedPage() {
  const user = await getUser();

  if (!user?.id) return redirect("/sign-in");

  const trips = await getAllTrips();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your trips</h2>

        {trips && <TripLinks trips={trips} />}
      </div>
    </div>
  );
}
