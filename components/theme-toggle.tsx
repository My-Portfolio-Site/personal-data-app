'use client'

import * as React from 'react'
import { Moon, SunMedium, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className='m-1 md:m-3'>
      <Tabs defaultValue={theme} className='w-full'>
        <TabsList className='h-7'>
          <TabsTrigger value='light' className='px-[2px] py-[1px]'>
            <span className='' onClick={() => setTheme('light')}>
              <SunMedium size={16} />
            </span>
          </TabsTrigger>
          <TabsTrigger value='dark' className='px-[2px] py-[1px]'>
            <span className='' onClick={() => setTheme('dark')}>
              <Moon size={16} />
            </span>
          </TabsTrigger>
          <TabsTrigger value='system' className='px-[2px] py-[1px]'>
            <span className='' onClick={() => setTheme('system')}>
              <Laptop size={16} />
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
