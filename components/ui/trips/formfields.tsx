import { FormType, Trip } from "@/global.types";
import { Submit } from "../submit";
import {
  DestinationCombobox,
  EndDate,
  LodgingName,
  StartDate,
  TripName,
} from "./inputs";
import { formatDate } from "@/lib/utils";
import { getWktFromGeometry } from "@/lib/data";

type Props = {
  trip?: Trip;
  searchResults: any[];
  formType: FormType;
};
async function FormFields({ trip, searchResults, formType }: Props) {
  const minDate = formatDate(new Date());
  const isEdit = formType === "edit" && !!trip;
  const point = await getWktFromGeometry(String(trip?.destination_coordinates));

  return (
    <>
      <TripName
        label="Trip name"
        defaultValue={isEdit ? trip.name : undefined}
      />
      {/* <City label="Trip location" defaultValue={trip?.destination} /> */}
      <DestinationCombobox
        options={searchResults}
        label="Destination"
        tripId={isEdit ? trip.id : undefined}
        formType={formType}
        defaultValues={
          isEdit
            ? {
                destination: trip.destination,
                destination_coordinates: point,
              }
            : undefined
        }
      />
      <LodgingName
        label="Lodging"
        defaultValue={isEdit ? trip?.lodging_name : undefined}
      />
      <StartDate
        minDate={minDate}
        label="Start date"
        defaultValue={isEdit ? trip?.start_date : undefined}
      />
      <EndDate
        label="End date"
        defaultValue={isEdit ? trip?.end_date : undefined}
      />
      <Submit type="submit">Save trip</Submit>
    </>
  );
}

export default FormFields;
