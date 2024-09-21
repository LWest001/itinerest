import { Database } from "@/database.types";
import { Trip } from "@/global.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

type Props = { trip: Trip };

function TripCard({ trip }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="select-none">
        <CardTitle>{trip.name}</CardTitle>
        <CardDescription>{trip.city}</CardDescription>
      </CardHeader>
      <CardContent className="select-none">
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="select-none">
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default TripCard;
