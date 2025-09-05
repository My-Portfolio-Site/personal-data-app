import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Edit Project | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import type { ProjectSchemaType } from "@/schemas/project"
import { ProjectForm } from "@/app/(resume)/projects/_components/project-form"
import { fetchProjectById } from '@/app/(resume)/projects/actions'

import { PageHeader, PageContent } from "@/components/page-formatter";

export default async function EditProjectPage({ params }: { params: Promise<{ projectId: string; }> }) {
  const { projectId } = await params

  const response = await fetchProjectById(projectId)
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch project data')
  }

  const project = response.data as ProjectSchemaType

  return (
    <section>
      <PageHeader title="Update Project" />
      <PageContent>
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Link>
        </Button>

        {/* Form */}
        <ProjectForm
          initialData={project}
          mode="edit"
        />
      </PageContent>
    </section>
  )
}