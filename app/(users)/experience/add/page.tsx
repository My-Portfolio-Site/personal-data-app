"use client"


import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"


export default function AddExperiencePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/experience">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experience
          </Link>
        </Button>
      </div>

      {/* Form */}
      <div className="w-full">
        <ExperienceForm
          mode="add"
        />
      </div>
    </div>
  )
}
