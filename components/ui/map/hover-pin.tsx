"use client";

import { Marker } from "react-map-gl";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { TooltipTriggerProps } from "@radix-ui/react-tooltip";
import { useHover } from "@/lib/useHover";

function HoverPin({
  id,
  coords,
  text,
  children,
}: {
  id: string;
  coords: { latitude: number; longitude: number };
  text: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isHovered = useHover(triggerRef);
  const handleClick = () => setOpen((prev) => !prev);
  useEffect(() => {
    if (isHovered) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isHovered]);
  return (
    <Marker
      latitude={coords.latitude}
      longitude={coords.longitude}
      anchor="bottom"
    >
      <TooltipProvider>
        <Tooltip delayDuration={0} open={open}>
          <TooltipTrigger
            onClick={handleClick}
            ref={triggerRef}
            className=">:cursor-pointer"
          >
            {children}
          </TooltipTrigger>
          <TooltipContent className="z-50">{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Marker>
  );
}

export default HoverPin;
