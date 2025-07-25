import React from 'react'
import { Plus } from 'lucide-react'
import { Button} from '@/components/ui/button'
import { EducationSection } from './_components/education-section'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education Page',
  description: 'App and API for personal data management',
}

export default function Education() {
  return (
    <div id='education' className="section">
      <SectionHeader title='Education' description=''/>
      <EducationSection />
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
        Add Education
      </Button>
    </div>
  )
}