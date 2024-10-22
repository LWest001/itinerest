import {
  getTripById,
  getUsersByIds,
  getWktFromGeometry,
  searchLocation,
} from "@/lib/data";
import ViewTripTemplate from "./ViewTripTemplate";
import { getLatLon } from "@/lib/utils";
import { updateTrip } from "@/app/actions";
import TripFormProvider from "@/utils/FormContext";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    "destination-search": string;
    "lodging-search": string;
  }>;
};

async function ViewTrip(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const trip = await getTripById(params.id);
  const updateTripWithId = updateTrip.bind(null, params.id);
  const collaborators = trip
    ? await getUsersByIds(trip?.collaborators, true)
    : [];

  const destinationResults = await searchLocation(
    searchParams["destination-search"],
  );
  const lodgingResults = await searchLocation(searchParams["lodging-search"]);

  const destinationPOINT = await getWktFromGeometry(
    trip?.destination_coordinates as unknown,
  );
  const destinationCoordinates = getLatLon(destinationPOINT);
  const lodgingPOINT = await getWktFromGeometry(trip?.lodging_coordinates);
  const lodgingCoordinates = getLatLon(lodgingPOINT);
  return (
    <TripFormProvider
      value={{
        destinationResults,
        lodgingResults,
        trip,
      }}
    >
      <ViewTripTemplate
        trip={trip}
        collaborators={collaborators}
        destinationCoords={destinationCoordinates}
        lodgingCoords={lodgingCoordinates}
        handleEdit={updateTripWithId}
      />
    </TripFormProvider>
  );
}

export default ViewTrip;
