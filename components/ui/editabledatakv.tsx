"use client";

import { Check, Edit, X } from "lucide-react";
import { Button } from "./button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "./input";
import { Label } from "./label";

type Props = {
  property: string;
  value: string;
};

const propertyMap: { [key: string]: string } = {
  "Display name": "username",
  Email: "email",
  Password: "password",
};

function EditableDataKV({ property, value }: Props) {
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
    <form className="flex w-full justify-between items-center">
      <div className="flex flex-col gap-1">
        <Label
          className="text-secondary"
          htmlFor={propertyMap?.[property] || property}
        >
          {property}
        </Label>
        {isEditing ? (
          <Input
            defaultValue={value}
            onChange={handleChange}
            name={propertyMap?.[property] || property}
          />
        ) : (
          <span className={"text-primary"}>{value}</span>
        )}
      </div>
      {isEditing ? (
        <div className="flex gap-1">
          <Button
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              push(`${pathname}?edit=${property}`);
            }}
            className="aspect-square p-0 w-8 h-8"
          >
            <Check className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              push(`${pathname}`);
            }}
            className="aspect-square p-0 w-8 h-8"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      ) : (
        <Button
          variant={"ghost"}
          onClick={(e) => {
            e.preventDefault();
            push(`${pathname}?edit=${property}`);
          }}
          className="aspect-square p-0 w-8 h-8"
        >
          <Edit className="h-4 w-4 text-primary" />
        </Button>
      )}
    </form>
  );
}

export default EditableDataKV;
