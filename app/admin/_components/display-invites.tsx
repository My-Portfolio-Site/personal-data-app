'use client'
import { Invite } from '@/schemas/invite'
import { useEffect, useState } from 'react'
import { RefreshCw, MailPlus, SquarePen, Trash2 } from 'lucide-react'
import { fetchAllInvites } from '../actions'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function DisplayInvites() {
  const [invites, setInvites] = useState<Invite[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loadInvites() {
    setIsLoading(true)
    const result = await fetchAllInvites()
    if ('error' in result) {
      setError(result.error)
    } else {
      setInvites(result)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadInvites()
  }, [])

  if (error) {
    toast.error(error)
  }

  return (
    <div className=''>
      <div className='mx-2 my-5 flex flex-row gap-3'>
        <Button
          variant='secondary'
          size='icon'
          onClick={loadInvites}
          disabled={isLoading}
          className='hover:bg-muted-foreground'
        >
          {isLoading ? <RefreshCw className='animate-spin' /> : <RefreshCw />}
        </Button>
        <Button
          variant='secondary'
          size='icon'
          disabled={isLoading}
          className='hover:bg-muted-foreground'
        >
          <MailPlus />
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {error && <div>Error: {error}</div>}
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
              className={`border-1 ${color} w-full max-w-xs`}
            >
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  {invite.email}
                </CardTitle>
                <CardDescription>
                  <p className='capitalize text-primary font-medium'>{invite.role} | {invite.status}</p>
                </CardDescription>
                <CardAction>
                  <Button
                    variant='secondary'
                    size='icon'
                    className='size-7 mr-2'
                  >
                    <SquarePen size={16} color='#0887e7' strokeWidth={3} />
                  </Button>
                  <Button variant='secondary' size='icon' className='size-7'>
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
                    Updated At:{' '}
                    {new Date(invite.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
