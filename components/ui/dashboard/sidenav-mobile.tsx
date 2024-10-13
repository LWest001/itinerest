"use client";

import { NavLinksMobile } from "@/components/ui/dashboard/nav-links";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { Button } from "../button";
import Image from "next/image";
import icon from "@/app/icon.svg";
import { useRef } from "react";

export function SideNavMobile() {
  const closePanelRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    closePanelRef.current?.click();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="sm:hidden"
          ref={closePanelRef}
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:text-base"
            onClick={handleClick}
          >
            <Image
              className="h-5 w-5 transition-all group-hover:scale-110"
              src={icon}
              alt="Itinerest logo"
            />
            <span className="sr-only">Itinerest</span>
          </Link>
          <NavLinksMobile onClick={handleClick} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
