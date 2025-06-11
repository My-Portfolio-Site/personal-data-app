'use client'
import { Invite } from '@/schemas/invite'
import { useEffect, useState } from 'react'
import { fetchAllInvites } from '../actions'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {toast} from 'sonner'

export default function DisplayInvites() {
  const [invites, setInvites] = useState<Invite[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadInvites() {
      const result = await fetchAllInvites()
      if ('error' in result) {
        setError(result.error)
        return
      }
      setInvites(result)
    }
    loadInvites()
  }, [])
  if (!invites) return <div>Loading...</div>

  if (error) {
    toast.error(error)
    return null
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {invites.map((invite) => {
        const color =
          invite.status === 'pending'
            ? 'border-warning'
            : invite.status === 'rejected'
            ? 'border-destructive'
            : 'border-success'
        return (
          <Card key={invite.id} className={`border-1 ${color} p-4`}>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                {invite.email}
              </CardTitle>
              <CardDescription>
                <p>Role: {invite.role}</p>
                <p className='text-sm text-muted-foreground'>
                  Status: {invite.status}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Invited By: {invite.invitedBy}
              </p>
              <p className='text-sm text-muted-foreground'>
                Expires: {new Date(invite.expires).toLocaleDateString()}
              </p>
              <p className='text-sm text-muted-foreground'>
                Created At: {new Date(invite.createdAt).toLocaleDateString()}
              </p>
              {invite.updatedAt && (
                <p className='text-sm text-muted-foreground'>
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
