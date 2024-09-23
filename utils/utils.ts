import { GeocodeSearchResult } from "@/global.types";
import { redirect } from "next/navigation";

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
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function getPointFromGeocodeResult(result: GeocodeSearchResult) {
  return `POINT(${result.lon} ${result.lat})`
}

export function getTripsInsertionData(data: FormData) {
  const tripData = {
    name: data.get("name"),
    destination: data.get("destination"),
    destination_coordinates: data.get("destination_coordinates"),
    lodging_name: data.get("lodging_name"),
    start_date: data.get("start_date"),
    end_date: data.get("end_date"),
  };

  return tripData;
}
