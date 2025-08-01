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
    <div className='ml-2'>
      <Tabs defaultValue={theme} className='w-full '>
        <TabsList className='border-1 border-ring/20 h-8'>
          <TabsTrigger value='light' className=''>
            <span className='' onClick={() => setTheme('light')}>
              <SunMedium/>
            </span>
          </TabsTrigger>
          <TabsTrigger value='dark' className=''>
            <span className='' onClick={() => setTheme('dark')}>
              <Moon />
            </span>
          </TabsTrigger>
          <TabsTrigger value='system' className=''>
            <span className='' onClick={() => setTheme('system')}>
              <Laptop />
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
