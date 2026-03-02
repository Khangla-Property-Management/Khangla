"use client";

import * as React from "react";
import { AppSidebar } from "../app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Page({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
    const isAuthRoute = ["/login", "/signup"].includes(pathname);

  if (isAuthRoute) {
    return <main className="min-h-svh w-full">{children}</main>;
  }
  
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg, idx, arr) => ({
      label: decodeURIComponent(seg.replace(/-/g, " ")).replace(/\b\w/g, (c) =>
        c.toUpperCase()
      ),
      href: "/" + arr.slice(0, idx + 1).join("/"),
      isLast: idx === arr.length - 1,
    }));
  const currentTitle = segments.length
    ? segments[segments.length - 1].label
    : "Home";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((seg, i) => (
                  <React.Fragment key={`item-${seg.href}`}>
                    <BreadcrumbItem
                      className={i === 0 ? "hidden md:block" : undefined}
                    >
                      {seg.isLast ? (
                        <BreadcrumbPage className="text-base font-muted-foreground">
                          {seg.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          className="text-sm md:text-base"
                          href={seg.href}
                        >
                          {seg.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!seg.isLast && (
                      <BreadcrumbSeparator
                        className={i === 0 ? "hidden md:block" : undefined}
                      />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children ? (
            <div className="flex-1">{children}</div>
          ) : (
            <div className="bg-muted/50 min-h-[40vh] flex-1 rounded-xl md:min-h-min" />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
