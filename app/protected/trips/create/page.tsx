"use client";

import { Input } from "@/components/ui/input";
import { createTrip } from "@/app/actions";
import { Submit } from "@/components/ui/submit";
import { Label } from "@/components/ui/label";

export default function Form() {
  return (
    <>
      <form
        className="flex w-full max-w-sm items-center gap-5 flex-col"
        action={createTrip}
      >
        <div className="w-full">
          <Label htmlFor="name">Name your trip</Label>
          <Input type="text" placeholder="New trip" name="name" />
        </div>
        <div className="w-full">
          <Label htmlFor="city">
            Where are you going? (Try the name of a city)
          </Label>
          <Input type="text" placeholder="City" name="city" />
        </div>
        <div className="w-full">
          <Label htmlFor="lodging_name">Where are you sleeping?</Label>
          <Input
            type="text"
            placeholder="Where are you staying?"
            name="lodging_name"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="start_date">Start date</Label>
          <Input type="date" placeholder="start date" name="start_date" />
        </div>
        <div className="w-full">
          <Label htmlFor="end_date">End date</Label>
          <Input type="date" placeholder="end date" name="end_date" />
        </div>
        <Submit type="submit">Create trip</Submit>
      </form>
    </>
  );
}
