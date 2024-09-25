import { Trip } from "@/global.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { EditTrip } from "./buttons";
import { ArrowRight, MapPin } from "lucide-react";

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

function _getFirstWord(str: string) {
  return str.split(",")[0];
}

function _getLastWord(str: string) {
  return str.split(",").at(-1);
}

function getLocationString(str: string) {
  const firstWord = _getFirstWord(str);
  const lastWord = _getLastWord(str);
  if (firstWord === lastWord) {
    return firstWord;
  } else {
    return `${firstWord}, ${lastWord}`;
  }
}

function TripCard({ trip }: Props) {
  const { start_date, end_date } = trip;
  const startDateNum = new Date(start_date).getDate();
  const startDateMonth = new Date(start_date).getMonth();
  const endDateNum = new Date(end_date).getDate();
  const endDateMonth = new Date(end_date).getMonth();

  return (
    <Card className="h-full flex flex-col justify-between gap-6 items-center shadow-border shadow-md">
      <CardHeader className="select-none pt-0 flex-row justify-between p-0 items-start w-full">
        <CardTitle className="pt-6 pl-6">{trip.name}</CardTitle>
        <EditTrip id={trip.id} className="inline-block " />
      </CardHeader>
      <CardContent className="select-none flex flex-col gap-3 py-0 w-full">
        <CardDescription className="text-md items-center gap-1 w-full">
          <MapPin
            className="min-w-8 float-left"
            size={30}
            fill="#f57470"
            color="black"
            strokeWidth={1}
          />
          <span>{getLocationString(trip.destination)}</span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex gap-5 items-center">
          <Calendar month={startDateMonth} date={startDateNum} />
          <ArrowRight className="h-6 w-6" strokeWidth={3} />
          <Calendar month={endDateMonth} date={endDateNum} />
        </div>
      </CardFooter>
      {/* <CardFooter className="select-none"></CardFooter> */}
    </Card>
  );
}

export default TripCard;

function Calendar({ month, date }: { month: number; date: number }) {
  return (
    <div className="w-14 select-none">
      <div className="w-14 h-11 bg-gradient-to-tr from-transparent from-50% to-white/20 to-95% absolute rounded-lg shadow-sm shadow-border"></div>
      {/* <div className="w-full h-4 bg-red-400 p-0 text-xs leading-none flex items-center justify-center rounded-t-lg border-zinc-500 border-t border-x"> */}
      <div className="w-full h-4 bg-red-400 p-0 text-xs leading-none flex items-center justify-center rounded-t-lg">
        <span>{monthNames[month]}</span>
      </div>
      <div className="w-full h-7 bg-white p-0 leading-none flex items-center justify-center rounded-b-lg ">
        {/* <div className="w-full h-7 bg-white p-0 leading-none flex items-center justify-center rounded-b-lg border-zinc-500 border-b border-x"> */}
        <span className="text-black">{date}</span>
      </div>
    </div>
  );
}
