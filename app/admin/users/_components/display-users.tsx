'use client'
import { deleteUser, fetchAllUsers } from '../actions'
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

export default function DisplayUsers({users, triggerRefresh}: {users: User[],  triggerRefresh: () => void}) {
const [isLoading, setIsLoading] = useState(false)

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
    triggerRefresh()
    return
  }
  return (
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
