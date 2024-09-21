import { Trip } from "@/global.types";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

export function CreateTrip({ ...props }) {
  return (
    // <Link
    //   href="/protected/trips/create"
    //   className="flex items-center bg-green-600  text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-full aspect-square h-min p-1"
    // >
    //   <PlusIcon className="h-5" />
    // </Link>
    <Button variant={"secondary"} href="/protected/trips/create" {...props}>
      Start a new trip
    </Button>
  );
}

export function EditTrip({
  id,
  className,
}: {
  id: Trip["id"];
  className?: string;
}) {
  return (
    <Link
      href={`/protected/trips/${id}/edit`}
      className={
        "rounded-bl-lg z-10 h-8 w-8 flex place-items-center justify-center hover:bg-gray-700 !mt-0 " +
        className
      }
    >
      <Pencil className=" text-slate-200 h-4" />
    </Link>
  );
}
