"use client";

import { GlobeEuropeAfricaIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/protected", icon: HomeIcon },
  { name: "Trips", href: "/protected/trips", icon: GlobeEuropeAfricaIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        const LinkIcon = link.icon;
        const classNames = clsx({
          "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-background p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3 dark:hover:bg-slate-800 dark:hover:text-inherit hover:bg-sky-100 hover:text-blue-600":
            true,
          "dark:bg-slate-800 dark:text-inherit bg-sky-100 text-blue-600":
            isActive,
        });

        return (
          <Link key={link.name} href={link.href} className={classNames}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
