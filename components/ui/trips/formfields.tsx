"use client"

import { FormType, Trip } from "@/global.types"
import { Submit } from "../submit"
import {
  DestinationCombobox,
  EndDate,
  LodgingName,
  StartDate,
  TripName,
} from "./inputs"
import { formatDate } from "@/lib/utils"
import { useTripForm } from "@/utils/FormContext";

type Props = {
  formType: FormType;
};

function FormFields({ formType }: Props) {
  const { trip } = useTripForm();
  const minDate = formatDate(new Date());
  const isEdit = formType === "edit" && !!trip;

  return (
    <>
      <TripName
        label="Trip name"
        defaultValue={isEdit ? trip.name : undefined}
      />
      <DestinationCombobox field={"destination"} />
      <DestinationCombobox field={"lodging_name"} />
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

export default FormFields
