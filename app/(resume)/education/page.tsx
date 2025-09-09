import { Metadata } from 'next'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EducationSchemaType } from "@/schemas/education"
import EducationSection from "@/app/(resume)/education/_components/education-section"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { PageHeader, PageContent } from "@/components/page-formatter";

import { fetchEducations } from '@/server/services/educationService'

export const metadata: Metadata = {
  title: 'Education | Personal Data App',
  description: 'App and API for personal data management',
}


export default async function Education() {
  const response = await fetchEducations()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch education data')
  }


  const educations = response.data as EducationSchemaType[]
  return (
    <section>
      <PageHeader title="Education" >
        <Button asChild size='sm' >
          <Link href="/education/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        {educations.map((education) => (
          <EducationSection key={education.id}
            education={education}
          />
        ))}
        {/* Empty State */}
        {educations.length === 0 && (
          <Card className='border-dashed text-center'>
            <CardHeader>
              <CardTitle>No Education Added</CardTitle>
              <CardDescription>
                Click "+" to get started with your education history and academic achievements
              </CardDescription>
            </CardHeader>
          </Card>
        )}

      </PageContent>
    </section>
  )
}