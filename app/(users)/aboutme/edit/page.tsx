import Link from "next/link"
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ProfileSchemaType } from "@/schemas/profile"
import { AboutmeForm } from "@/app/(users)/aboutme/_components/aboutme-form"
import { fetchProfile } from '@/app/(users)/aboutme/actions'

export const metadata: Metadata = {
  title: 'About Me | Personal Data App',
  description: 'App and API for personal data management',
}

export default async function EditProfilePage() {
  const response = await fetchProfile()
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch profile data')
  }
  const profileData = response.data as ProfileSchemaType

  return (
    <div className="section">
      {/* Header with Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-2">
        <Link href="/aboutme">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Aboutme
        </Link>
      </Button>

      {/* Form */}
      <AboutmeForm
        initialData={profileData}
        mode="edit"
      />
    </div>
  )
}