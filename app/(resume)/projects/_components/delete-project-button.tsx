"use client"
import { Button } from "@/components/ui/button"
import { Trash2, Loader } from "lucide-react"
import { useState } from 'react'
import { deleteProjectById } from '@/app/(resume)/projects/actions'
import { toast } from "sonner"
import { ConfirmDialog } from '@/components/confirm-dialog'

export default function DeleteProjectButton({ projectId, title }: { projectId: string, title: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async ({ projectId }: { projectId: string }) => {
    try {
      setIsLoading(true)
      const result = await deleteProjectById(projectId)
      if (!result.success) {
        toast.error(result.message)
      } else {
        toast.success("Project deleted successfully")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Unknown error while deleting project.")
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
      title="Delete Project"
      variant="destructive"
      description={"Are you sure you want to delete this project '" + title + "'?"}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={() => handleDelete({ projectId })}
    >
      <Button variant='ghost' size='sm' className='text-red-400'>
        <Trash2 className="w-4 h-4" />
      </Button>
    </ConfirmDialog>
  )
}
