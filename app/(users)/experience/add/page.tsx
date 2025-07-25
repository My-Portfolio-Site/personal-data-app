import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"


export default function AddExperiencePage() {
  return (
    <div className="section">
      {/* Header with Back Button */}
      <Button variant="ghost" size="sm" className="mb-2" asChild>
        <Link href="/experience">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Experience
        </Link>
      </Button>

      {/* Form */}
      <ExperienceForm mode="add" />
    </div>
  )
}
