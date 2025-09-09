import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Edit Experiences | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import type { ExperienceSchemaType } from "@/schemas/experience"
import { ExperienceForm } from "@/app/(resume)/experience/_components/experience-form"
import { fetchExperienceById } from '@/server/services/experiencesService'

import { PageHeader, PageContent } from "@/components/page-formatter";

export default async function EditExperiencePage({ params }: { params: Promise<{ experienceId: string; }> }) {
  const { experienceId } = await params

  const response = await fetchExperienceById(experienceId)
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch experience data')
  }

  const experience = response.data as ExperienceSchemaType

  return (
    <section>
      <PageHeader title="Update Experience" />
      <PageContent>
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/experience">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experience
          </Link>
        </Button>

        {/* Form */}
        <ExperienceForm
          initialData={experience}
          mode="edit"
        />
      </PageContent>
    </section>
  )
}