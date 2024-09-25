"use client";

import TripCard from "./tripcard";
import { Trip } from "@/global.types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDotNavigation,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { CreateTrip } from "./buttons";

type Props = {
  trips: Trip[];
};

function TripLinks({ trips }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    if (!api?.canScrollNext() && !api?.canScrollPrev()) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    if (trips.length < 2) {
      setShowNav(false);
      return;
    }

    api?.on("resize", () => {
      if (trips.length < 2) {
        setShowNav(false);
        return;
      }

      if (!api?.canScrollNext() && !api?.canScrollPrev()) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    });
  }, [api]);

  return (
    <div className="max-w-full w-full">
      <Carousel setApi={setApi} opts={{ duration: 20 }} className="w-full">
        <CarouselContent className="p-3">
          {trips.map((trip) => (
            <CarouselItem
              key={trip.id}
              className={clsx("sm:basis-1/2 first-of-type:pl-0", {
                "lg:basis-1/3": trips.length > 2,
                "xl:basis-1/4": trips.length > 3,
              })}
            >
              <TripCard trip={trip} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-2 my-2">
          <CarouselPrevious
            className={clsx({ "!hidden": showNav === false })}
          />
          <CarouselNext
            className={clsx({
              "!hidden": showNav === false,
            })}
          />
        </div>
        {/* <CarouselDotNavigation
          showNav={showNav}
          trips={trips}
          api={api}
          current={current}
        /> */}
      </Carousel>

      <CreateTrip className="mt-3" />
    </div>
  );
}

export default TripLinks;

