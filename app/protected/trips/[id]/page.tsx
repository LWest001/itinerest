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

type Props = {
  params: {
    id: string;
  };
};

async function ViewTrip({ params }: Props) {
  const trip = await getTripById(params.id);

  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/trips">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1>{trip?.name}</h1>
      <EditTrip id={params.id} />
      <ul>
        <li>{trip?.destination}</li>
        <li>{trip?.lodging_name}</li>
        <li>{trip?.start_date}</li>
        <li>{trip?.end_date}</li>
      </ul>
    </div>
  );
}

export default ViewTrip;
