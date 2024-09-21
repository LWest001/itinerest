"use server";

import { Trip } from "@/global.types";
import { getTripById } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { updateTrip } from "@/app/actions";
import { Submit } from "@/components/ui/submit";
import { Label } from "@/components/ui/label";

export async function EditTrip({ params }: { params: { id: Trip["id"] } }) {
  const { id } = params;
  const trip = await getTripById(id);
  const updateTripWithId = updateTrip.bind(null, id);

  return (
    <>
      <form
        className="flex w-full max-w-sm items-center gap-5 flex-col"
        action={updateTripWithId}
      >
        <div className="w-full">
          <Label htmlFor="name">Trip name</Label>
          <Input type="text" defaultValue={trip?.name || ""} name="name" />
        </div>
        <div className="w-full">
          <Label htmlFor="city">Trip location</Label>
          <Input
            type="text"
            defaultValue={trip?.city || ""}
            placeholder="City"
            name="city"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="lodging_name">Lodging</Label>
          <Input
            type="text"
            defaultValue={trip?.lodging_name || ""}
            placeholder="Where are you staying?"
            name="lodging_name"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="start_date">Start date</Label>
          <Input
            type="date"
            defaultValue={trip?.start_date || ""}
            placeholder="start date"
            name="start_date"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="end_date">End date</Label>
          <Input
            type="date"
            defaultValue={trip?.end_date || ""}
            placeholder="end date"
            name="end_date"
          />
        </div>
        <Submit type="submit">Save trip</Submit>
      </form>
    </>
  );
}

export default EditTrip;
