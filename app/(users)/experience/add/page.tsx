import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Experiences | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"

import { Button } from "@/components/ui/button"
import { ExperienceSchemaType } from "@/schemas/experience"
import { ArrowLeft } from "lucide-react"

import { PageHeader, PageContent } from "@/components/page-formatter";

export default function AddExperiencePage() {
  const experience = {} as ExperienceSchemaType
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
      <ExperienceForm initialData={experience} mode="add" />
    
          </PageContent>
        </section>
  )
}
