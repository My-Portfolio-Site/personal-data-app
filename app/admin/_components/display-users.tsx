'use client'
import { fetchAllUsers } from '../actions'
import { User } from '@/schemas/user'
import { useEffect, useState } from 'react'
import { RefreshCw, UserPlus, UserRoundPen, Trash2 } from 'lucide-react'
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

export default function DisplayUsers() {
  const [users, setusers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loadUsers() {
    setIsLoading(true)
    const result = await fetchAllUsers()
    if ('error' in result) {
      setError(result.error)
    } else {
      setusers(result)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadUsers()
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
          onClick={loadUsers}
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
          <UserPlus />
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {users.map((user) => {
          const color = user.userVerified ? 'border-success' : 'border-warning'
          return (
            <Card key={user.id} className={`border-1 ${color} w-full max-w-xs`}>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  {user.name}
                </CardTitle>
                <CardAction>
                  <Button variant='secondary' size='icon' className='size-7 mr-2'>
                    <UserRoundPen size={16} color='#0887e7' strokeWidth={3} />
                  </Button>
                  <Button
                    variant='secondary'
                    size='icon'
                    className='size-7 mr-2'
                  >
                    <Trash2 color='#ff7070' size={16} strokeWidth={3} />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                    <p className='font-medium text-primary'>{user.email}</p>
                <p className='capitalize'>Role: {user.role}</p>
                <p>User Verified: {user.userVerified ? 'Yes' : 'No'}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
