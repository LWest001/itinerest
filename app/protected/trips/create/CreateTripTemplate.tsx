"use client";

import { createTrip } from "@/app/actions";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import FormFields from "@/components/ui/trips/formfields";
import { MapboxGeocodingFeature } from "@/global.types";
import { FormContext } from "@/utils/FormContext";

type Props = {
  destinationResults: MapboxGeocodingFeature[];
  lodgingResults: MapboxGeocodingFeature[];
};

export default function CreateTripTemplate({
  destinationResults,
  lodgingResults,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 flex items-center gap-4 px-4 sm:static h-14 sm:bg-transparent sm:px-6 sm:h-auto">
        <Breadcrumbs
          links={[
            { href: "/protected", label: "Home" },
            { href: "/protected/trips", label: "Trips" },
            { href: `/protected/trips/create`, label: "New trip" },
          ]}
        />
      </div>
      <form
        className="flex w-full max-w-sm items-center gap-5 flex-col m-auto my-6"
        action={createTrip}
      >
        <FormContext.Provider
          value={{
            destinationResults,
            lodgingResults,
          }}
        >
          <FormFields formType="create" />
        </FormContext.Provider>
      </form>
    </div>
  );
}
