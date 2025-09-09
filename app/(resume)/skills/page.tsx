
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SkillSchemaType } from '@/schemas/skill'
import { SkillsSection } from '@/app/(resume)/skills/_components/skills-section'
import { fetchSkills } from '@/server/services/skillsService'
import { PageContent, PageHeader } from '@/components/page-formatter'
import Link from 'next/link'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills | Personal Data App',
  description: 'App and API for personal data management',
}


export default async function Skills() {
  const response = await fetchSkills()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }

  const skills = response.data as SkillSchemaType[]

  return (
    <section>
      <PageHeader title="Skills" >
        <Button asChild size='sm'>
          <Link href="/skills/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent>


        {/* Empty State */}
        {/* {skills.length === 0 && (
          <Card className='border-dashed text-center'>
            <CardHeader>
              <CardTitle>No Skill Added</CardTitle>
              <CardDescription>
                Click "+" to get started with your skills
              </CardDescription>
            </CardHeader>
          </Card>
        )} */}
        <SkillsSection skills={skills} />
      </PageContent>
    </section>
  )
}