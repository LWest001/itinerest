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
import { EditTrip } from "@/components/ui/trips/buttons";
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
import { DestinationCombobox } from "@/components/ui/trips/inputs";

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
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href={"/protected/trips"}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-wrap">
                {trip?.name}
              </h1>
              {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                  In stock
                </Badge> */}
              <div className="flex items-center gap-2 ml-auto">
                {trip && <EditTrip id={trip.id} />}
              </div>
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
                          input={<DestinationCombobox field="destination" />}
                        />
                      </form>
                    )}
                    <div className="flex gap-5 items-center select-none">
                      <CalendarBox month={startDateMonth} date={startDateNum} />
                      <ArrowRight className="h-6 w-6" strokeWidth={3} />
                      <CalendarBox month={endDateMonth} date={endDateNum} />
                    </div>
                    {/* <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            className="w-full"
                            defaultValue="Gamer Gear Pro Controller"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                            className="min-h-32"
                          />
                        </div>
                      </div> */}
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
                    {/* <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="status">Status</Label>
                          <Select>
                            <SelectTrigger id="status" aria-label="Select status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Active</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        </div> */}
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
                    {trip?.lodging_name}
                    {/* <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="accessories">
                                Accessories
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="subcategory">
                            Subcategory (optional)
                          </Label>
                          <Select>
                            <SelectTrigger
                              id="subcategory"
                              aria-label="Select subcategory"
                            >
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="t-shirts">T-Shirts</SelectItem>
                              <SelectItem value="hoodies">Hoodies</SelectItem>
                              <SelectItem value="sweatshirts">
                                Sweatshirts
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div> */}
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
            {/* <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div> */}
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
