'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

import { updateInviteSchema, UpdateInvite } from '@/schemas/invite'
import { updateInvite } from '../actions'

export default function UpdateInviteForm({
  isLoading,
  inviteData,
  handleUpdateInvite
}: {
  isLoading: boolean,
  inviteData: { id: string; email: string; role: string }
  handleUpdateInvite: (data: UpdateInvite) => Promise<string | void>
}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof updateInviteSchema>>({
    resolver: zodResolver(updateInviteSchema),
    defaultValues: {
      id: inviteData.id,
      email: inviteData.email,
      role:
        inviteData.role === 'admin' || inviteData.role === 'user'
          ? inviteData.role
          : 'user',
    },
  })

  async function onSubmit(data: z.infer<typeof updateInviteSchema>) {
    setIsSubmitting(true)
    setError(null)
    const result = await handleUpdateInvite(data)
    if (result) {
      console.log(result)
      setError(result)
      setIsSubmitting(false)
      return
    }
    form.reset()
    setIsSubmitting(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading}
          variant='secondary'
          size='icon'
          className='size-7 mr-2 hover:bg-secondary-hover'
        >
          <SquarePen size={16} color='#0887e7' strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-card'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Update Invite</DialogTitle>
              {error ? (
                <DialogDescription className='text-red-500'>
                  {error}
                </DialogDescription>
              ) : (
                <DialogDescription>
                  Update user invite details.
                </DialogDescription>
              )}
            </DialogHeader>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='admin'>Admin</SelectItem>
                      <SelectItem value='user'>User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isSubmitting} variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isSubmitting} type='submit'>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
