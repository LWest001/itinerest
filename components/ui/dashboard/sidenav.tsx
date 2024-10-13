import NavLinks from "@/components/ui/dashboard/nav-links";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { TooltipContent, TooltipProvider } from "../tooltip";
import { signOutAction } from "@/app/actions";

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
                href="/protected/settings"
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
