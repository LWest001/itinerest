"use client";

import { ChangeEvent, useRef, useState } from "react";
import { DialogClose } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";

import { Button } from "../button";
import { Upload } from "lucide-react";
import { useDebounceEffect } from "@/lib/useDebounceEffect";
import { canvasPreview } from "@/utils/canvasPreview";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  async function onDownloadCropClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

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
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
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

  return (
    <div className="flex flex-col gap-3">
      <Button variant={"outline"} asChild className="max-w-fit flex gap-2">
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
        disabled={!url}
        className=""
      >
        <img
          src={url || "/placeholder.svg"}
          alt="Preview"
          className="w-full"
          ref={imgRef}
        />
      </ReactCrop>
      <DialogClose asChild className="hidden">
        <input
          type="submit"
          value="Upload"
          ref={submitRef}
          className="hidden"
        />
      </DialogClose>
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
            <Button disabled={!completedCrop} onClick={onDownloadCropClick}>
              Done
            </Button>
          )}
        </div>
      </>
    </div>
  );
}

export default AvatarFormContent;
