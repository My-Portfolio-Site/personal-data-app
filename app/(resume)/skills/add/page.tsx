import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Add Skill | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { SkillForm } from "@/app/(resume)/skills/_components/skill-form"

import { Button } from "@/components/ui/button"
import { SkillSchemaType } from "@/schemas/skill"
import { ArrowLeft } from "lucide-react"

import { PageHeader, PageContent } from "@/components/page-formatter";

export default function AddSkillPage() {
  const skill = {} as SkillSchemaType
  return (
    <section>
      <PageHeader title="Add Skill" />
      <PageContent>
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/skills">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Skills
          </Link>
        </Button>

        {/* Form */}
        <SkillForm initialData={skill} mode="add" />

      </PageContent>
    </section>
  )
}
