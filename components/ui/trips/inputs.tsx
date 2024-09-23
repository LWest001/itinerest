"use client";

import { useEffect, useState } from "react";
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
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { CommandLoading } from "cmdk";
import { getPointFromGeocodeResult } from "@/utils/utils";
import { FormType } from "@/global.types";

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

// export function City({
//   label,
//   defaultValue,
// }: {
//   label: string;
//   defaultValue?: string;
// }) {
//   return (
//     <div className="w-full">
//       <Label htmlFor="destination">{label}</Label>
//       <Input
//         type="text"
//         placeholder="City"
//         name="destination"
//         defaultValue={defaultValue}
//       />
//     </div>
//   );
// }

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
      />
    </div>
  );
}

type DestinationComboboxProps = {
  label: string;
  options: GeocodeSearchResult[];
  formType: FormType;
  tripId?: Trip["id"];
};

function getRouterString(
  formType: FormType,
  value: string,
  tripId?: Trip["id"]
) {
  return `/protected/trips/${formType === "edit" ? tripId + "/" : ""}${formType}?search=${value}`;
}

export function DestinationCombobox({
  label,
  options,
  formType,
  tripId,
}: DestinationComboboxProps) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("search") || "Where are you going?";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
  const [forceMount, setForceMount] = useState(false);
  const handleValueChange = useDebouncedCallback((value: string) => {
    setForceMount(false);
    router.replace(getRouterString(formType, value, tripId));
  }, 1000);

  useEffect(() => {
    if (options.length) {
      setForceMount(true);
    } else {
      setForceMount(false);
    }
  }, [options]);

  return (
    <div className="w-full flex flex-col">
      <Label htmlFor="destination">{label}</Label>
      <Input
        value={
          options.find((option) => String(option.place_id) === String(value))
            ?.display_name
        }
        name="destination"
        className="hidden"
      />
      <Input
        value={
          getPointFromGeocodeResult(
            options.find((option) => String(option.place_id) === String(value))
          ) || ""
        }
        name="destination_coordinates"
        className="hidden"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" justify-between text-wrap h-auto"
          >
            {value
              ? options.find(
                  (option) => String(option.place_id) === String(value)
                )?.display_name
              : options?.length
                ? "Select option..."
                : "Find your destination..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
          <Command>
            <CommandInput
              //   className="w-full"
              placeholder={defaultValue || "Search"}
              name="destination"
              onValueChange={(s) => {
                setForceMount(false);
                handleValueChange(s);
              }}
            />

            <CommandList>
              <CommandEmpty
                className={cn("py-6 text-center text-sm", {
                  hidden: options?.length,
                })}
              >
                No results found.
              </CommandEmpty>
              <CommandGroup forceMount={forceMount}>
                {options.map((option) => (
                  <CommandItem
                    key={option.place_id}
                    value={String(option.place_id)}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(currentValue === value ? true : false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        String(value) === String(option.place_id)
                          ? "opacity-100"
                          : "opacity-0"
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

