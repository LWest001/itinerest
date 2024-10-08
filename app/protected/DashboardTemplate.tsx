import TripLinks from "@/components/ui/trips/triplinks";
import { Trip } from "@/global.types";

type Props = {
  trips: Trip[];
};

export default function DashboardTemplate({ trips }: Props) {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your trips</h2>

        {trips && <TripLinks trips={trips} />}
      </div>
    </div>
  );
}
