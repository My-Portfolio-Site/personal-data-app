import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ExperienceHeader() {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground text-sm md:text-base">Manage your work history and achievements</p>
      </div>
      <Button asChild>
        <Link href="/experience/add">
          <Plus className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  )
}
