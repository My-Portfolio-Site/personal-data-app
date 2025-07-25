import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CreateProfileButton() {
  return (
    <Button asChild>
      <Link href="/aboutme">
        <Plus className="w-4 h-4" />
      </Link>
    </Button>
  )
}
