'use client'
import { Suspense } from 'react';
import { handleSignOut } from '@/app/login/actions'
import { ThemeToggle } from '@/components/theme-toggle'
import type * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Award,
  Users,
  FileText,
  Settings,
  LogOut,
  ShieldUser,
  MailPlus,
} from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { CurrentUser } from '@/schemas/user'

const userSections = [
  {
    title: 'About Me',
    url: '/aboutme',
    icon: User,
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
  {
    title: 'Invites',
    url: '/admin/invites',
    icon: MailPlus,
  },
]
const publicURLs = ['/acceptinvite', '/login']

export function NavLayoutWrapper({
  children,
  currentUser
}: {
  children: React.ReactNode
  currentUser: CurrentUser | null
}) {

  const pathname = usePathname()
  if (publicURLs.includes(pathname)) {
    return <div className='max-w-4xl'>{children}</div>
  }

  const isAdmin = currentUser?.role === 'admin'

  const currentSection =
    userSections.find((section) => section.url === pathname) ||
    adminSections.find((section) => section.url === pathname) ||
    userSections[0]

  const isAdminSection = adminSections.some((section) => section.url === pathname)

  return (
    <SidebarProvider>
      <Sidebar className='border-r'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size='lg' asChild>
                <Link href='/' className='flex items-center gap-2'>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
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
        </SidebarContent>
        <Separator />
        <CurrentUserOptions currentUser={currentUser} />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'></BreadcrumbLink>
              </BreadcrumbItem>
              {isAdmin && isAdminSection && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Admin</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {pathname !== '/' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentSection.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <div className='ml-auto'>
            <CurrentUserOptions currentUser={currentUser} minimal />
          </div>
          <ThemeToggle />
        </header>
        <div className='flex-1 flex justify-center'>
          <div className='mx-0 md:mx-10 lg:mx-16 w-full'>
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function CurrentUserOptions({
  minimal = false,
  currentUser,
}: {
  minimal?: boolean
  currentUser: CurrentUser | null
}) {
  if(!currentUser) return null;
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-10 p-0'
              >
                <Avatar className='size-10 rounded-lg border'>
                  <AvatarImage src={currentUser.image} alt={currentUser.name} />
                  <AvatarFallback className='rounded-lg border'>
                    {currentUser.initials}
                  </AvatarFallback>
                </Avatar>
                {!minimal && (
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>
                      {currentUser.name}
                    </span>
                    <span className='truncate text-xs text-muted-foreground'>
                      {currentUser.email}
                    </span>
                  </div>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side='bottom'
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      src={currentUser.image}
                      alt={currentUser.name}
                    />
                    <AvatarFallback className='rounded-lg'>
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>
                      {currentUser.name}
                    </span>
                    <span className='truncate text-xs text-muted-foreground'>
                      {currentUser.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSignOut()}>
                <LogOut className='mr-2 h-4 w-4' />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}


function CurrentUserOptionsSkeleton({ minimal = false }: { minimal?: boolean }) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            className='h-10 p-0 animate-pulse bg-muted rounded-lg'
          >
            <div className='size-10 rounded-lg bg-muted border'></div>
            {!minimal && (
              <div className='grid flex-1 text-left text-sm leading-tight ml-2'>
                <span className='h-4 w-24 bg-muted rounded'></span>
                <span className='h-3 w-32 bg-muted rounded mt-1'></span>
              </div>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}