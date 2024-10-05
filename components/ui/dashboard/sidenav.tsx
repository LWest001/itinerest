import NavLinks, { NavLinksMobile } from "@/components/ui/dashboard/nav-links";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { LogOut, PanelLeft, Settings } from "lucide-react";
import Link from "next/link";
import { TooltipContent, TooltipProvider } from "../tooltip";
import { signOutAction } from "@/app/actions";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { Button } from "../button";
import Image from "next/image";
import icon from "@/app/icon.svg";

export default function SideNav() {
  return (
    <aside className="fixed inset-y-0 left-0 top-16 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-center gap-4 px-2 py-4 ">
          <NavLinks />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sign out</span>
                </button>
              </form>
            </TooltipTrigger>
            <TooltipContent side="right">Sign out</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}

export function SideNavMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Image
              className="h-5 w-5 transition-all group-hover:scale-110"
              src={icon}
              alt="Itinerest logo"
            />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <NavLinksMobile />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
