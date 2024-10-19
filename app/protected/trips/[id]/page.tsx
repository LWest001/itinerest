import { getTripById, getUsersByIds, getWktFromGeometry } from "@/lib/data";
import ViewTripTemplate from "./ViewTripTemplate";
import { getLatLon } from "@/lib/utils";

type Props = {
  params: {
    id: string;
  };
};

async function ViewTrip({ params }: Props) {
  const trip = await getTripById(params.id);
  const collaborators = trip
    ? await getUsersByIds(trip?.collaborators, true)
    : [];
  const destinationPOINT = await getWktFromGeometry(
    trip?.destination_coordinates as unknown,
  );
  const destinationCoords = getLatLon(destinationPOINT);
  const lodgingPOINT = await getWktFromGeometry(trip?.lodging_coordinates);
  const lodgingCoords = getLatLon(lodgingPOINT);
  return (
    <ViewTripTemplate
      trip={trip}
      collaborators={collaborators}
      destinationCoords={destinationCoords}
      lodgingCoords={lodgingCoords}
    />
  );
}

export default ViewTrip;
