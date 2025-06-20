import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { NavLayoutWrapper } from '@/components/nav-layout'
import { CurrentUser } from '@/schemas/user'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Personal Data App',
  description: 'App and API for personal data management',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  let currentUser

  if (!session?.user) {
    currentUser = {
      id: 'jabjawi8w8992',
      name: 'John Smith',
      email: 'john.smith@email.com',
      image: '',
      initials: 'JS',
      role: 'admin',
    } as CurrentUser
  } else {
    const initials =
      (session?.user?.name ?? "Not Available")
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()

    currentUser = { ...session?.user, initials } as CurrentUser
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <NavLayoutWrapper currentUser={currentUser}>
            {children}
          </NavLayoutWrapper>
        </ThemeProvider>
        <Toaster richColors position='bottom-center' />
      </body>
    </html>
  )
}
