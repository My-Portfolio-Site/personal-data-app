import { Metadata } from 'next'

import { Plus } from 'lucide-react'
import { AboutMeSection } from '@/app/(users)/aboutme/_components/aboutme-section'
import { fetchProfile } from '@/app/(users)/aboutme/actions'
import { Profile } from '@/schemas/profile'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About Me Page',
  description: 'App and API for personal data management',
}

export default async function AboutMe() {
  const profileData = await fetchProfile() as Profile
  console.log("AboutMe Page - Profile Data:", profileData);

  if (Object.entries(profileData).length === 0) {
    return (
      <Card className='border-dashed bg-card/50 mt-2'>
        <CardHeader className='text-center'>
          <CardTitle>Profile data not found</CardTitle>
          <CardDescription>
            Click "Add" to get started with your profile
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }
  return (
    <div className="px-6 py-2 space-y-6">
      <AboutMeSection profileData={profileData} />
    </div>
  )
}
