import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Experiences | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ExperienceSchemaType } from "@/schemas/experience"
import ExperienceSection from "@/app/(resume)/experience/_components/experience-section"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { fetchExperiences } from '@/app/(resume)/experience/actions'

import { PageContent, PageHeader } from '@/components/page-formatter'


export default async function ExperiencePage() {
  const response = await fetchExperiences()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }

  const experiences = response.data as ExperienceSchemaType[]

  return (
    <section>
      <PageHeader title="Experiences" >
        <Button asChild size='sm'>
          <Link href="/experience/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent>

        {experiences.map((experience) => (
          <ExperienceSection key={experience.id}
            experience={experience}
          />
        ))}
        {/* Empty State */}
        {experiences.length === 0 && (
          <Card className='border-dashed text-center'>
            <CardHeader>
              <CardTitle>No Experience Added</CardTitle>
              <CardDescription>
                Click "+" to get started with your work history
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </PageContent>
    </section>
  )
}
