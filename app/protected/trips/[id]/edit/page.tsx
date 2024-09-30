import { Trip } from "@/global.types";
import EditTripTemplate from "./EditTripTemplate";
import { getTripById, searchLocation } from "@/lib/data";
import { deleteTrip, updateTrip } from "@/app/actions";

type Props = {
  params: {
    id: Trip["id"];
  };
  searchParams: {
    search: string;
  };
};

export default async function EditTrip({ params, searchParams }: Props) {
  const trip = await getTripById(params.id);
  const updateTripWithId = updateTrip.bind(null, params.id);
  const deleteTripWithId = deleteTrip.bind(null, params.id);
  const searchResults = await searchLocation(searchParams.search);
  return (
    trip && (
      <EditTripTemplate
        trip={trip}
        handleEdit={updateTripWithId}
        handleDelete={deleteTripWithId}
        searchResults={searchResults}
      />
    )
  );
}
