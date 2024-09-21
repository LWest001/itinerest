"use client";

import TripCard from "./tripcard";
import { Trip } from "@/global.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";

type Props = {
  trips: Trip[];
};

function TripLinks({ trips }: Props) {
  return (
    <Carousel className="max-w-full">
      <CarouselPrevious />
      <CarouselContent className="max-w-full">
        {trips.map((trip) => (
          <CarouselItem key={trip.id} className="md:basis-1/2">
            <TripCard trip={trip} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
}

export default TripLinks;
