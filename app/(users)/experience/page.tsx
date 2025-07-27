import { Metadata } from 'next'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ExperienceSchemaType } from "@/schemas/experience"
import ExperienceSection from "@/app/(users)/experience/_components/experience-section"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { fetchExperiences } from '@/app/(users)/experience/actions'

export const metadata: Metadata = {
  title: 'Experiences | Personal Data App',
  description: 'App and API for personal data management',
}

export default async function ExperiencePage() {
  const response = await fetchExperiences()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }
  

  const experiences = response.data as ExperienceSchemaType[]

  return (
    <div className="section">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage your work history and achievements</p>
        </div>
        <Button asChild>
          <Link href="/experience/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </div>
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
    </div>
  )
}
