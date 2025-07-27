import { Metadata } from 'next'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AboutMeSection } from '@/app/(users)/aboutme/_components/aboutme-section'
import { fetchProfile } from '@/app/(users)/aboutme/actions'
import { ProfileSchemaType } from '@/schemas/profile'
import { AboutmeForm } from '@/app/(users)/aboutme/_components/aboutme-form'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Me | Personal Data App',
  description: 'App and API for personal data management',
  icons: {
    icon: '/favicon.ico',
  },
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
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">About me</h1>
          <p className="text-muted-foreground text-sm md:text-base">Basic personal information and professional summary</p>
        </div>
        <Button asChild>
          <Link href="/aboutme/edit">
            <Edit className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <AboutMeSection data={profileData} />
    </div>
  )
}
