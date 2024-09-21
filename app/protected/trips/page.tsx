import { redirect } from "next/navigation";
import { CreateTrip } from "@/components/ui/trips/buttons";
import TripLinks from "@/components/ui/trips/triplinks";
import { getAllTrips, getUser } from "@/lib/data";

export default async function Trips() {
  const user = await getUser();

  if (!user?.id) return redirect("/sign-in");

  const trips = await getAllTrips();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <div className="flex space-x-2 items-center mb-4">
          <h2 className="font-bold text-2xl ">Your trips</h2>
        </div>
        {trips && <TripLinks trips={trips} />}
      </div>
    </div>
  );
}
