import Link from "next/link"
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AboutmeSchemaType } from "@/schemas/aboutme"
import { AboutmeForm } from "@/app/(resume)/aboutme/_components/aboutme-form"
import { fetchAboutme } from '@/app/(resume)/aboutme/actions'
import { PageHeader, PageContent } from "@/components/page-formatter";

export const metadata: Metadata = {
  title: 'About Me | Personal Data App',
  description: 'App and API for personal data management',
}

export default async function EditAboutmePage() {
  const response = await fetchAboutme()
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch aboutme data')
  }
  const aboutmeData = response.data as AboutmeSchemaType

  return (
    <section>
      <PageHeader title="Update About Me" />
      <PageContent>
        <Button variant="ghost" size="sm" asChild className="mb-3 mt-0 h-fit">
          <Link href="/aboutme">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Aboutme
          </Link>
        </Button>
        <AboutmeForm
          initialData={aboutmeData}
          mode="edit"
        />
      </PageContent>
    </section>
  )
}