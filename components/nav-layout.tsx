'use client'
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

const resumeSections = [
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

export function NavLayoutWrapper({
  children,
  currentUser,
}: {
  children: React.ReactNode
  currentUser: CurrentUser
}) {
  const pathname = usePathname()

  const currentSection =
    resumeSections.find((section) => section.url === pathname) ||
    resumeSections[0]

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
                    <span className='font-semibold'>Resume Builder</span>
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
                {resumeSections.map((section) => (
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
                <BreadcrumbLink href='/'>Resume</BreadcrumbLink>
              </BreadcrumbItem>
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
        <div className='flex-1'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function CurrentUserOptions({
  currentUser,
  minimal = false,
}: {
  currentUser: CurrentUser
  minimal?: boolean
}) {

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
              <DropdownMenuItem>
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
