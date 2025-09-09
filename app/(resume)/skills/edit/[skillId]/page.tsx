import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Edit Skill | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import type { SkillSchemaType } from "@/schemas/skill"
import { SkillForm } from "@/app/(resume)/skills/_components/skill-form"
import { fetchSkillById } from '@/server/services/skillsService'

import { PageHeader, PageContent } from "@/components/page-formatter";

export default async function EditSkillPage({ params }: { params: Promise<{ skillId: string; }> }) {
  const { skillId } = await params

  const response = await fetchSkillById(skillId)
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }

  const skill = response.data as SkillSchemaType

  return (
    <section>
      <PageHeader title="Update Skill" />
      <PageContent>
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/skills">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Skills
          </Link>
        </Button>

        {/* Form */}
        <SkillForm
          initialData={skill}
          mode="edit"
        />
      </PageContent>
    </section>
  )
}