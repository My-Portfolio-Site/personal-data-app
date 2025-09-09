'use client'
import { Button } from '@/components/ui/button'
import { deleteUser } from '@/app/(admin)/admin/users/actions'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'


export function DeleteUserButton({ isDisabled, userId }: { isDisabled: boolean, userId: string }) {
  async function handleDelete(id: string) {
    const result = await deleteUser(id)
    if (!result.success) {
      toast.error(result.message)
    } else {
      toast.success('User deleted successfully')
    }
  }
  return (
    <Button
      variant='secondary'
      disabled={isDisabled}
      size='icon'
      className='size-8 mr-2 hover:bg-secondary-hover'
      onClick={() => handleDelete(userId)}
    >
      <Trash2 color='#ff7070' size={64} strokeWidth={3} />
    </Button>
  )
}
