import { Trip } from "@/global.types";
import { getTripById } from "@/lib/data";
import { deleteTrip, updateTrip } from "@/app/actions";
import { Submit } from "@/components/ui/submit";
import { Button } from "@/components/ui/button";
import {
  City,
  EndDate,
  LodgingName,
  StartDate,
  TripName,
} from "@/components/ui/trips/inputs";
import { formatDate } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

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
      {trip && (
        <form
          className="flex w-full max-w-sm items-center gap-5 flex-col my-6"
          action={updateTripWithId}
        >
          <TripName label="Trip name" defaultValue={trip.name} />
          <City label="Trip location" defaultValue={trip?.city} />
          <LodgingName
            label="Lodging"
            defaultValue={trip?.lodging_name || undefined}
          />
          <StartDate
            minDate={minDate}
            label="Start date"
            defaultValue={trip?.start_date}
          />
          <EndDate label="End date" defaultValue={trip?.end_date} />
          <Submit type="submit">Save trip</Submit>
        </form>
      )}
      <div className="flex gap-2 items-center justify-center w-full max-w-sm">
        <Button asChild variant={"ghost"}>
          <Link href={"/protected/trips"}>Discard changes</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete trip</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to permanently delete this trip?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <form action={deleteTripWithId}>
                  <Button>Continue</Button>
                </form>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
