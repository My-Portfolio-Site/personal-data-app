import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AboutMeSection } from '@/app/(resume)/aboutme/_components/aboutme-section'
import { fetchProfile } from '@/app/(resume)/aboutme/actions'
import { ProfileSchemaType } from '@/schemas/profile'
import { AboutmeForm } from '@/app/(resume)/aboutme/_components/aboutme-form'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { PageHeader, PageContent } from "@/components/page-formatter";

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

  return (
    <section>
      <PageHeader title="About Me" >
        <Button asChild size='sm' >
          <Link href="/aboutme/edit" >
            <Edit className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        {(Object.entries(profileData).length === 0) ? (
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
        ) : (
          <AboutMeSection data={profileData} />
        )}
      </PageContent>
    </section>
  )
}
