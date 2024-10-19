"use client";
import { createContext, useContext } from "react";
import { Trip, GeocodeSearchResult } from "@/global.types";

type Props = {
  destinationResults: GeocodeSearchResult[];
  lodgingResults: GeocodeSearchResult[];
  trip?: Trip | null;
  destinationCoordinates?: string | null;
  lodgingCoordinates?: string | null;
};

export const FormContext = createContext<Props>({
  trip: null,
  destinationResults: [],
  lodgingResults: [],
  destinationCoordinates: null,
  lodgingCoordinates: null,
});

export default function TripFormProvider({
  value,
  children,
}: {
  value: Props;
  children: React.ReactNode;
}) {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useTripForm() {
  return useContext(FormContext);
}
