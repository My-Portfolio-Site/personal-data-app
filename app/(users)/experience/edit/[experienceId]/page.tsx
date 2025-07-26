import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import type { ExperienceSchemaType } from "@/schemas/experience"
import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"
import { fetchExperienceById } from '@/app/(users)/experience/actions'

interface EditExperiencePageProps {
  params: {
    experienceId: string; // Type for your dynamic route parameter
  };
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { experienceId } = await params

  const response = await fetchExperienceById(experienceId)
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }

  const experience = response.data as ExperienceSchemaType

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
          initialData={experience}
          mode="edit"
        />
      </div>
    </div>
  )
}