"use client"
import { Button } from "@/components/ui/button"
import { Trash2, Loader } from "lucide-react"
import { useState } from 'react'
import { deleteExperienceById } from '@/app/(users)/experience/actions'
import { toast } from "sonner"
import { ConfirmDialog } from '@/components/confirm-dialog'

export default function DeleteExperienceButton({ experienceId, company }: { experienceId: string, company: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async ({ experienceId }: { experienceId: string }) => {
    try {
      setIsLoading(true)
      const result = await deleteExperienceById(experienceId)
      if (!result.success) {
        console.log("Error deleting experience:", result)
        toast.error(result.message)
      } else {
        toast.success("Experience deleted successfully")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error deleting experience:", error)
        toast.error(error.message)
      } else {
        toast.error("Unknown error while deleting experience.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Button disabled={isLoading} variant='ghost' size='sm' className='text-red-400 animate-spin'>
        <Loader className="w-4 h-4" />
      </Button>
    )
  }
  return (
    <ConfirmDialog
      title="Delete Experience"
      variant="destructive"
      description={"Are you sure you want to delete this experience for company '" + company + "'?"}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={() => handleDelete({ experienceId })}
    >
      <Button variant='ghost' size='sm' className='text-red-400'>
        <Trash2 className="w-4 h-4" />
      </Button>
    </ConfirmDialog>
  )
}
