"use client"
import { Button } from "@/components/ui/button"
import { Trash2, Loader } from "lucide-react"
import { useState } from 'react'
import { deleteReferenceById } from '@/app/(resume)/references/actions'
import { toast } from "sonner"
import { ConfirmDialog } from '@/components/confirm-dialog'

export default function DeleteReferenceButton({ referenceId, reference_provider }: { referenceId: string, reference_provider: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async ({ referenceId }: { referenceId: string }) => {
    try {
      setIsLoading(true)
      const result = await deleteReferenceById(referenceId)
      if (!result.success) {
        toast.error(result.message)
      } else {
        toast.success("Reference deleted successfully")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Unknown error while deleting reference.")
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
      title="Delete Reference"
      variant="destructive"
      description={"Are you sure you want to delete this reference from '" + reference_provider + "'?"}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={() => handleDelete({ referenceId })}
    >
      <Button variant='ghost' size='sm' className='text-red-400'>
        <Trash2 className="w-4 h-4" />
      </Button>
    </ConfirmDialog>
  )
}
