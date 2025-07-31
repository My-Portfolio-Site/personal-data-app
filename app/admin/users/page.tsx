import { Metadata } from 'next'

import UsersSection from './_components/users-section'
import {fetchAllUsers } from '@/app/admin/users/actions'
import { User } from '@/schemas/user'
import { getUser } from '@/lib/dal'

export const metadata: Metadata = {
  title: 'Users',
  description: 'App and API for personal data management',
}

export default async function Users() {
  const users = await fetchAllUsers() as User[]
  const currentUser = await getUser()
  return (
    <div id='users' className="px-6 py-2 space-y-6">
      <SectionHeader title='Users' description='Users section' />
      <UsersSection users={users} currentUserId={currentUser?.id || ''} />
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
