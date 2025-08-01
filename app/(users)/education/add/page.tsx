import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Education | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { EducationForm } from "@/app/(users)/education/_components/education-form"

import { Button } from "@/components/ui/button"
import { EducationSchemaType } from "@/schemas/education"
import { ArrowLeft } from "lucide-react"
import { PageHeader, PageContent } from "@/components/page-formatter";

export default function AddEducationPage() {
  const education = {} as EducationSchemaType
  return (
    <section>
      <PageHeader title="Add Education" />
      <PageContent >
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/education">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Education
          </Link>
        </Button>

        {/* Form */}
        <EducationForm initialData={education} mode="add" />
      </PageContent>
    </section>
  )
}
