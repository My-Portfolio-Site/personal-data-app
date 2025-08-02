import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import {ReferencesSection} from './_components/references-section'

export const metadata: Metadata = {
  title: 'References Page',
  description: 'App and API for personal data management',
}

export default function Experience() {
  return (
    <div id='experiance' className="flex flex-1 flex-col gap-4 p-6">
      <SectionHeader title='References' description='References section' />
      <Separator />
      <ReferencesSection />
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
        Add Reference
      </Button>
    </div>
  )
}
