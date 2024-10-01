import { redirect } from "next/navigation";
import { getAllTrips, getUser } from "@/lib/data";
import DashboardTemplate from "./DashboardTemplate";

export default async function Dashboard() {
  const user = await getUser();

  if (!user?.id) return redirect("/sign-in");

  const trips = await getAllTrips();

  return trips && <DashboardTemplate trips={trips} />;
}
