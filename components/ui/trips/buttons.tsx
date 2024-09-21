import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateTrip() {
  return (
    <Link
      href="/protected/trips/create"
      className="flex items-center bg-green-600  text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-full aspect-square h-min p-1"
    >
      <PlusIcon className="h-5" />
    </Link>
  );
}
