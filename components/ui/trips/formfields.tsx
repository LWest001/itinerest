"use client"

import { FormType, Trip } from "@/global.types"
import { Submit } from "../submit"
import { DestinationCombobox, EndDate, StartDate, TripName } from "./inputs";
import { useTripForm } from "@/utils/FormContext";

type Props = {
  formType: FormType;
  withLabels?: boolean;
};

function FormFields({ formType, withLabels }: Props) {
  const { trip } = useTripForm();
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
        defaultValue={isEdit ? trip?.start_date : undefined}
        withLabel={withLabels}
      />
      <EndDate
        defaultValue={isEdit ? trip?.end_date : undefined}
        withLabel={withLabels}
      />
      <Submit type="submit">Save trip</Submit>
    </>
  );
}

export default FormFields
