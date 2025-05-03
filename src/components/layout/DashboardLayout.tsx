"use client"

import type * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Package, Users, ShoppingCart, DollarSign } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()

  const navItems = [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard Overview",
          icon: LayoutDashboard,
          path: "/dashboard",
        },
        {
          title: "User Management",
          icon: Users,
          path: "/dashboard/users",
        },
        {
          title: "Inventory",
          icon: Package,
          path: "/dashboard/inventory",
        },
        {
          title: "Purchase",
          icon: ShoppingCart,
          path: "/dashboard/purchase",
        },
        {
          title: "Sell",
          icon: DollarSign,
          path: "/dashboard/sell",
        },
        {
          title: "Cash Flow",
          icon: DollarSign,
          path: "/dashboard/transaction",
        },
     

      ],
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="p-4">
              <h1 className="text-2xl font-bold">NonaFamasi</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {navItems.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                          <Link to={item.path}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          {/* <div>

          <SidebarRail />
          </div> */}
        </Sidebar>
        <main className="flex-1  overflow-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
