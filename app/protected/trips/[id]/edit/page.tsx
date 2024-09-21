import { Trip } from "@/global.types";
import { getTripById } from "@/lib/data";
import { useParams } from "next/navigation";

export async function EditTrip({ params }: { params: { id: Trip["id"] } }) {
  const trip = await getTripById(params.id);
  const { id } = params;
  console.log(trip);
  return <div>EditTrip {id}</div>;
}

export default EditTrip;
