'use client'
import { Invite } from '@/schemas/invite'
import { SquarePen, Trash2 } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteInvite } from '../actions'
import UpdateInviteForm from './update-invite-form'

export default function DisplayInvites({
  invites,
  triggerRefresh,
}: {
  invites: Invite[]
  triggerRefresh: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete(id: string) {
    setIsLoading(true)
    const result = await deleteInvite(id)
    if ('error' in result) {
      console.log(result.error)
      toast.error(result.error)
      setIsLoading(false)
      return
    }
    toast.success('Invite deleted successfully')
    setIsLoading(false)
    triggerRefresh()
    return
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
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
            className={`border-1 ${color} w-full min-w-xs max-w-sm`}
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
                  triggerRefresh={() => triggerRefresh()}
                  inviteData={{
                    id: invite.id,
                    email: invite.email,
                    role: invite.role,
                  }}
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
