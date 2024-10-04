import { Trip } from "@/global.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import CalendarBox from "../calendar-box";

type Props = { trip: Trip };

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
  const startDateNum = new Date(start_date + "\n").getDate();
  const startDateMonth = new Date(start_date + "\n").getMonth();
  const endDateNum = new Date(end_date + "\n").getDate();
  const endDateMonth = new Date(end_date + "\n").getMonth();

  return (
    <Link href={`/protected/trips/${trip.id}`}>
      <Card className="h-full flex flex-col justify-between gap-6 items-center hover:shadow-border hover:shadow-md cursor-pointer transition-shadow p-6">
        <CardHeader className="select-none pt-0 flex-row p-0 w-full justify-center">
          <CardTitle>{trip.name}</CardTitle>
        </CardHeader>
        <CardContent className="select-none flex flex-col gap-3 p-0 w-full items-center justify-center">
          <CardDescription className="text-lg items-center gap-1 p-0 w-fit">
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
        <CardFooter className="p-0">
          <div className="flex gap-5 items-center select-none">
            <CalendarBox month={startDateMonth} date={startDateNum} />
            <ArrowRight className="h-6 w-6" strokeWidth={3} />
            <CalendarBox month={endDateMonth} date={endDateNum} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default TripCard;


