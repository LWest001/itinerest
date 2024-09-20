"use client";
import { Button } from "@/components/ui/button";

function TripLinks({
  trips,
}: {
  trips: {
    name: string | null;
    id: string;
  }[];
}) {
  return (
    <div className="flex gap-2 w-full max-w-full flex-wrap">
      {trips.map((trip) => (
        <Button key={trip.id} className="btn">
          {trip.name}
        </Button>
      ))}
    </div>
  );
}

export default TripLinks;
