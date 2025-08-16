// 'use client'
import { headers } from 'next/headers'
import { ThemeToggle } from '@/components/theme-toggle'
import { NavUser } from '@/components/nav-user'
// import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  User as UserIcon,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Award,
  Users,
  FileText,
  ShieldUser,
  Bot,
  BriefcaseBusiness,
  UserCircle
} from 'lucide-react'

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { User } from '@/schemas/user'

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


const publicURLs = ['/acceptinvite', '/login']

export async function NavLayoutWrapper({
  children,
  currentUser
}: {
  children: React.ReactNode
  currentUser: User | null
}) {

  // const pathname = usePathname()
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''

  if (publicURLs.includes(pathname)) {
    return (
      <div>
        <div className='absolute right-2 top-2'>
          <ThemeToggle />
        </div>
        {children}
      </div>
    )
  }

  if (!currentUser) {
    console.log("Nav layout returning null.");

    return null;
  }

  const isAdmin = currentUser?.role === 'admin'

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 65)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar variant='inset'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size='lg' asChild>
                <Link href='/' className='flex items-center gap-2'>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
                    {/* <FileText className='size-4' /> */}
                    <svg width="30" height="30" viewBox="0 0 85 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Logo Frame">
                        <g id="Logo">
                          <path id="Vector 3" d="M40.836 66.2022L79.9836 6.54866C80.42 5.88365 79.943 5 79.1476 5H55.926C55.5768 5 55.2528 5.18217 55.0715 5.48058L39.1454 31.6813C39.0503 31.8378 38.9999 32.0175 38.9999 32.2007V65.6536C38.9999 66.6467 40.2911 67.0325 40.836 66.2022Z" fill="#AC6DA6" />
                          <path id="Union" d="M6 6.12871C6 5.52864 6.52951 5.06362 7.12415 5.14406C21.5689 7.09789 26.3455 11.8988 28 27V86.8713C28 87.4714 27.4705 87.9364 26.8758 87.8559C12.4311 85.9021 7.65446 81.1012 6 66V6.12871Z" fill="#2C6397" />
                          <path id="Vector 2" d="M40.0168 86.4511L57.2798 60.1578C57.654 59.5878 58.4764 59.5513 58.8997 60.0859L79.7168 86.3792C80.2358 87.0348 79.7689 88 78.9327 88H40.8528C40.0572 88 39.5802 87.1161 40.0168 86.4511Z" fill="#2CAB7D" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className='flex flex-col gap-0.5 leading-none'>
                    <span className='font-semibold'>Personal App</span>
                    <span className='text-xs text-muted-foreground'>
                      Professional CV Editor
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* Resume Sections */}
          <ResumeNavSection currentPath={pathname} />
          {/* AI Sections */}
          <AINavSection currentPath={pathname} />
          {/* Admin Sections */}
          {isAdmin && (
            <AdminNavSection currentPath={pathname} />
          )}
          <SidebarGroup className="mt-auto">
            <ThemeToggle />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={currentUser} />
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        {children}
        {/* <div className='sm:mx-3 my-2 md:mx-6 lg:mx-10 max-w-[780px] w-full'>
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  )
}

// AI Nav Section
const AINavSection = ({ currentPath }: { currentPath: string }) => {
  const aiNavSection = [
    {
      title: "Chatter",
      url: "/chatter",
      icon: Bot,
      items: [
        {
          title: "Chatter",
          url: "/chatter/chat",
        },
        {
          title: "Upload",
          url: "/chatter/upload"
        },
        {
          title: "History",
          url: "/chatter/history",
        },
        
      ],
    }
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>AI ✨</SidebarGroupLabel>
      <SidebarMenu>
        {aiNavSection.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={currentPath.startsWith(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild
                        isActive={currentPath.startsWith(subItem.url)}
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}



// Admin Nav Section
const AdminNavSection = ({ currentPath }: { currentPath: string }) => {
  const adminNavSection = [
    {
      title: "User Management",
      icon: ShieldUser,
      url: "/admin",
      items: [
        {
          title: "Users",
          url: "/admin/users",
        }
      ]
    }
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarMenu>
        {adminNavSection.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={currentPath.startsWith(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild
                        isActive={currentPath === subItem.url}
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}



// Admin Nav Section
const ResumeNavSection = ({ currentPath }: { currentPath: string }) => {
  const resumeNavSection = [
    {
      title: "Profile",
      icon: UserCircle,
      url: ["/aboutme", "/skills", "/references"],
      items: [
        {
          title: "About Me",
          url: "/aboutme",
        },
        {
          title: "Skills",
          url: "/skills",
        },
        {
          title: "References",
          url: "/references",
        }
      ]
    },
    {
      title: "Professional",
      icon: BriefcaseBusiness,
      url: ["/experience", "/projects", "/certifications"],
      items: [
        {
          title: "Experience",
          url: "/experience",
        },
        {
          title: "Projects",
          url: "/projects",
        },
        {
          title: 'Certifications',
          url: '/certifications',
        }
      ]
    },
    {
      title: "Academic",
      icon: GraduationCap,
      url: ["/education"],
      items: [
        {
          title: "Education",
          url: "/education",
        }
      ]
    }
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarMenu>
        {resumeNavSection.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.url.includes(currentPath)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild
                        isActive={currentPath === subItem.url}
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}