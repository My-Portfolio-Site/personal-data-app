import React from 'react'
import { Plus } from 'lucide-react'
import { Button} from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills Page',
  description: 'App and API for personal data management',
}

import { SkillsSection } from './_components/skills-section'
export default function Skills() {
  return (
    <div id='experiance' className="flex flex-1 flex-col gap-4 p-6">
      <SectionHeader title='Skills' description=''/>
       <Separator />
      <SkillsSection />
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
        Add Certification
      </Button>
    </div>
  )
}