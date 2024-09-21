import { Trip } from "@/global.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Pencil } from "lucide-react";
import { Button } from "../button";
import { EditTrip } from "./buttons";

type Props = { trip: Trip };

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function TripCard({ trip }: Props) {
  const { start_date, end_date } = trip;
  const startDateNum = new Date(start_date).getDate();
  const startDateMonth = new Date(start_date).getMonth();
  const endDateNum = new Date(end_date).getDate();
  const endDateMonth = new Date(end_date).getMonth();

  return (
    <Card className="h-full flex flex-col ">
      <EditTrip id={trip.id} />
      <CardHeader className="select-none pt-0 mb-auto relative -top-4">
        <CardTitle>{trip.name}</CardTitle>
      </CardHeader>
      <CardContent className="select-none flex flex-col gap-3">
        <CardDescription>{trip.city}</CardDescription>
        <div className="flex justify-between">
          <Calendar month={startDateMonth} date={startDateNum} />
          <Calendar month={endDateMonth} date={endDateNum} />
        </div>
      </CardContent>
      {/* <CardFooter className="select-none"></CardFooter> */}
    </Card>
  );
}

export default TripCard;

function Calendar({ month, date }: { month: number; date: number }) {
  return (
    <div className="w-14">
      <div className="w-full h-4 bg-red-400 p-0 text-xs leading-none flex items-center justify-center">
        <span>{monthNames[month]}</span>
      </div>
      <div className="w-full h-7 bg-white p-0 leading-none flex items-center justify-center">
        <span className="text-black">{date}</span>
      </div>
    </div>
  );
}
