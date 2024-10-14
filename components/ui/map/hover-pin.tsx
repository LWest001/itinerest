import { Marker } from "react-map-gl";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import { MapPin } from "lucide-react";

function HoverPin({
  coords,
  text,
}: {
  coords: { latitude: number; longitude: number };
  text: string;
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
          <TooltipTrigger>
            <MapPin size={24} fill="red" />
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Marker>
  );
}

export default HoverPin;
