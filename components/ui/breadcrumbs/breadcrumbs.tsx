import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs/breadcrumb";
import { Link } from "@/global.types";
import NextLink from "next/link";
import { Fragment } from "react";

function Breadcrumbs({ links }: { links: Link[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <Fragment key={link.href}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <NextLink href={link.href}>{link.label}</NextLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
