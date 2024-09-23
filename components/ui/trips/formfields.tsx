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

type Props = {
  trip: Trip;
  searchResults: any[];
  formType: FormType;
};

function FormFields({ trip, searchResults, formType }: Props) {
  const minDate = formatDate(new Date());

  return (
    <>
      <TripName
        label="Trip name"
        defaultValue={formType === "edit" ? trip.name : undefined}
      />
      {/* <City label="Trip location" defaultValue={trip?.destination} /> */}
      <DestinationCombobox
        options={searchResults}
        label="Destination"
        tripId={trip.id}
        formType={formType}
      />
      <LodgingName
        label="Lodging"
        defaultValue={formType === "edit" ? trip?.lodging_name : undefined}
      />
      <StartDate
        minDate={minDate}
        label="Start date"
        defaultValue={formType === "edit" ? trip?.start_date : undefined}
      />
      <EndDate
        label="End date"
        defaultValue={formType === "edit" ? trip?.end_date : undefined}
      />
      <Submit type="submit">Save trip</Submit>
    </>
  );
}

export default FormFields;
