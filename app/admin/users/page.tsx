import { Metadata } from 'next'

import UsersSection from './_components/users-section'
import { fetchAllUsers } from '@/app/admin/users/actions'
import { User } from '@/schemas/user'
import { getUser } from '@/lib/dal'

export const metadata: Metadata = {
  title: 'Users',
  description: 'App and API for personal data management',
}

import { PageHeader, PageContent } from "@/components/page-formatter";

export default async function Users() {
  const users = await fetchAllUsers() as User[]
  const currentUser = await getUser()
  return (
    <section>
      <PageHeader title="Users" />
      <PageContent>
        <UsersSection users={users} currentUserId={currentUser?.id || ''} />
      </PageContent>
    </section>
  )
}

function SectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}
