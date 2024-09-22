"use client";

import { Input } from "../input";
import { Label } from "../label";

export function StartDate({
  minDate,
  label,
}: {
  minDate: string;
  label: string;
}) {
  return (
    <div className="w-full">
      <Label htmlFor="start_date">{label}</Label>
      <Input
        type="date"
        placeholder="start date"
        name="start_date"
        min={minDate}
      />
    </div>
  );
}

export function EndDate({ label }: { label: string }) {
  return (
    <div className="w-full">
      <Label htmlFor="end_date">{label}</Label>
      <Input type="date" placeholder="end date" name="end_date" />
    </div>
  );
}

export function LodgingName({ label }: { label: string }) {
  return (
    <div className="w-full">
      <Label htmlFor="lodging_name">{label}</Label>
      <Input
        type="text"
        placeholder="Where are you staying?"
        name="lodging_name"
      />
    </div>
  );
}

export function City({ label }: { label: string }) {
  return (
    <div className="w-full">
      <Label htmlFor="city">{label}</Label>
      <Input type="text" placeholder="City" name="city" />
    </div>
  );
}

export function TripName({ label }: { label: string }) {
  return (
    <div className="w-full">
      <Label htmlFor="name">{label}</Label>
      <Input type="text" placeholder="New trip" name="name" />
    </div>
  );
}
