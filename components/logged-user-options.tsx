'use client'
import { handleSignOut } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from '@/schemas/user'
import { LogOut } from 'lucide-react'


export function LoggedUserOptions({
  currentUser,
}: {
  currentUser: User
}) {
  const userNameInitials = currentUser?.name
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-10 p-0'
          >
            <Avatar className='size-10 rounded-lg border'>
              <AvatarImage src={currentUser.image} alt={currentUser.name} />
              <AvatarFallback className='rounded-lg border bg-accent-foreground'>
                {userNameInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
          side='bottom'
          align='end'
          sideOffset={4}
        >
          <DropdownMenuLabel className='p-0 font-normal'>
            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={currentUser.image}
                  alt={currentUser.name}
                />
                <AvatarFallback className='rounded-lg bg-primary'>
                  {userNameInitials}
                </AvatarFallback>
              </Avatar>

              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {currentUser.name}
                </span>
                <span className='truncate text-xs text-muted-foreground'>
                  {currentUser.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            Account Settings
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => handleSignOut()}>
            <LogOut className='mr-2 h-4 w-4' />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}