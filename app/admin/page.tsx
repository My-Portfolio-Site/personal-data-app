import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UsersTab from '@/app/admin/_components/users-tab'
import InvitesTab from '@/app/admin//_components/invites-tab'


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
          <UsersTab />
        </TabsContent>
        <TabsContent value='invites'>
          <InvitesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
