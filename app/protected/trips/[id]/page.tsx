import { getTripById, getUsersByIds } from "@/lib/data";
import ViewTripTemplate from "./ViewTripTemplate";

type Props = {
  params: {
    id: string;
  };
};

async function ViewTrip({ params }: Props) {
  const trip = await getTripById(params.id);
  const collaborators = trip ? await getUsersByIds(trip?.collaborators) : [];
  return <ViewTripTemplate trip={trip} collaborators={collaborators} />;
}

export default ViewTrip;
