import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import Provider from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { NavLayoutWrapper } from '@/components/nav-layout'

import { getUser } from '@/lib/dal'

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
  const currentUser = await getUser()

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <NavLayoutWrapper currentUser={currentUser}>
            {children}
          </NavLayoutWrapper>
        </Provider>
        <Toaster richColors position='bottom-center' />
      </body>
    </html>
  )
}
