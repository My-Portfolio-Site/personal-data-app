import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Add Project | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { ProjectForm } from "@/app/(resume)/projects/_components/project-form"

import { Button } from "@/components/ui/button"
import { ProjectSchemaType } from "@/schemas/project"
import { ArrowLeft } from "lucide-react"

import { PageHeader, PageContent } from "@/components/page-formatter";

export default function AddProjectPage() {
  const project = {} as ProjectSchemaType
  return (
    <section>
      <PageHeader title="Add Project" />
      <PageContent>
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        {/* Form */}
        <ProjectForm initialData={project} mode="add" />

      </PageContent>
    </section>
  )
}
