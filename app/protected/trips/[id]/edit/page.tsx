import { Trip } from "@/global.types";
import { getTripById } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { deleteTrip, updateTrip } from "@/app/actions";
import { Submit } from "@/components/ui/submit";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  City,
  EndDate,
  LodgingName,
  StartDate,
  TripName,
} from "@/components/ui/trips/inputs";
import { formatDate } from "@/lib/utils";

type Props = {
  params: {
    id: Trip["id"];
  };
};

export default async function EditTrip({ params }: Props) {
  const { id } = params;
  const trip = await getTripById(id);
  const updateTripWithId = updateTrip.bind(null, id);
  const deleteTripWithId = deleteTrip.bind(null, id);
  const minDate = formatDate(new Date());

  return (
    <div>
      <form
        className="flex w-full max-w-sm items-center gap-5 flex-col my-6"
        action={updateTripWithId}
      >
        <TripName label="Trip name" />
        <City label="Trip location" />
        <LodgingName label="Lodging" />
        <StartDate minDate={minDate} label="Start date" />
        <EndDate label="End date" />
        <Submit type="submit">Save trip</Submit>
      </form>
      <div className="flex gap-2 items-center justify-center w-full max-w-sm">
        <Button variant={"ghost"} href={"/protected/trips"}>
          Discard changes
        </Button>
        <form action={deleteTripWithId}>
          <Button variant={"destructive"}>Delete trip</Button>
        </form>
      </div>
    </div>
  );
}
