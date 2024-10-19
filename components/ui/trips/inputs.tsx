"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { GeocodeSearchResult, Trip } from "@/global.types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { getPointFromGeocodeResult } from "@/lib/utils";
import { FormType } from "@/global.types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormContext } from "@/utils/FormContext";

type Props = {
  minDate: string;
  label: string;
  defaultValue?: string;
};

export function StartDate({ minDate, label, defaultValue }: Props) {
  return (
    <div className="w-full">
      <Label htmlFor="start_date">{label}</Label>
      <Input
        type="date"
        placeholder="start date"
        name="start_date"
        min={minDate}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}
export function EndDate({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) {
  return (
    <div className="w-full">
      <Label htmlFor="end_date">{label}</Label>
      <Input
        type="date"
        placeholder="end date"
        name="end_date"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}

export function LodgingName({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string | null;
}) {
  return (
    <div className="w-full">
      <Label htmlFor="lodging_name">{label}</Label>
      <Input
        type="text"
        placeholder="Where are you staying?"
        name="lodging_name"
        defaultValue={defaultValue ? defaultValue : undefined}
      />
    </div>
  );
}

export function TripName({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) {
  return (
    <div className="w-full">
      <Label htmlFor="name">{label}</Label>
      <Input
        type="text"
        placeholder="New trip"
        name="name"
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}

type DestinationComboboxProps = {
  label: string;
  field: "destination" | "lodging_name";
  formType: FormType;
};

export function DestinationCombobox({
  label,
  field,
  formType,
}: DestinationComboboxProps) {
  const {
    trip,
    destinationCoordinates,
    destinationResults,
    lodgingCoordinates,
    lodgingResults,
  } = useContext(FormContext);

  const tripId = trip?.id;
  const options = field === "destination" ? destinationResults : lodgingResults;
  const defaultName =
    field === "destination" ? trip?.destination : trip?.lodging_name;
  const searchParams = useSearchParams();
  const search =
    field === "destination"
      ? searchParams.get("destination-search")
      : searchParams.get("lodging-search");
  const defaultValue = search || "Where are you going?";
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [forceMount, setForceMount] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<GeocodeSearchResult | null>(null);
  function isSelected(option: GeocodeSearchResult) {
    return JSON.stringify(selectedOption) === JSON.stringify(option);
  }

  const handleValueChange = (value: string) => {
    router.replace(
      getRouterString({
        formType,
        field,
        tripId,
        destinationSearch:
          field === "destination"
            ? value
            : searchParams.get("destination-search"),
        lodgingSearch:
          field === "lodging_name" ? value : searchParams.get("lodging-search"),
      }),
    );
  };

  const debouncedHandleValueChange = useDebouncedCallback((value: string) => {
    if (value?.length < 2) {
      setIsPending(false);
      return;
    }
    handleValueChange(value);
  }, 1000);

  useEffect(() => {
    if (options.length) {
      setForceMount(true);
    } else {
      setForceMount(false);
    }
    setIsPending(false);
  }, [options, destinationResults, lodgingResults]);

  return (
    <div className="w-full flex flex-col gap-1">
      <Label htmlFor={field}>{label}</Label>
      {/* This hidden input holds and sends the name of the location */}
      {selectedOption && (
        <Input
          defaultValue={selectedOption?.display_name}
          name={field}
          className="hidden"
        />
      )}
      {/* This hidden input holds and sends the coordinates of the location */}
      {selectedOption && (
        <Input
          defaultValue={getPointFromGeocodeResult(selectedOption)}
          name={
            field === "destination"
              ? "destination_coordinates"
              : "lodging_coordinates"
          }
          className="hidden"
        />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" justify-between text-wrap h-auto"
          >
            {selectedOption
              ? selectedOption?.display_name
              : options?.length
                ? "Select option..."
                : defaultName || "Find your destination..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
          <Command>
            {/* This visible input just helps perform the search and presents options,
             but does not generate anything for the formData object */}
            <CommandInput
              //   className="w-full"
              placeholder={defaultValue || "Search"}
              name={"commandInput"}
              id={field}
              onValueChange={(s) => {
                setForceMount(false);
                setIsPending(s === "" ? false : true);
                s?.length
                  ? debouncedHandleValueChange(s)
                  : handleValueChange(s);
              }}
              required
            />
            {isPending && <Skeleton className="w-full h-9 mt-1" />}
            <CommandList className="pt-3">
              {!isPending && search?.length && !options?.length && (
                <CommandEmpty className={cn("py-6 text-center text-sm")}>
                  No results found.
                </CommandEmpty>
              )}

              <CommandGroup forceMount={forceMount}>
                {options.map((option) => (
                  <CommandItem
                    key={option.place_id}
                    value={JSON.stringify(option)}
                    onSelect={(currentValue) => {
                      setSelectedOption(JSON.parse(currentValue));
                      setOpen(isSelected(option) ? true : false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-8 w-8",
                        isSelected(option) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.display_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function getRouterString(options: {
  formType: FormType;
  field: "destination" | "lodging_name";
  destinationSearch: string | null;
  lodgingSearch: string | null;
  tripId?: Trip["id"];
}) {
  const { formType, destinationSearch, lodgingSearch, tripId } = options;
  return `/protected/trips/${formType === "edit" ? `${tripId}/` : ""}${formType}?${destinationSearch ? `destination-search=${destinationSearch}` : ""}${destinationSearch && lodgingSearch ? "&" : ""}${lodgingSearch ? `lodging-search=${lodgingSearch}` : ""}`;
}
