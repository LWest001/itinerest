"use client";

import { GlobeEuropeAfricaIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "next-themes";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/protected", icon: HomeIcon },
  { name: "Trips", href: "/protected/trips", icon: GlobeEuropeAfricaIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-background p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
                "bg-slate-800 text-inherit":
                  pathname === link.href && theme === "dark",
                "hover:bg-slate-800 hover:text-inherit": theme === "dark",
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
