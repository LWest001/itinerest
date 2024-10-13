import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const TextSkeleton = () => <Skeleton className="w-40 h-6" />;

function Loading() {
  return (
    <div className="flex flex-col sm:gap-4 w-full">
      <div className="sticky top-0 flex items-center gap-4 px-4 sm:static h-14 sm:bg-transparent sm:px-6 sm:h-auto">
        <Skeleton className="w-40 h-4" />
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
            <TextSkeleton />
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>

                  <TextSkeleton />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-5 items-center select-none">
                    <Skeleton className="w-20 h-16" />
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="w-20 h-16" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Lodging</CardTitle>
                  <TextSkeleton />
                </CardHeader>
                <CardContent></CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                  <TextSkeleton />
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="justify-center border-t p-4 flex gap-2">
                  <Skeleton className="w-6 h-6" />
                  <Skeleton className="w-20 h-6" />
                </CardFooter>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Collaborators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 grid-cols-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button size="sm" variant="ghost" className="gap-1">
                    <Skeleton className="w-6 h-6" />
                    <TextSkeleton />
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Trip Map</CardTitle>

                  <TextSkeleton />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Skeleton className="w-60 h-60" />
                  </div>
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
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
