import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import type { EducationSchemaType } from "@/schemas/education"
import { EducationForm } from "@/app/(users)/education/_components/education-form"
import { fetchEducationById } from '@/app/(users)/education/actions'

interface EditEducationPageProps {
  params: {
    educationId: string; // Type for your dynamic route parameter
  };
}

export default async function EditEducationPage({ params }: EditEducationPageProps) {
  const { educationId } = await params

  const response = await fetchEducationById(educationId)
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }

  const education = response.data as EducationSchemaType

  return (
    <div className="section">
      {/* Header with Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-2">
        <Link href="/education">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Education
        </Link>
      </Button>

      {/* Form */}
      {/* <EducationForm
        initialData={education}
        mode="edit"
      /> */}
    </div>
  )
}