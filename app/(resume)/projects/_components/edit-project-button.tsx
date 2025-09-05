import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"

export default function EditProjectButton({ projectId }: { projectId: string }) {
  return (
    <Button variant='ghost' size='sm' asChild>
      <Link href={`/projects/edit/${projectId}`}>
        <Edit className='w-4 h-4' />
      </Link>
    </Button>
  )
}
