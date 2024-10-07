import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Profile } from "@/global.types";
import EditableDataKV from "@/components/ui/editabledatakv";

type Props = {
  user: Profile | null;
};

function AccountSettingsTemplate({ user }: Props) {
  return (
    <Suspense>
      <div className="flex flex-col sm:gap-4 w-full ">
        <div className="sticky top-0 flex items-center gap-4 px-4 sm:static h-14 sm:bg-transparent sm:px-6 sm:h-auto">
          <Breadcrumbs
            links={[
              { href: "/protected", label: "Home" },
              { href: "/protected/account", label: "Settings" },
            ]}
          />
        </div>
        <div className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href={"/protected"}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-wrap">
                Settings
              </h1>
              <div className="flex items-center gap-2 ml-auto"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <EditableDataKV
                        property="Display name"
                        value={user?.username || ""}
                      />
                      <EditableDataKV property="Prop 2" value={"heck"} />

                      <EditableDataKV property="Prop 3" value={"heckin"} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle></CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle></CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <button>
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src="/placeholder.svg"
                          width="300"
                          priority
                        />
                      </button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div></div>
                    <Button size="sm" variant="destructive"></Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm"></Button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default AccountSettingsTemplate;
