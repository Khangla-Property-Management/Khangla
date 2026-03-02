"use client";

import * as React from "react";
import {
  Album,
  BookOpen,
  Bot,
  Frame,
  Home,
  Landmark,
  LifeBuoy,
  Lock,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";
import Image from "next/image";

import { NavMain } from "../components/nav-main";
import { NavProjects } from "../components/nav-projects";
import { NavSecondary } from "../components/nav-secondary";
import { NavUser } from "../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Homes",
      url: "/homes",
      icon: Home,
      isActive: true,
    },
    {
      title: "Owner",
      url: "/owner",
      icon: Users,
    },
    {
      title: "Booking",
      url: "/booking",
      icon: Album,
    },
    {
      title: "About Us",
      url: "/about-us",
      icon: Landmark,
    },
  ],
  projects: [
    {
      name: "Account Security",
      url: "#",
      icon: Lock,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/home">
                <div className="flex aspect-square size-14 items-center justify-center rounded-lg overflow-hidden">
                  <Image
                    src="/khangla-logo.png"
                    alt="Company logo"
                    width={56}
                    height={35}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-base font-semibold">
                    Khangla
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Property Management
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
