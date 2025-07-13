'use client'
import { deleteUser } from '@/app/admin/users/actions'
import { User } from '@/schemas/user'
import { Trash2, UserRoundPen } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { EditUserForm } from '@/app/admin/users/_components/edit-user-form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card'

export default function UsersSection({ users, currentUserId }: { users: User[], currentUserId: string}) {

  async function handleDelete(id: string) {
    const result = await deleteUser(id)
    if ('error' in result) {
      toast.error(result.error)
    } else {
      toast.success('User deleted successfully')
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      {users.map((user) => {
        const color = user.userVerified ? 'border-success' : 'border-warning'
        return (
          <Card key={user.id} className={`border-2 ${color} max-w-full grow-2`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className='text-lg font-semibold'>
                  {user.name}
                </CardTitle>
                <CardAction>
                  <EditUserForm initialData={user} />
                  <Button
                    variant='secondary'
                    disabled= {user.id === currentUserId}
                    size='icon'
                    className='size-7 mr-2 hover:bg-secondary-hover'
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 color='#ff7070' size={16} strokeWidth={3} />
                  </Button>
                </CardAction>
              
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between">
              <div>

              <p className='font-medium text-primary'>{user.email}</p>
              <p className='capitalize'>Role: {user.role}</p>
              <p>User Verified: {user.userVerified ? 'Yes' : 'No'}</p>
              </div>
              <Avatar className={`ml-4 size-15 border-2 ${color}`}>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'}</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
