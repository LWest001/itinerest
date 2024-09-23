import { Trip } from "@/global.types";
import { getTripById, searchLocation } from "@/lib/data";
import { deleteTrip, updateTrip } from "@/app/actions";
import { Button } from "@/components/ui/button";
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
import FormFields from "@/components/ui/trips/formfields";

type Props = {
  params: {
    id: Trip["id"];
  };
  searchParams: {
    search: string;
  };
};

export default async function EditTrip({ params, searchParams }: Props) {
  const { id } = params;
  const trip = await getTripById(id);
  const updateTripWithId = updateTrip.bind(null, id);
  const deleteTripWithId = deleteTrip.bind(null, id);
  const searchResults = await searchLocation(searchParams?.search);

  return (
    <div>
      {trip && (
        <form
          className="flex w-full max-w-sm items-center gap-5 flex-col my-6"
          action={updateTripWithId}
        >
          <FormFields
            trip={trip}
            formType="edit"
            searchResults={searchResults}
          />
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
