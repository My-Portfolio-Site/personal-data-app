'use client'
import { deleteUser, fetchAllUsers } from '../actions'
import { User } from '@/schemas/user'
import { useEffect, useState } from 'react'
import { Trash2, UserRoundPen } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Loading from '@/app/admin/users/loading'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card'

export default function UsersSection() {
  const [users, setusers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleDelete(id: string) {
    setIsLoading(true)
    const result = await deleteUser(id)
    if ('error' in result) {
      console.log(result.error)
      toast.error(result.error)
      setIsLoading(false)
      return
    }
    toast.success('User deleted successfully')
    setIsLoading(false)
    setusers(users.filter((user) => user.id !== id))
    return
  }

  async function loadUsers() {
    setIsLoading(true)
    const result = await fetchAllUsers()
    if ('error' in result) {
      toast.error(error)
      setError(result.error)
    } else {
      setusers(result)
    }
    setIsLoading(false)
    return
  }

  useEffect(() => {
    loadUsers()
  }, [])

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='flex flex-wrap gap-5'>
      {users.map((user) => {
        const color = user.userVerified ? 'border-success' : 'border-warning'
        return (
          <Card key={user.id} className={`border-1 ${color} w-fit max-w-md grow-2`}>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                {user.name}
              </CardTitle>
              <CardAction>
                <Button disabled={true} variant='secondary' size='icon' className='size-7 mr-2 hover:bg-secondary-hover'>
                  <UserRoundPen size={16} color='#0887e7' strokeWidth={3} />
                </Button>
                <Button
                  variant='secondary'
                  size='icon'
                  className='size-7 mr-2 hover:bg-secondary-hover'
                  disabled={isLoading}
                  onClick={() => handleDelete(user.id)}
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
  )
}
