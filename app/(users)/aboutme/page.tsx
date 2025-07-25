import { Metadata } from 'next'
import { Plus } from 'lucide-react'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AboutMeSection } from '@/app/(users)/aboutme/_components/aboutme-section'
import { fetchProfile } from '@/app/(users)/aboutme/actions'
import { ProfileSchemaType } from '@/schemas/profile'
import { AboutmeForm } from '@/app/(users)/aboutme/_components/aboutme-form'
import AboutMeHeader from '@/app/(users)/aboutme/_components/aboutme-header'
import UpdateProfileButton from "@/app/(users)/aboutme/_components/update-profile-button"

export const metadata: Metadata = {
  title: 'About Me Page',
  description: 'App and API for personal data management',
}

export default async function AboutMe() {
  const response = await fetchProfile()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }
  const profileData = response.data as ProfileSchemaType
  if (Object.entries(profileData).length === 0) {
    return (
      <div>
        <Card className='border-dashed text-center mb-2'>
          <CardHeader>
            <CardTitle>Profile data not found</CardTitle>
            <CardDescription>
              Enter details below to create your profile
            </CardDescription>
          </CardHeader>
        </Card>
        <AboutmeForm initialData={profileData} mode="add" />
      </div>
    )
  }
  return (
    <div className="section">
      <AboutMeHeader>
        <UpdateProfileButton />
      </AboutMeHeader>
      <AboutMeSection data={profileData} />
    </div>
  )
}
