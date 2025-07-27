import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Experiences | Personal Data App',
  description: 'App and API for personal data management',
}

import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"

import { Button } from "@/components/ui/button"
import { ExperienceSchemaType } from "@/schemas/experience"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddExperiencePage() {
  const experience = {} as ExperienceSchemaType
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
      <ExperienceForm initialData={experience} mode="add" />
    </div>
  )
}
