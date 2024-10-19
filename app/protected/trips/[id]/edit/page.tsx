import { Trip } from "@/global.types";
import EditTripTemplate from "./EditTripTemplate";
import { getTripById, getWktFromGeometry, searchLocation } from "@/lib/data";
import { deleteTrip, updateTrip } from "@/app/actions";
import { Suspense } from "react";
import Loading from "./loading";
import TripFormProvider from "@/utils/FormContext";

type Props = {
  params: {
    id: Trip["id"];
  };
  searchParams: {
    "destination-search": string;
    "lodging-search": string;
  };
};

export default async function EditTrip({ params, searchParams }: Props) {
  const trip = await getTripById(params.id);
  const updateTripWithId = updateTrip.bind(null, params.id);
  const deleteTripWithId = deleteTrip.bind(null, params.id);
  const destinationResults = await searchLocation(
    searchParams["destination-search"],
  );
  const lodgingResults = await searchLocation(searchParams["lodging-search"]);
  const destinationCoordinates = await getWktFromGeometry(
    trip?.destination_coordinates,
  );
  const lodgingCoordinates = await getWktFromGeometry(
    trip?.lodging_coordinates,
  );
  return (
    <Suspense fallback={<Loading />}>
      {trip && (
        <TripFormProvider
          value={{
            trip,
            destinationResults,
            lodgingResults,
            destinationCoordinates,
            lodgingCoordinates,
          }}
        >
          <EditTripTemplate
            trip={trip}
            handleEdit={updateTripWithId}
            handleDelete={deleteTripWithId}
          />
        </TripFormProvider>
      )}
    </Suspense>
  );
}
