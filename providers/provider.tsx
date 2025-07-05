"use client"
import ThemeProvider from "@/providers/theme-provider"
import TanstackProvider from "@/providers/tanstack-provider"

export default function Provider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <TanstackProvider>{children}</TanstackProvider>
    </ThemeProvider>
  )
}