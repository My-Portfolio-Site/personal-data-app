import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import UsersSection from './_components/users-section'

export const metadata: Metadata = {
  title: 'Users',
  description: 'App and API for personal data management',
}

export default function Users() {
  return (
    <div id='users' className="px-6 py-2 space-y-6">
      <SectionHeader title='Users' description='Users section' />
      <UsersSection />
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
