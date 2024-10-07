import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs/breadcrumb";
import { Link } from "@/global.types";
import { Fragment } from "react";

function Breadcrumbs({ links }: { links: Link[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <Fragment key={link.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
