import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function InputSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <>
      <Skeleton className="w-24 h-4" />
      <Skeleton className={cn("w-96", tall ? "h-14" : "h-10")} />
    </>
  );
}

function Loading() {
  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 flex items-center gap-4 px-4 sm:static h-14 sm:bg-transparent sm:px-6 sm:h-auto">
        <Skeleton className="w-40 h-4" />
      </div>
      <div className="flex w-full max-w-sm items-center gap-5 flex-col m-auto my-6">
        <div className="w-full flex flex-col gap-4">
          <InputSkeleton />
          <InputSkeleton tall />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <Skeleton className="w-24 h-10 m-auto" />
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center m-auto max-w-sm">
        <Skeleton className="w-24 h-10" />
        <Skeleton className="w-24 h-10" />
      </div>
    </div>
  );
}

export default Loading;
