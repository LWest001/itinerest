import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Plus } from "lucide-react";
import { Input } from "./input";

export default function UploadButton() {
  return (
    <div className="relative h-0 w-0 p-0 m-0 ml-auto right-4">
      <Label
        htmlFor="avatar"
        className={cn(
          "h-5 w-5 absolute bottom-0 left-0 rounded-full border-none  flex items-center justify-center cursor-pointer bg-primary text-secondary-foreground hover:bg-primary/80 text-white"
        )}
      >
        <Plus />
      </Label>
      <Input
        className="hidden"
        type="file"
        id="avatar"
        accept=".png,.jpg,.gif,.jpeg,.webp"
        name="avatar"
      />
    </div>
  );
}
