import { EditTrip } from "@/components/ui/trips/buttons";
import { getTripById } from "@/lib/data";

type Props = {
  params: {
    id: string;
  };
};

async function ViewTrip({ params }: Props) {
  const trip = await getTripById(params.id);

  return (
    <div className="flex flex-col">
      <EditTrip id={params.id} />
      <ul>
        <li>{trip?.name}</li>
        <li>{trip?.destination}</li>
        <li>{trip?.destination}</li>
        <li>{trip?.lodging_name}</li>
        <li>{trip?.start_date}</li>
        <li>{trip?.end_date}</li>
      </ul>
    </div>
  );
}

export default ViewTrip;
