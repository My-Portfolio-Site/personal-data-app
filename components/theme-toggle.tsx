'use client'

import * as React from 'react'
import { Moon, SunMedium, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className='fixed top-0 right-0 m-3'>
      <Tabs defaultValue='system' className='w-full' onChange={(value) => console.log(value)}>
        <TabsList className='h-7'>

          <TabsTrigger value='light' className='px-[2px] py-[1px]'>
            <span className="" onClick={() => setTheme('light')}>
              <SunMedium size={16}/>
            </span>
          </TabsTrigger>
          <TabsTrigger value='dark' className='px-[2px] py-[1px]'>
            <span className="" onClick={() => setTheme('dark')}>
              <Moon size={16}/>
            </span>
          </TabsTrigger>
          <TabsTrigger value='system' className='px-[2px] py-[1px]'>
            <span className="" onClick={() => setTheme('system')}>
              <Laptop size={16}/>
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
