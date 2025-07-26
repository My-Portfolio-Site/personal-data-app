import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ProfileSchemaType } from "@/schemas/profile"
import { AboutmeForm } from "@/app/(users)/aboutme/_components/aboutme-form"
import { fetchProfile } from '@/app/(users)/aboutme/actions'

import Loading from "./loading"

export default async function EditProfilePage() {
  const response = await fetchProfile()
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch profile data')
  }
  const profileData = response.data as ProfileSchemaType

  return (
    <div className="section">
      {/* Header with Back Button */}
      <AboutmeBackButton />

      {/* Form */}
      <AboutmeForm
        initialData={profileData}
        mode="edit"
      />
    </div>
  )
}

export const AboutmeBackButton = () => (
  <Button variant="ghost" size="sm" asChild>
    <Link href="/aboutme">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Aboutme
    </Link>
  </Button>
)