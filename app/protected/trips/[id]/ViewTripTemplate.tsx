import { Profile, Trip } from "@/global.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import { ArrowRight, ChevronLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendarBox from "@/components/ui/calendar-box";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Mapbox from "@/components/ui/map/mapbox";
import EditableDataPair from "@/components/ui/editable-data-pair";
import {
  DestinationCombobox,
  EndDate,
  StartDate,
} from "@/components/ui/trips/inputs";

type Props = {
  trip: Trip | null;
  collaborators: Profile[];
  destinationCoords: { latitude: number; longitude: number } | undefined;
  lodgingCoords: { latitude: number; longitude: number } | undefined;
  handleEdit: (formData: FormData) => Promise<void>;
};

async function ViewTripTemplate({
  trip,
  collaborators,
  destinationCoords,
  lodgingCoords,
  handleEdit,
}: Props) {
  const startDateNum = new Date(trip?.start_date + "\n").getDate();
  const startDateMonth = new Date(trip?.start_date + "\n").getMonth();
  const endDateNum = new Date(trip?.end_date + "\n").getDate();
  const endDateMonth = new Date(trip?.end_date + "\n").getMonth();
  const calendarFieldClassName = "max-w-fit min-h-[86px] justify-start";
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col sm:gap-4 w-full ">
        <div className="sticky top-0 flex items-center gap-4 px-4 sm:static h-14 sm:bg-transparent sm:px-6 sm:h-auto">
          {trip && (
            <Breadcrumbs
              links={[
                { href: "/protected", label: "Home" },
                { href: "/protected/trips", label: "Trips" },
                { href: `/protected/trips/${trip.id}`, label: trip.name },
              ]}
            />
          )}
        </div>
        <div className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4 w-full">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href={"/protected/trips"}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>

              {trip && (
                <form action={handleEdit}>
                  <EditableDataPair
                    property="name"
                    value={trip.name}
                    className="max-w-fit"
                    display={
                      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-wrap">
                        {trip.name}
                      </h1>
                    }
                    suppressLabel
                    withContent
                  />
                </form>
              )}
              {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                  In stock
                </Badge> */}
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Details</CardTitle>
                    <CardDescription>Trip description</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {trip && (
                      <form action={handleEdit}>
                        <EditableDataPair
                          value={trip.destination}
                          property="Destination"
                          inputs={<DestinationCombobox field="destination" />}
                          className="w-full min-w-full"
                        />
                      </form>
                    )}
                    <div className="flex flex-col gap-1">
                      <h4>Trip dates</h4>
                      <div>
                        {trip && (
                          <form
                            action={handleEdit}
                            // className="flex justify-between flex-wrap gap-5 items-center"
                            className="grid items-center grid-cols-[2fr_1fr_2fr] gap-2"
                          >
                            <EditableDataPair
                              value={trip.start_date}
                              property="Start Date"
                              inputs={<StartDate />}
                              display={
                                <CalendarBox
                                  month={startDateMonth}
                                  date={startDateNum}
                                />
                              }
                              className={calendarFieldClassName}
                            />
                            <div className="flex items-center justify-center">
                              <ArrowRight
                                className="h-6 w-6 hidden xs:block"
                                strokeWidth={3}
                              />
                            </div>
                            <EditableDataPair
                              value={trip.end_date}
                              property="End Date"
                              inputs={<EndDate />}
                              display={
                                <CalendarBox
                                  month={endDateMonth}
                                  date={endDateNum}
                                />
                              }
                              className={calendarFieldClassName + " xs:ml-auto"}
                            />
                          </form>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Trip Map</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {trip && destinationCoords && (
                        <Mapbox
                          center={destinationCoords}
                          lodgingCoords={lodgingCoords}
                          trip={trip}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activities</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Activity
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Collaborators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={cn(
                        collaborators.length && "grid gap-2 grid-cols-3",
                      )}
                    >
                      {collaborators.length ? (
                        collaborators?.map((user) => (
                          <Collaborator key={user.id} user={user} />
                        ))
                      ) : (
                        <p>Invite some travel buddies!</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Invite
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Lodging</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {trip && (
                      <form action={handleEdit}>
                        <EditableDataPair
                          value={trip.lodging_name}
                          property="Lodging"
                          inputs={<DestinationCombobox field="lodging_name" />}
                        />
                      </form>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Remove Trip</CardTitle>
                    <CardDescription>
                      You will no longer be a collaborator on this trip. Others
                      will still be able to access it.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div></div>
                    <Button size="sm" variant="destructive">
                      Remove Trip
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function Collaborator({ user }: { user: Profile }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Avatar>
            <AvatarImage
              alt="Profile image"
              src={user.avatar_url || undefined}
            />
            <AvatarFallback>
              {user?.username ? user?.username[0].toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>{user?.email && user?.email}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ViewTripTemplate;
