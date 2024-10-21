"use client";

import { Check, Edit, X } from "lucide-react";
import { Button, buttonVariants } from "./button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "./input";
import { Label } from "./label";
import Link from "next/link";
import { capitalize, cn } from "@/lib/utils";
import { ReactComponentElement, useMemo } from "react";

type Props = {
  property: string;
  value: string | null;
  inputs?: ReactComponentElement<any> | ReactComponentElement<any>[];
  disabled?: boolean;
  display?: ReactComponentElement<any>;
  className?: string;
  suppressLabel?: boolean;
  withContent?: boolean;
};

const propertyMap: { [key: string]: string } = {
  "Display name": "username",
};

function EditableDataPair({
  property,
  value,
  inputs,
  disabled,
  display,
  className,
  suppressLabel,
  withContent = false,
}: Props) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const isEditing = edit === property;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    replace(`${pathname}?edit=${property}&newValue=${e.target.value}`, {
      scroll: false,
    });
  }

  const content = useMemo(() => {
    if (isEditing) {
      if (!!inputs) {
        return <>{inputs}</>;
      } else {
        return (
          <Input
            defaultValue={value || undefined}
            onChange={handleChange}
            name={propertyMap?.[property] || property}
            id={propertyMap?.[property] || property}
          />
        );
      }
    }

    if (display) {
      return display;
    } else {
      return (
        <span className={"text-primary min-h-10"}>
          {value || `No ${propertyMap?.[property] || property} chosen yet!`}
        </span>
      );
    }
  }, [isEditing, inputs, value, display]);
  return (
    <div
      className={cn(
        `flex w-full justify-between items-center flex-col ${className}`,
        { "gap-2": !suppressLabel },
      )}
    >
      <div className="flex gap-1 w-full items-center">
        <Label
          htmlFor={propertyMap?.[property] || property}
          className={cn({ "sr-only": suppressLabel })}
        >
          {capitalize(property)}
        </Label>
        {!withContent &&
          (isEditing ? (
            <div className="flex gap-1">
              <SaveButton disabled={disabled} />
              <CancelButton />
            </div>
          ) : (
            <EditButton property={property} />
          ))}
      </div>
      <div className={"flex items-center gap-2 w-full"}>
        {content}
        {withContent &&
          (isEditing ? (
            <div className="flex gap-1">
              <SaveButton disabled={disabled} />
              <CancelButton />
            </div>
          ) : (
            <EditButton property={property} />
          ))}
      </div>
    </div>
  );
}

export default EditableDataPair;

const buttonStyles = "aspect-square p-0 w-6 h-6";
const linkButtonStyles = cn(buttonVariants({ variant: "ghost" }), buttonStyles);

function SaveButton({ disabled }: { disabled?: boolean }) {
  return (
    <Button variant={"ghost"} className={buttonStyles} disabled={disabled}>
      <Check className="h-4 w-4 text-primary" />
      <span className="sr-only">Save changes</span>
    </Button>
  );
}

function CancelButton() {
  const pathname = usePathname();
  return (
    <Link className={linkButtonStyles} href={pathname} replace scroll={false}>
      <X className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">Cancel changes</span>
    </Link>
  );
}

export function EditButton({ property }: { property: string }) {
  const pathname = usePathname();
  return (
    <Link
      className={linkButtonStyles}
      href={`${pathname}?edit=${property}`}
      replace
      scroll={false}
    >
      <Edit className="h-4 w-4 text-primary" />
      <span className="sr-only">Edit {property}</span>
    </Link>
  );
}
