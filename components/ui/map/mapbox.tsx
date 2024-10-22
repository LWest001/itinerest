"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";
import { Trip } from "@/global.types";
import HoverPin from "./hover-pin";
import { Hotel, MapPin } from "lucide-react";

function Mapbox({
  center,
  trip,
  lodgingCoords,
}: {
  center: { latitude: number; longitude: number };
  trip: Trip;
  lodgingCoords?: { latitude: number; longitude: number };
}) {
  return (
    <div>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        initialViewState={{
          ...center,
          zoom: 14,
        }}
        style={{
          maxWidth: "100%",
          height: 400,
          maxHeight: "100%",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <HoverPin
          id="destination"
          coords={center}
          text={trip.destination.split(",")[0]}
        >
          <MapPin size={24} fill="red" />
        </HoverPin>
        {trip?.lodging_name && lodgingCoords && (
          <HoverPin
            id="hotel"
            coords={lodgingCoords}
            text={trip?.lodging_name.split(",")[0]}
          >
            <Hotel size={24} strokeWidth={2} />
          </HoverPin>
        )}
      </Map>
    </div>
  );
}

export default Mapbox;
