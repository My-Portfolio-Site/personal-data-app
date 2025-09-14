import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Edit Reference | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import type { ReferenceSchemaType } from "@/schemas/reference"
import { ReferenceForm } from "@/app/(resume)/references/_components/reference-form"
import { fetchReferenceById } from '@/server/services/referencesService'

import { PageHeader, PageContent } from "@/components/page-formatter";

export default async function EditReferencePage({ params }: { params: Promise<{ referenceId: string; }> }) {
  const { referenceId } = await params

  const response = await fetchReferenceById(referenceId)
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch reference data')
  }

  const reference = response.data as ReferenceSchemaType

  return (
    <section>
      <PageHeader title="Update Reference" />
      <PageContent>
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/references">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reference
          </Link>
        </Button>

        {/* Form */}
        <ReferenceForm
          initialData={reference}
          mode="edit"
        />
      </PageContent>
    </section>
  )
}