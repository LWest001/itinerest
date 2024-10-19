import { searchLocation } from "@/lib/data";
import { Trip } from "@/global.types";
import CreateTripTemplate from "./CreateTripTemplate";

type Props = {
  params: {
    id: Trip["id"];
  };
  searchParams: {
    "destination-search": string;
    "lodging-search": string;
  };
};

export default async function Form({ searchParams }: Props) {
  const destinationResults = await searchLocation(
    searchParams["destination-search"],
  );
  const lodgingResults = await searchLocation(searchParams["lodging-search"]);

  return (
    <CreateTripTemplate
      destinationResults={destinationResults}
      lodgingResults={lodgingResults}
    />
  );
}
