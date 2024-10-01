import { formatDate } from "@/lib/utils";
import { searchLocation } from "@/lib/data";
import { Trip } from "@/global.types";
import CreateTripTemplate from "./CreateTripTemplate";

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
  return <CreateTripTemplate searchResults={searchResults} minDate={minDate} />;
}
