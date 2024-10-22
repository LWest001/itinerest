"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn, formatDate } from "@/lib/utils";
import { MapboxGeocodingFeature } from "@/global.types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { getPointFromGeocodeResult } from "@/lib/utils";
import { useTripForm } from "@/utils/FormContext";

type Props = {
  defaultValue?: string;
};

export function StartDate({ defaultValue }: Props) {
  const minDate = formatDate(new Date());
  return (
    <div className="w-full">
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
export function EndDate({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="w-full">
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
  field: "destination" | "lodging_name";
};

export function DestinationCombobox({ field }: DestinationComboboxProps) {
  // hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // state
  const [open, setOpen] = useState(false);
  const [forceMount, setForceMount] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<MapboxGeocodingFeature | null>(null);

  const { trip, destinationResults, lodgingResults } = useTripForm();

  // variables
  const searchResults =
    field === "destination" ? destinationResults : lodgingResults;
  const defaultName =
    field === "destination" ? trip?.destination : trip?.lodging_name;
  const searchTerm =
    field === "destination"
      ? searchParams.get("destination-search")
      : searchParams.get("lodging-search");
  const defaultValue =
    searchTerm || field === "destination"
      ? "Where are you going?"
      : "Where are you staying?";

  // callbacks
  const isSelected = useCallback(
    (option: MapboxGeocodingFeature) => {
      return JSON.stringify(selectedOption) === JSON.stringify(option);
    },
    [selectedOption],
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleValueChange = useCallback(
    (value: string) => {
      router.replace(
        pathname +
          "?" +
          createQueryString(
            (field === "destination" ? "destination" : "lodging") + "-search",
            value,
          ),
        { scroll: false },
      );
    },
    [pathname],
  );

  const debouncedHandleValueChange = useDebouncedCallback((value: string) => {
    if (value?.length < 2) {
      setIsPending(false);
      return;
    }
    handleValueChange(value);
  }, 1000);

  // sets states for managing
  useEffect(() => {
    if (searchResults.length) {
      setForceMount(true);
    } else {
      setForceMount(false);
    }
    setIsPending(false);
  }, [searchResults, destinationResults, lodgingResults]);

  return (
    <div className="w-full flex flex-col gap-1">
      {/* <>

      </> */}
      {/* This hidden input holds and sends the name of the location */}
      {selectedOption && (
        <Input
          defaultValue={selectedOption?.properties.full_address}
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
          required
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
              ? selectedOption?.properties.full_address
              : searchResults?.length
                ? "Select option..."
                : defaultName ||
                  (field === "destination"
                    ? "Find your destination..."
                    : "Find your lodging...")}
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
            {isPending && <Loader2 className="animate-spin m-auto mt-6" />}
            <CommandList className="pt-3">
              {!isPending &&
                !!searchTerm?.length &&
                !!!searchResults?.length && (
                  <CommandEmpty className={cn("py-6 text-center text-sm")}>
                    No results found.
                  </CommandEmpty>
                )}

              <CommandGroup forceMount={forceMount}>
                {searchResults.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={JSON.stringify(option)}
                    onSelect={(currentValue) => {
                      setSelectedOption(JSON.parse(currentValue));
                      setOpen(isSelected(option) ? true : false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 min-w-4",
                        isSelected(option) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.properties.full_address}
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
