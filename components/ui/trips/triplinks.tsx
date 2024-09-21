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

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    if (trips.length < 2) {
      setShowNav(false);
      return;
    }

    if (!api?.canScrollNext() && !api?.canScrollPrev()) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [api]);

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

  return (
    <Carousel className="w-full" setApi={setApi} opts={{ duration: 20 }}>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselContent className="max-w-full">
        {trips.map((trip) => (
          <CarouselItem
            key={trip.id}
            className={clsx("sm:basis-1/2", {
              "lg:basis-1/3": trips.length > 2,
              "xl:basis-1/4": trips.length > 3,
            })}
          >
            <TripCard trip={trip} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="hidden md:flex" />
      <CarouselDotNavigation
        showNav={showNav}
        trips={trips}
        api={api}
        current={current}
      />
    </Carousel>
  );
}

export default TripLinks;

