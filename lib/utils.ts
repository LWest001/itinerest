import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GeocodeSearchResult } from "@/global.types";
import { redirect } from "next/navigation";
import { LatLngExpression } from "leaflet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormattedDate = string;
export function formatDate(date: Date) {
  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  const formattedDate = (year + "-" + month + "-" + day) as FormattedDate;
  return formattedDate; // Prints: 2022-05-04
}

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function getPointFromGeocodeResult(result: GeocodeSearchResult) {
  return `POINT(${result.lon} ${result.lat})`;
}

export function getTripsInsertionData(data: FormData) {
  const tripData = {
    name: data.get("name"),
    destination: data.get("destination"),
    destination_coordinates: data.get("destination_coordinates"),
    lodging_name: data.get("lodging_name"),
    lodging_coordinates: data.get("lodging_coordinates"),
    start_date: data.get("start_date"),
    end_date: data.get("end_date"),
  };

  for (const property in tripData) {
    if (tripData[property as keyof typeof tripData] === null) {
      delete tripData[property as keyof typeof tripData];
    }
  }

  return tripData;
}

export function getFilename(avatarUrl: string) {
  return avatarUrl.split("/").pop();
}

export function getLatLon(wkt: string) {
  if (!wkt) {
    return;
  }
  const arr = wkt.replace("POINT(", "").replace(")", "").split(" ").reverse();
  if (arr.length !== 2) {
    throw new Error("Invalid WKT format");
  }
  return {
    latitude: Number(arr[0]),
    longitude: Number(arr[1]),
  };
}