import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Add Reference | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from "next/link"
import { ReferenceForm } from "@/app/(resume)/references/_components/reference-form"

import { Button } from "@/components/ui/button"
import { ReferenceSchemaType } from "@/schemas/reference"
import { ArrowLeft } from "lucide-react"

import { PageHeader, PageContent } from "@/components/page-formatter";

export default function AddReferencePage() {
  const reference = {} as ReferenceSchemaType
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
        <ReferenceForm initialData={reference} mode="add" />

      </PageContent>
    </section>
  )
}
