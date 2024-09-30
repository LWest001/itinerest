import { getTripById } from "@/lib/data";
import ViewTripTemplate from "./ViewTripTemplate";

type Props = {
  params: {
    id: string;
  };
};

async function ViewTrip({ params }: Props) {
  const trip = await getTripById(params.id);
  return <ViewTripTemplate trip={trip} />;
}

export default ViewTrip;
