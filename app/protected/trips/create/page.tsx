import { createTrip } from "@/app/actions";
import { Submit } from "@/components/ui/submit";
import { formatDate } from "@/lib/utils";
import {
  City,
  CityCombobox,
  EndDate,
  LodgingName,
  StartDate,
  TripName,
} from "@/components/ui/trips/inputs";
import { searchLocation } from "@/lib/data";
import { Trip } from "@/global.types";

type Props = {
  params: {
    id: Trip["id"];
  };
  searchParams: {
    search: string;
  };
};

export default async function Form({ searchParams }: Props) {
  const minDate = formatDate(new Date());

  const searchResults = await searchLocation(searchParams?.search);

  return (
    <>
      <form
        className="flex w-full max-w-sm items-center gap-5 flex-col"
        action={createTrip}
      >
        <TripName label="Name your trip" />
        {/* <City label="Where are you going? (Try the name of a city)" /> */}
        <CityCombobox label="Destination" options={searchResults} />
        <LodgingName label="Where are you sleeping?" />
        <StartDate minDate={minDate} label="Start date" />
        <EndDate label="End date" />
        <Submit type="submit">Create trip</Submit>
      </form>
    </>
  );
}
