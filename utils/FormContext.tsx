"use client"
import { createContext } from "react"
import { Trip, GeocodeSearchResult } from "@/global.types"

type Props = {
  handleEdit: (formData: FormData) => Promise<void>
  handleDelete: () => Promise<void>
  destinationResults: GeocodeSearchResult[]
  lodgingResults: GeocodeSearchResult[]
  trip?: Trip | null
  destinationCoordinates?: string | null
  lodgingCoordinates?: string | null
}

export const FormContext = createContext<
  Omit<Props, "handleEdit" | "handleDelete">
>({
  trip: null,
  destinationResults: [],
  lodgingResults: [],
  destinationCoordinates: null,
  lodgingCoordinates: null,
})
