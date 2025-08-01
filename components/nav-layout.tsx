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
  ShieldUser
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
} from '@/components/ui/sidebar'
import { User } from '@/schemas/user'


const userSections = [
  {
    title: 'About Me',
    url: '/aboutme',
    icon: UserIcon,
  },
  {
    title: 'Experience',
    url: '/experience',
    icon: Briefcase,
  },
  {
    title: 'Education',
    url: '/education',
    icon: GraduationCap,
  },
  {
    title: 'Skills',
    url: '/skills',
    icon: Code,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: FolderOpen,
  },
  {
    title: 'Certifications',
    url: '/certifications',
    icon: Award,
  },
  {
    title: 'References',
    url: '/references',
    icon: Users,
  },
]

const adminSections = [
  {
    title: 'Users',
    url: '/admin/users',
    icon: ShieldUser,
  },
  // {
  //   title: 'Invites',
  //   url: '/admin/invites',
  //   icon: MailPlus,
  // },
]
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
  console.log("Path name:", pathname);
  

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
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-white'>
                    <FileText className='size-4' />
                  </div>
                  <div className='flex flex-col gap-0.5 leading-none'>
                    <span className='font-semibold'>Personal Data App</span>
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
          <SidebarGroup>
            <SidebarGroupLabel>Resume Sections</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userSections.map((section) => (
                  <SidebarMenuItem key={section.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.includes(section.url)}
                    >
                      <Link
                        href={section.url}
                        className='flex items-center gap-2'
                        prefetch={false}
                      >
                        <section.icon className='size-4' />
                        <span>{section.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {isAdmin && (
            <SidebarGroup>
              <SidebarGroupLabel>User Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminSections.map((section) => (
                    <SidebarMenuItem key={section.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === section.url}
                      >
                        <Link
                          href={section.url}
                          className='flex items-center gap-2'
                        >
                          <section.icon className='size-4' />
                          <span>{section.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
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
        <div className="">{children}</div>
        {/* <div className='sm:mx-3 my-2 md:mx-6 lg:mx-10 max-w-[780px] w-full'>
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  )
}
