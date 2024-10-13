"use client";

import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { DialogClose } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { Button } from "../button";
import { Loader2, Upload } from "lucide-react";
import { useDebounceEffect } from "@/lib/useDebounceEffect";
import { canvasPreview } from "@/lib/canvasPreview";
import { cn } from "@/lib/utils";

function AvatarFormContent() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCrop(undefined);
    setUrl(null);
    setCompletedCrop(undefined);
    if (!e.target.files) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUrl(url);
  };

  const [url, setUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    startTransition(async () => {
      e.preventDefault();
      const image = imgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!image || !previewCanvas || !completedCrop) {
        throw new Error("Crop canvas does not exist");
      }

      const offscreen = new OffscreenCanvas(250, 250);
      const ctx = offscreen.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }

      ctx.drawImage(
        previewCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height,
        0,
        0,
        offscreen.width,
        offscreen.height
      );

      const blob = await offscreen.convertToBlob({
        type: "image/jpeg",
      });

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);

      const file = new File([blob], "avatar.png", { type: "image/png" });

      if (inputRef && inputRef?.current?.files && submitRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;
        submitRef.current.click();
      }
    });
    setIsSubmitted(true);
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  useEffect(() => {
    if (closeRef.current && isSubmitted && !isPending) {
      closeRef.current.click();
    }
  }, [closeRef.current, isPending, isSubmitted]);

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant={"outline"}
        asChild
        className={cn(
          "max-w-fit flex gap-2",
          isPending && "pointer-events-none opacity-50"
        )}
        disabled={isPending}
      >
        <Label htmlFor="avatar">
          Select an image <Upload size={"1rem"} />
        </Label>
      </Button>
      <Input
        className="hidden"
        type="file"
        id="avatar"
        accept=".png,.jpg,.gif,.jpeg,.webp"
        name="avatar"
        onChange={handleChange}
        ref={inputRef}
      />
      <ReactCrop
        circularCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={1}
        disabled={!url || isPending}
        className=""
      >
        <img
          src={url || "/placeholder.svg"}
          alt="Preview"
          className="w-full"
          ref={imgRef}
        />
      </ReactCrop>
      <input type="submit" value="Upload" ref={submitRef} className="hidden" />
      <DialogClose className="hidden" ref={closeRef} />

      <>
        <div className="hidden">
          {!!completedCrop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          )}
        </div>
        <div>
          {!completedCrop && url && <p>Click and drag to crop</p>}
          {completedCrop && (
            <Button disabled={!completedCrop || isPending} onClick={onSubmit}>
              {isPending ? <Loader2 className="animate-spin" /> : "Done"}
            </Button>
          )}
        </div>
      </>
    </div>
  );
}

export default AvatarFormContent;
