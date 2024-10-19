"use client";

import { Marker } from "react-map-gl";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";

function HoverPin({
  coords,
  text,
  children,
}: {
  coords: { latitude: number; longitude: number };
  text: string;
  children: React.ReactNode;
}) {
  return (
    <Marker
      latitude={coords.latitude}
      longitude={coords.longitude}
      anchor="bottom"
      className="cursor-pointer"
    >
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent className="z-50">{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Marker>
  );
}

export default HoverPin;
