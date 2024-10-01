import { createTrip } from "@/app/actions";
import FormFields from "@/components/ui/trips/formfields";
import { GeocodeSearchResult, Trip } from "@/global.types";
import { FormattedDate } from "@/lib/utils";

type Props = {
  searchResults: GeocodeSearchResult[];
  minDate: FormattedDate;
};

export default function CreateTripTemplate({ searchResults, minDate }: Props) {
  return (
    <form
      className="flex w-full max-w-sm items-center gap-5 flex-col"
      action={createTrip}
    >
      <FormFields searchResults={searchResults} formType="create" />
    </form>
  );
}
