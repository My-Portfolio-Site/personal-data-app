"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GoBackToExperienceButton() {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href="/experience">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Experience
      </Link>
    </Button>
  )
}
