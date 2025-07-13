import { Metadata } from 'next'

import InvitesSection from './_components/invites-section'
import CreateInviteForm from '@/app/admin/invites/_components/create-invite-form'
import { fetchAllInvites } from '@/app/admin/invites/actions'
import { Invite } from '@/schemas/invite'

export const metadata: Metadata = {
  title: 'Invites',
  description: 'App and API for personal data management',
}

export default async function Invites() {
  const invites = await fetchAllInvites() as Invite[]
  return (
    <div id='invites' className="px-6 py-2 space-y-6">
      <SectionHeader title='Invites' description='Invites section' />
      <InvitesSection invites={invites} />
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

      <CreateInviteForm />
    </div>
  )
}
