import { cn } from "@/lib/utils";
import { Label } from "../label";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { uploadAvatar } from "@/app/actions";
import AvatarFormContent from "./avatar-form-content";

export default function UploadButton() {
  return (
    <div className="relative h-0 w-0 p-0 m-0 ml-auto right-4">
      <Dialog>
        <DialogTrigger asChild>
          <Plus
            className={cn(
              "h-5 w-5 absolute bottom-0 left-0 rounded-full border-none  flex items-center justify-center cursor-pointer bg-primary text-secondary-foreground hover:bg-primary/80 text-white"
            )}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload an image</DialogTitle>
          </DialogHeader>
          <form action={uploadAvatar}>
            <AvatarFormContent />
          </form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
