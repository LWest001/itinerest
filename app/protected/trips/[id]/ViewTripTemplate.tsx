import { EditTrip } from "@/components/ui/trips/buttons";
import { getTripById } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Trip } from "@/global.types";

type Props = {
  trip: Trip | null;
};

function ViewTripTemplate({ trip }: Props) {
  return (
    trip && (
      <div className="flex flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/protected/trips">Trips</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1>{trip?.name}</h1>
        <EditTrip id={trip?.id} />
        <ul>
          <li>{trip?.destination}</li>
          <li>{trip?.lodging_name}</li>
          <li>{trip?.start_date}</li>
          <li>{trip?.end_date}</li>
        </ul>
      </div>
    )
  );
}

export default ViewTripTemplate;
