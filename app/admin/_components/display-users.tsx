'use client'
import { fetchAllUsers } from '../actions'
import { User } from '@/schemas/user'
import {useEffect, useState} from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {toast} from 'sonner'

export default function DisplayUsers() {
   const [users, setusers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadInvites() {
      const result = await fetchAllUsers()
      if ('error' in result) {
        setError(result.error)
        return
      }
      setusers(result)
    }
    loadInvites()
  }, [])
  if (!users) return <div>Loading...</div>

  if (error) {
    toast.error(error)
    return null
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {users.map((user) => {
        const color = user.userVerified ? 'border-success' : 'border-warning'
        return (
          <Card key={user.id} className={`border-1 ${color} p-4`}>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                {user.name}
              </CardTitle>
              <CardDescription>
                <p className='text-sm text-muted-foreground'>
                  {user.email}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
            <p>Role: {user.role}</p>
            <p>User Verified: {user.userVerified ? 'Yes' : 'No'}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
