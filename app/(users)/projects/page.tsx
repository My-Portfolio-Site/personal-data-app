import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import {ProjectsSection} from './_components/projects-section'

export const metadata: Metadata = {
  title: 'Experiance Page',
  description: 'App and API for personal data management',
}

export default function Projects() {
  return (
    <div id='experiance' className="flex flex-1 flex-col gap-4 p-6">
      <SectionHeader title='Experiance' description='Projects section' />
      <Separator />
      <ProjectsSection />
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
      <Button>
        <Plus className='w-4 h-4 mr-2' />
        Add Projects
      </Button>
    </div>
  )
}
