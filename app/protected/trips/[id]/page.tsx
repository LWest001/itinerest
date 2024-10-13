import { getTripById, getUsersByIds, getWktFromGeometry } from "@/lib/data";
import ViewTripTemplate from "./ViewTripTemplate";
import { splitWkt } from "@/lib/utils";

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
  const coords = await getWktFromGeometry(
    String(trip?.destination_coordinates)
  );
  const coordsArray = splitWkt(coords);
  return (
    <ViewTripTemplate
      trip={trip}
      collaborators={collaborators}
      coords={coordsArray}
    />
  );
}

export default ViewTrip;
