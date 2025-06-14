'use client'
import { fetchAllUsers } from '../actions'
import { User } from '@/schemas/user'
import { useEffect, useState } from 'react'
import { RefreshCw, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import DisplayUsers from './display-users'

export default function UsersTab() {
  const [users, setusers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)

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
  }, [refresh])

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

        {/* <Button
          variant='secondary'
          size='icon'
          disabled={isLoading}
          className='hover:bg-muted-foreground'
        >
          <UserPlus />
        </Button> */}
      </div>
      <DisplayUsers users={users} triggerRefresh={() => setRefresh(true)} />
    </div>
  )
}
