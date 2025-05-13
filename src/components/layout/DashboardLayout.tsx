"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Package, Users, ShoppingCart, DollarSign, BadgeDollarSign, Pill, Shield, AlertTriangle, FileCode, Database, Lock, Globe, Bug, Settings, Moon, Sun, ChevronRight, LogOut } from 'lucide-react'

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
  SidebarFooter,
  SidebarMenuBadge
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("main")

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const navItems = [
    {
      id: "main",
      title: "Main",
      items: [
        {
          title: "Dashboard Overview",
          icon: LayoutDashboard,
          path: "/dashboard",
          color: "text-purple-500",
          bgColor: "bg-purple-100 dark:bg-purple-900/20",
          borderColor: "group-hover:border-purple-500",
          notifications: 0
        },
        {
          title: "Scan Sessions",
          icon: Shield,
          path: "/dashboard/inventory",
          color: "text-blue-500",
          bgColor: "bg-blue-100 dark:bg-blue-900/20",
          borderColor: "group-hover:border-blue-500",
          notifications: 3
        }
      ],
    },
    {
      id: "vulnerabilities",
      title: "Vulnerabilities",
      items: [
        {
          title: "XSS Detection",
          icon: FileCode,
          path: "#/dashboard/xss",
          color: "text-red-500",
          bgColor: "bg-red-100 dark:bg-red-900/20",
          borderColor: "group-hover:border-red-500",
          notifications: 2
        },
        {
          title: "SQL Injection",
          icon: Database,
          path: "#/dashboard/sql-injection",
          color: "text-orange-500",
          bgColor: "bg-orange-100 dark:bg-orange-900/20",
          borderColor: "group-hover:border-orange-500",
          notifications: 0
        },
        {
          title: "Authentication",
          icon: Lock,
          path: "#/dashboard/auth-issues",
          color: "text-green-500",
          bgColor: "bg-green-100 dark:bg-green-900/20",
          borderColor: "group-hover:border-green-500",
          notifications: 0
        },
        {
          title: "CSRF Protection",
          icon: Globe,
          path: "#/dashboard/csrf",
          color: "text-yellow-500",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
          borderColor: "group-hover:border-yellow-500",
          notifications: 1
        },
        {
          title: "Security Bugs",
          icon: Bug,
          path: "#/dashboard/bugs",
          color: "text-pink-500",
          bgColor: "bg-pink-100 dark:bg-pink-900/20",
          borderColor: "group-hover:border-pink-500",
          notifications: 0
        }
      ],
    },
    {
      id: "settings",
      title: "Settings",
      items: [
        {
          title: "Preferences",
          icon: Settings,
          path: "#/dashboard/settings",
          color: "text-gray-500",
          bgColor: "bg-gray-100 dark:bg-gray-800/40",
          borderColor: "group-hover:border-gray-500",
          notifications: 0
        }
      ],
    }
  ]

  return (
    <SidebarProvider defaultOpen={!isCollapsed} onOpenChange={setIsCollapsed}>
      <div className="flex h-screen w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="pb-0">
            <div className="p-4 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SecureShield</h1>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 rounded-md bg-muted/50">
                <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                  Pro Plan
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View plan details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {navItems.map((section) => (
              <SidebarGroup 
                key={section.id} 
                className={cn(
                  "transition-all duration-200",
                  activeSection === section.id ? "opacity-100" : "opacity-80 hover:opacity-100"
                )}
                onClick={() => setActiveSection(section.id)}
              >
                <SidebarGroupLabel className="text-sm font-medium">{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.path} className="group">
                        <SidebarMenuButton 
                          asChild 
                          isActive={location.pathname === item.path}
                          className={cn(
                            "transition-all duration-200 border-l-2 border-transparent",
                            item.borderColor,
                            location.pathname === item.path && "border-l-2 !border-current"
                          )}
                        >
                          <Link to={item.path} className="relative">
                            <span className={cn(
                              "absolute inset-0 opacity-0 group-hover:opacity-10 rounded-md transition-opacity",
                              item.bgColor
                            )} />
                            <span className={cn(
                              "flex items-center justify-center rounded-md p-1 mr-2",
                              item.bgColor,
                              item.color
                            )}>
                              <item.icon className="size-4" />
                            </span>
                            <span>{item.title}</span>
                            
                            {item.notifications > 0 && (
                              <SidebarMenuBadge className={cn(
                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                                location.pathname === item.path && "bg-white/20 text-white"
                              )}>
                                {item.notifications}
                              </SidebarMenuBadge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter className="border-t border-border mt-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Dark Mode</span>
                  {isDarkMode ? (
                    <Moon className="h-4 w-4 text-blue-400" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={setIsDarkMode}
                  className={cn(
                    isDarkMode ? "bg-blue-600" : "bg-orange-400"
                  )}
                />
              </div>
              
              <div className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-muted/50 transition-colors">
                <Avatar className="h-8 w-8 border-2 border-primary/10">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
          {/* <SidebarRail /> */}
        </Sidebar>
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background to-muted/30">{children}</main>
      </div>
    </SidebarProvider>
  )
}
