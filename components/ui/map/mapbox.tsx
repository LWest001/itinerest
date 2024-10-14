"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";
import { Trip } from "@/global.types";
import HoverPin from "./hover-pin";

function Mapbox({
  center,
  trip,
}: {
  center: { latitude: number; longitude: number };
  trip: Trip;
}) {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      initialViewState={{
        ...center,
        zoom: 14,
      }}
      style={{ width: 580, height: 400, maxWidth: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <HoverPin coords={center} text={trip.destination.split(",")[0]} />
    </Map>
  );
}

export default Mapbox;
