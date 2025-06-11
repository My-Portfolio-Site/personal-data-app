import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchAllInvites, fetchAllUsers } from './actions'
import DisplayInvites from '@/app/admin/_components/display-invites'
import DisplayUsers from '@/app/admin/_components/display-users'

export const metadata: Metadata = {
  title: 'Admin Page',
  description: 'App and API for personal data management',
}

export default async function AdminPanel() {

  return (
    <div className='px-10 py-8'>
      <Tabs defaultValue='invites' className='w-full'>
        <TabsList>
          <TabsTrigger value='users'>Users</TabsTrigger>
          <TabsTrigger value='invites'>Invites</TabsTrigger>
          <TabsTrigger value='sessions'>Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value='users'>
          <DisplayUsers />
        </TabsContent>
        <TabsContent value='invites'>
          <DisplayInvites />
        </TabsContent>
      </Tabs>
    </div>
  )
}
