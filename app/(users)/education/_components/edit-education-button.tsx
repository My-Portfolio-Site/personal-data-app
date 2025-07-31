import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"

export default function EditEducationButton({ educationId }: { educationId: string }) {
  return (
    <Button variant='ghost' size='sm' asChild>
      <Link href={`/education/edit/${educationId}`}>
        <Edit className='w-4 h-4' />
      </Link>
    </Button>
  )
}
