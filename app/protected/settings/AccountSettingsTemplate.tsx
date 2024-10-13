"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Profile } from "@/global.types";
import EditableDataPair from "@/components/ui/editable-data-pair";
import Loading from "./loading";
import { updateProfile } from "@/app/actions";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UploadButton from "@/components/ui/upload-button/upload-button";

type Props = {
  user: Profile | null;
};

async function AccountSettingsTemplate({ user }: Props) {
  return (
    <Suspense fallback={<Loading />}>
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
            <div className="grid gap-4  md:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 md:col-span-2 lg:gap-8">
                <Card className="p-4 bg-secondary">
                  <div className="flex items-center gap-5 mb-4">
                    <div className="w-fit ">
                      <Avatar className="w-16 h-16 ">
                        <AvatarImage
                          alt="Profile image"
                          src={user?.avatar_url || undefined}
                        />
                        <AvatarFallback>
                          {user?.username
                            ? user?.username[0].toUpperCase()
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <UploadButton />
                    </div>
                    <span className="text-xl font-semibold">
                      {user?.username}
                    </span>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form action={updateProfile}>
                        <div className="flex flex-col gap-3">
                          <EditableDataPair
                            property="Display name"
                            value={user?.username || ""}
                          />
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Hi, {user?.username}!</CardTitle>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default AccountSettingsTemplate;
