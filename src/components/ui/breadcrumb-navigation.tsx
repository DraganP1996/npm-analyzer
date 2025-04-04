import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

export type BreadCrumbNavigationItem = {
  title: string;
  href: string;
};

type BreadCrumbNavigationProps = {
  items: BreadCrumbNavigationItem[];
};

export const BreadCrumbNavigation = ({ items }: BreadCrumbNavigationProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          if (index !== items.length - 1) {
            return (
              <Fragment key={"breadcrumb_navigation_" + item.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          }

          return (
            <BreadcrumbItem key={"breadcrumb_navigation_" + item.href}>
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
