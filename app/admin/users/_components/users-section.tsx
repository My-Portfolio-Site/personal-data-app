import { User } from '@/schemas/user'
import { EditUserForm } from '@/app/admin/users/_components/edit-user-form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { DeleteUserButton } from '@/app/admin/users/_components/delete-user-button'

import { BadgeCheck, BadgeX, Mail, UserRoundCog, UserRound } from 'lucide-react'

export default async function UsersSection({ users, currentUserId }: { users: User[], currentUserId: string }) {
  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      {users.map((user) => {
        const color = user.userVerified ? 'border-success/50' : 'border-warning/50'
        return (
          <Card key={user.id} className={`border-2 ${color} max-w-full w-md grow-2`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className='text-2xl font-semibold'>
                {user.name}
              </CardTitle>
              <CardAction>
                <EditUserForm isDisabled={user.id === currentUserId} initialData={user} />
                <DeleteUserButton isDisabled={user.id === currentUserId} userId={user.id} />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-between">
              <div className='flex flex-col'>
                <div className='flex gap-2 h-9 items-center'>
                  <Mail size={20} />
                  <p className='font-medium'>{user.email}</p>
                </div>
                <div className='flex gap-2 h-9 items-center'>
                  {user.role === 'admin' ? (
                    <UserRoundCog size={20} />
                  ) : (
                    <UserRound size={20} />
                  )}
                  <p className='capitalize'>{user.role}</p>
                </div>
                <div className='flex gap-2 h-9 items-center'>
                  {user.userVerified ? (
                    <>
                      <BadgeCheck size={20} fill='#00bc7d'/>
                      <p>Verified</p>
                    </>
                  ) : (
                    <>
                        <BadgeX size={20} fill='#fd9a00'/>
                      <p>Not Verified</p>
                    </>
                  )}
                </div>
              </div>
              <Avatar className={`ml-4 size-20 border-2 ${color}`}>
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
