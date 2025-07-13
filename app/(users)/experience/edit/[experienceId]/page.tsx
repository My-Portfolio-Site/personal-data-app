import { Experience } from "@/schemas/experience"
import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"

import GoBackToExperienceButton from "@/app/(users)/experience/_components/go-back-to-experience-button"
import ShowError from "@/app/(users)/experience/_components/experiance-show-error"
import {fetchExperienceById } from '@/app/(users)/experience/actions'

interface EditExperiencePageProps {
  params: {
    experienceId: string; // Type for your dynamic route parameter
  };
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { experienceId } = await params
  console.log("Fetch for: ", experienceId)
  const experience = await fetchExperienceById(experienceId) as Experience
  console.log("Fetched experience for edit: ", experience)

  return (
    <div className="p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <GoBackToExperienceButton/>
      </div>

      {/* Form */}
      <div className="w-full">
        <ExperienceForm
          initialData={experience!}
          mode="edit"
        />
      </div>
    </div>
  )
}