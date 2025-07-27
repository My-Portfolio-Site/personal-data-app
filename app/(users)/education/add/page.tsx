import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Experiences | Personal Data App',
  description: 'App and API for personal data management',
}

import { EducationForm } from "@/app/(users)/education/_components/education-form"

import { Button } from "@/components/ui/button"
import { EducationSchemaType } from "@/schemas/education"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddEducationPage() {
  const education = {} as EducationSchemaType
  return (
    <div className="section">
      {/* Header with Back Button */}
      <Button variant="ghost" size="sm" className="mb-2" asChild>
        <Link href="/education">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Education
        </Link>
      </Button>

      {/* Form */}
      <EducationForm initialData={education} mode="add" />
    </div>
  )
}
