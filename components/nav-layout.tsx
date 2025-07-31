
import { headers } from 'next/headers'
import { ThemeToggle } from '@/components/theme-toggle'
import UserNotVerified from '@/components/user-not-verified'
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

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
import { LoggedUserOptions } from '@/components/logged-user-options'


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
        <div className='absolute right-0'>
          <ThemeToggle />
        </div>
        {children}
      </div>
    )
  }

  if (!currentUser) {
    return null;
  }

  if (!currentUser.userVerified) {
    return (
      <div className=''>
        <div className='absolute right-0 flex m-3'>
          <ThemeToggle />
          <LoggedUserOptions currentUser={currentUser} />
        </div>
        <UserNotVerified />
      </div>
    )
  }

  const isAdmin = currentUser?.role === 'admin'

  const currentSections = pathname.split('/').filter(section => section !== "").map((section, index, array) => {
    // Build the URL using original path segments (not capitalized titles)
    const url = "/" + array.slice(0, index + 1).join("/");

    return {
      title: section.charAt(0).toUpperCase() + section.slice(1),
      url: url
    };
  });
  if (pathname !== "/") {
    currentSections.unshift({
      title: "Home",
      url: "/"
    });
  }

  // const isAdminSection = adminSections.some((section) => section.url === pathname)

  return (
    <SidebarProvider>
      <Sidebar className='border-r'>
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
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              {currentSections.map((section, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem key={index}>
                    {currentSections.at(-1)?.title === section.title ? (
                      <BreadcrumbPage>{section.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={section.url}>{section.title}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))
              }
            </BreadcrumbList>
          </Breadcrumb>
          <div className='ml-auto'>
            <LoggedUserOptions currentUser={currentUser} />
          </div>
          <ThemeToggle />
        </header>
        <div className='flex-1 flex justify-center'>
          <div className='sm:mx-3 my-2 md:mx-6 lg:mx-10 max-w-[780px] w-full'>
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
