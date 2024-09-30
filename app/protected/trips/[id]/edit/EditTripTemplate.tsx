import { GeocodeSearchResult, Trip } from "@/global.types";
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
  trip: Trip;
  searchResults: GeocodeSearchResult[];
  handleEdit: (formData: FormData) => Promise<void>;
  handleDelete: () => Promise<void>;
};

export default function EditTripTemplate({
  trip,
  handleEdit,
  handleDelete,
  searchResults,
}: Props) {
  return (
    <div>
      <form
        className="flex w-full max-w-sm items-center gap-5 flex-col my-6"
        action={handleEdit}
      >
        <FormFields trip={trip} formType="edit" searchResults={searchResults} />
      </form>

      <div className="flex gap-2 items-center justify-center w-full max-w-sm">
        <Button asChild variant={"ghost"}>
          <Link href={`/protected/trips/${trip.id}`}>Discard changes</Link>
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
                <form action={handleDelete}>
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
