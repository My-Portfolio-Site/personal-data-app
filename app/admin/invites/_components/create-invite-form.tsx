'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { MailPlus, Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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

import { createInviteFormSchema } from '@/schemas/invite'
// import { createInvite } from '@/app/admin/invites/actions';
import { createInvite } from '../actions';

export default function InviteForm({ isLoading, triggerRefresh }: { isLoading: boolean,  triggerRefresh: () => void }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof createInviteFormSchema>>({
    resolver: zodResolver(createInviteFormSchema),
    defaultValues: {
      email: '',
      role: 'user',
    },
  })
  async function onSubmit(data: z.infer<typeof createInviteFormSchema>) {
    setIsSubmitting(true)
    setError(null)
    const result = await createInvite(data)
    if ('error' in result) {
      console.log(result.error)
      setError(result.error)
      toast.error(result.error)
      setIsSubmitting(false)
      return
    }
    toast.success('Invite sent successfully')
    form.reset()
    setIsSubmitting(false)
    setOpen(false)
    triggerRefresh()
    return
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='secondary'
          size='icon'
          disabled={isLoading}
          className='hover:bg-secondary-hover'
        >
          <MailPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Invite a user</DialogTitle>
              {error ? (
                <DialogDescription className='text-red-500'>
                  {error}
                </DialogDescription>
              ) : (
                <DialogDescription>Invite users to join app.</DialogDescription>
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
                  {/* <FormDescription>Email id of the user.</FormDescription> */}
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
                  {/* <FormDescription>
                    This is the role for the user.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isSubmitting} variant='outline'>Cancel</Button>
              </DialogClose>
              <Button disabled={isSubmitting} type='submit'>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
