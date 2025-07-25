import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"

export default function UpdateProfileButton() {
  return (
    <Button asChild>
      <Link href="/aboutme/edit">
        <Edit className="w-4 h-4" />
      </Link>
    </Button>
  )
}
