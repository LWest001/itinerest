import { EditTrip } from "@/components/ui/trips/buttons";
import { getTripById } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs/breadcrumb";
import { Trip } from "@/global.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";

type Props = {
  trip: Trip | null;
};

function ViewTripTemplate({ trip }: Props) {
  return (
    trip && (
      <div className="flex flex-col">
        <Breadcrumbs
          links={[
            { href: "/protected", label: "Home" },
            { href: "/protected/trips", label: "Trips" },
            { href: `/protected/${trip.id}`, label: trip.name },
          ]}
        />
        <Card>
          <CardHeader>
            <CardTitle>{trip?.name}</CardTitle>
            <EditTrip id={trip?.id} />
            <CardDescription>{trip?.destination}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              <li>{trip?.lodging_name}</li>
              <li>{trip?.start_date}</li>
              <li>{trip?.end_date}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  );
}

export default ViewTripTemplate;
