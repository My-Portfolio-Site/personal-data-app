"use client"
import { Button } from "@/components/ui/button"
import { Trash2, Loader } from "lucide-react"
import { useState } from 'react'
import { deleteEducationById } from '@/app/(resume)/education/actions'
import { toast } from "sonner"
import { ConfirmDialog } from '@/components/confirm-dialog'

export default function DeleteEducationButton({ educationId, institution }: { educationId: string, institution: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async ({ educationId }: { educationId: string }) => {
    try {
      setIsLoading(true)
      const result = await deleteEducationById(educationId)
      if (!result.success) {
        toast.error(result.message)
      } else {
        toast.success("Education deleted successfully")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Unknown error while deleting education.")
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
      title="Delete Education"
      variant="destructive"
      description={"Are you sure you want to delete this education for institution '" + institution + "'?"}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={() => handleDelete({ educationId })}
    >
      <Button variant='ghost' size='sm' className='text-red-400'>
        <Trash2 className="w-4 h-4" />
      </Button>
    </ConfirmDialog>
  )
}
