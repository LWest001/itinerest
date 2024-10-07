"use client";

import { Check, Edit, X } from "lucide-react";
import { Button, buttonVariants } from "./button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "./input";
import { Label } from "./label";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  property: string;
  value: string;
};

const propertyMap: { [key: string]: string } = {
  "Display name": "username",
  Email: "email",
  Password: "password",
};

function EditableDataPair({ property, value }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const isEditing = edit === property;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    push(`${pathname}?edit=${property}&newValue=${e.target.value}`);
  }

  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col gap-1">
        <Label className="" htmlFor={propertyMap?.[property] || property}>
          {property}
        </Label>
        {isEditing ? (
          <Input
            defaultValue={value}
            onChange={handleChange}
            name={propertyMap?.[property] || property}
          />
        ) : (
          <span className={"text-primary min-h-10"}>{value}</span>
        )}
      </div>
      {isEditing ? (
        <div className="flex gap-1">
          <SaveButton />
          <CancelButton />
        </div>
      ) : (
        <EditButton property={property} />
      )}
    </div>
  );
}

export default EditableDataPair;

const buttonStyles = "aspect-square p-0 w-8 h-8";
const linkButtonStyles = cn(buttonVariants({ variant: "ghost" }), buttonStyles);

function SaveButton() {
  return (
    <Button variant={"ghost"} className={buttonStyles}>
      <Check className="h-4 w-4 text-primary" />
      <span className="sr-only">Save changes</span>
    </Button>
  );
}

function CancelButton() {
  const pathname = usePathname();
  return (
    <Link className={linkButtonStyles} href={pathname}>
      <X className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">Cancel changes</span>
    </Link>
  );
}

export function EditButton({ property }: { property: string }) {
  const pathname = usePathname();
  return (
    <Link className={linkButtonStyles} href={`${pathname}?edit=${property}`}>
      <Edit className="h-4 w-4 text-primary" />
      <span className="sr-only">Edit {property}</span>
    </Link>
  );
}
