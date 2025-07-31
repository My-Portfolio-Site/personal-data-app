'use client'
import { Invite, UpdateInvite } from '@/schemas/invite'
import { useEffect, useState } from 'react'
import { RefreshCw, MailPlus, SquarePen, Trash2 } from 'lucide-react'
import { deleteInvite, updateInvite, createInvite } from '@/app/admin/invites/actions'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import UpdateInviteForm from '@/app/admin/invites/_components/update-invite-form'
import Loading from '@/app/admin/invites/loading'
import ShowSectionError from '@/components/section-show-error'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card'

export default function InvitesTab({invites}: { invites: Invite[] }) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  async function handleUpdateInvite(data: UpdateInvite) {
    setIsLoading(true)
    const result = await updateInvite(data)
    if (!result.success) {
      toast.error(result.message || 'Failed to update invite')
      setIsLoading(false)
      return
    }
    toast.success('Invite updated successfully')
    setIsLoading(false)
  } 

  async function handleDelete(id: string) {
    setIsLoading(true)
    const result = await deleteInvite(id)
    if (!result.success) {
      toast.error(result.message)
      setIsLoading(false)
      return
    }
    toast.success('Invite deleted successfully')
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ShowSectionError sectionTitle='Invites' error={error} sectionPath='/admin/invites' goBackTo='/admin/invites' />
  }

  return (
    <div className='flex flex-wrap gap-5'>
      {invites.map((invite) => {
        const color =
          invite.status === 'pending'
            ? 'border-warning'
            : invite.status === 'rejected'
              ? 'border-destructive'
              : 'border-success'
        return (
          <Card
            key={invite.id}
            className={`border-1 ${color} w-full min-w-xs max-w-md`}
          >
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                {invite.email}
              </CardTitle>
              <CardDescription>
                <p className='capitalize text-primary font-medium'>
                  {invite.role} | {invite.status}
                </p>
              </CardDescription>
              <CardAction>
                <UpdateInviteForm
                  isLoading={isLoading}
                  inviteData={{
                    id: invite.id,
                    email: invite.email,
                    role: invite.role,
                  }}
                  handleUpdateInvite={handleUpdateInvite}
                />

                <Button
                  onClick={() => handleDelete(invite.id)}
                  disabled={isLoading}
                  variant='secondary'
                  size='icon'
                  className='size-7 hover:bg-secondary-hover'
                >
                  <Trash2 color='#ff7070' size={16} strokeWidth={3} />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className='text-sm '>Invited By: {invite.invitedBy}</p>
              <p className='text-sm '>
                Expires: {new Date(invite.expires).toLocaleDateString()}
              </p>
              <p className='text-sm '>
                Created At: {new Date(invite.createdAt).toLocaleDateString()}
              </p>
              {invite.updatedAt && (
                <p className='text-sm '>
                  Updated At: {new Date(invite.updatedAt).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
