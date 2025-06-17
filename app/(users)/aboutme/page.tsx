import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import {AboutMeSection} from './_components/aboutme-section'

export const metadata: Metadata = {
  title: 'About Me Page',
  description: 'App and API for personal data management',
}

export default function AboutMe() {
  return (
    <div id='experiance' className="flex flex-1 flex-col gap-4 px-6 py-2">
      <SectionHeader title='About Me' description='AboutMe section' />
      <AboutMeSection />
    </div>
  )
}

function SectionHeader({title, description}: {title: string, description: string}) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}
