import { Metadata } from 'next'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EducationSchemaType } from "@/schemas/education"
import EducationSection from "@/app/(users)/education/_components/education-section"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { fetchEducations } from '@/app/(users)/education/actions'

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
    <div className="section">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Education</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage your education history and academics</p>
        </div>
        <Button asChild>
          <Link href="/education/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </div>
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
              Click "+" to get started with your education history and academics
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}