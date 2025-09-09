import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AboutMeSection } from '@/app/(resume)/aboutme/_components/aboutme-section'
import { fetchAboutme } from '@/app/(resume)/aboutme/actions'
import { AboutmeSchemaType } from '@/schemas/aboutme'
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
  const response = await fetchAboutme()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch aboutme data')
    throw new Error(response.message || 'Failed to fetch aboutme data')
  }
  const aboutmeData = response.data as AboutmeSchemaType

  return (
    <section>
      <PageHeader title="About Me" >
        <Button asChild size='sm' >
          <Link href="/aboutme/edit" >
            <Edit className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent className='my-2'>
        {(Object.entries(aboutmeData).length === 0) ? (
          <div>
            <Card className='border-dashed text-center mb-2'>
              <CardHeader>
                <CardTitle>Aboutme data not found</CardTitle>
                <CardDescription>
                  Enter details below to create your aboutme
                </CardDescription>
              </CardHeader>
            </Card>
            <AboutmeForm initialData={aboutmeData} mode="add" />
          </div>
        ) : (
          <AboutMeSection data={aboutmeData} />
        )}
      </PageContent>
    </section>
  )
}
