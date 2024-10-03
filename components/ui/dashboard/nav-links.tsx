"use client";

import { GlobeEuropeAfricaIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/protected", icon: HomeIcon },
  { label: "Trips", href: "/protected/trips", icon: GlobeEuropeAfricaIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  {
                    "bg-accent text-accent-foreground transition-colors":
                      isActive,
                  }
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{link.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
}

export function NavLinksMobile() {
  return links.map((link) => (
    <Link
      href={link.href}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    >
      <link.icon className="h-5 w-5" />
      <span>{link.label}</span>
    </Link>
  ));
}