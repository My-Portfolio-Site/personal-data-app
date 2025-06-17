"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Award,
  Users,
  FileText,
  Moon,
  Sun,
  Plus,
  Settings,
  LogOut,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const resumeSections = [
  {
    title: "Personal Information",
    url: "/",
    icon: User,
    description: "Basic contact details and summary",
  },
  {
    title: "Experience",
    url: "/experience",
    icon: Briefcase,
    description: "Work history and achievements",
  },
  {
    title: "Education",
    url: "/education",
    icon: GraduationCap,
    description: "Academic background and qualifications",
  },
  {
    title: "Skills",
    url: "/skills",
    icon: Code,
    description: "Technical and soft skills",
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderOpen,
    description: "Portfolio and personal projects",
  },
  {
    title: "Certifications",
    url: "/certifications",
    icon: Award,
    description: "Professional certifications and licenses",
  },
  {
    title: "References",
    url: "/references",
    icon: Users,
    description: "Professional references",
  },
]

// Mock user data
const currentUser = {
  name: "John Smith",
  email: "john.smith@email.com",
  avatar: "/placeholder.svg?height=32&width=32", // You can set this to null to show initials
  initials: "JS",
}

// Loading Sidebar Component
function LoadingSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <Skeleton className="aspect-square size-8 rounded-lg" />
                <div className="flex flex-col gap-1 leading-none">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-24" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

// Loading Header Component
function LoadingHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Skeleton className="h-7 w-7" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-1" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </header>
  )
}

// Loading Content Area Component
function LoadingContentArea() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <Separator />
      <div className="flex-1 rounded-lg border bg-card p-6">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Loading Layout Component
function LoadingLayout() {
  return (
    <SidebarProvider>
      <LoadingSidebar />
      <SidebarInset>
        <LoadingHeader />
        <LoadingContentArea />
      </SidebarInset>
    </SidebarProvider>
  )
}

export function ResumeLayoutWrapper({
  children,
  isLoading = false,
}: {
  children: React.ReactNode
  isLoading?: boolean
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const currentSection = resumeSections.find((section) => section.url === pathname) || resumeSections[0]

  // Show loading layout if explicitly loading
  if (isLoading) {
    return <LoadingLayout />
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <FileText className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Resume Builder</span>
                    <span className="text-xs text-muted-foreground">Professional CV Editor</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Resume Sections</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {resumeSections.map((section) => (
                  <SidebarMenuItem key={section.title}>
                    <SidebarMenuButton asChild isActive={pathname === section.url}>
                      <Link href={section.url} className="flex items-center gap-2">
                        <section.icon className="size-4" />
                        <span>{section.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                      <AvatarFallback className="rounded-lg">{currentUser.initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{currentUser.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                        <AvatarFallback className="rounded-lg">{currentUser.initials}</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{currentUser.name}</span>
                        <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Resume</BreadcrumbLink>
              </BreadcrumbItem>
              {pathname !== "/" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentSection.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{currentSection.title}</h1>
              <p className="text-muted-foreground">{currentSection.description}</p>
            </div>
            {pathname !== "/" && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add{" "}
                {currentSection.title === "Experience"
                  ? "Experience"
                  : currentSection.title === "Education"
                    ? "Education"
                    : currentSection.title === "Skills"
                      ? "Skill"
                      : currentSection.title === "Projects"
                        ? "Project"
                        : currentSection.title === "Certifications"
                          ? "Certification"
                          : currentSection.title === "References"
                            ? "Reference"
                            : "Item"}
              </Button>
            )}
          </div>
          <Separator />
          <div className="flex-1 rounded-lg border bg-card">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
