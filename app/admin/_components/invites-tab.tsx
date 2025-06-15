'use client'
import { Invite } from '@/schemas/invite'
import { useEffect, useState } from 'react'
import { RefreshCw, MailPlus, SquarePen, Trash2 } from 'lucide-react'
import { fetchAllInvites } from '../actions'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import DisplayInvites from './display-invites'
import CreateInviteForm from './create-invite-form'


export default function InvitesTab() {
  const [invites, setInvites] = useState<Invite[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)

  async function loadInvites() {
    setIsLoading(true)
    const result = await fetchAllInvites()
    if ('error' in result) {
      toast.error(error)
      setError(result.error)
    } else {
      setInvites(result)
    }
    setIsLoading(false)
    return
  }

  useEffect(() => {
    loadInvites()
  }, [refresh])


  return (
    <div className=''>
      <div className='mx-2 my-5 flex flex-row gap-3'>
        <Button
          variant='secondary'
          size='icon'
          onClick={loadInvites}
          disabled={isLoading}
          className='hover:bg-secondary-hover'
        >
          {isLoading ? <RefreshCw className='animate-spin' /> : <RefreshCw />}
        </Button>
        <CreateInviteForm isLoading={isLoading} triggerRefresh={() => setRefresh(true)} />
      </div>
      <DisplayInvites invites={invites} triggerRefresh={() => setRefresh(true)} />
      
    </div>
  )
}
