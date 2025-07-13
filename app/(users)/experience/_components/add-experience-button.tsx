"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AddExperienceButton() {
  return (
    <Button asChild>
      <Link href="/experience/add">
        <Plus className="w-4 h-4" />
      </Link>
    </Button>
  )
}
