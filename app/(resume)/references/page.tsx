import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ReferencesSection } from './_components/references-section'
import { PageContent, PageHeader } from '@/components/page-formatter'
import { ReferenceSchemaType } from '@/schemas/reference'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchReferences } from '@/server/services/referencesService'

export const metadata: Metadata = {
  title: 'References | Personal Data App',
  description: 'App and API for personal data management',
}

const mockReferences = [
  {
    id: "1",
    name: "Sarah Johnson",
    designation: "Engineering Manager",
    company: "TechCorp Inc.",
    relationship: "Direct Manager",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 987-6543",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    workingPeriod: "2021 - Present",
    testimonial:
      "John is an exceptional software engineer who consistently delivers high-quality solutions. His leadership skills and technical expertise make him invaluable to any team.",
    canContact: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    designation: "Senior Product Manager",
    company: "TechCorp Inc.",
    relationship: "Colleague",
    email: "michael.chen@techcorp.com",
    phone: "+1 (555) 876-5432",
    linkedin: "https://linkedin.com/in/michaelchen",
    workingPeriod: "2021 - Present",
    testimonial:
      "Working with John has been a pleasure. He has excellent communication skills and always delivers projects on time with exceptional quality.",
    canContact: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    designation: "CTO",
    company: "StartupXYZ",
    relationship: "Former Manager",
    email: "emily.rodriguez@startupxyz.com",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    workingPeriod: "2019 - 2020",
    testimonial:
      "John was instrumental in building our core platform. His full-stack expertise and problem-solving abilities were crucial to our success.",
    canContact: false,
    note: "Prefers LinkedIn contact",
  },
]

export default async function ReferencesPage() {
  const response = await fetchReferences()
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch reference data')
  }

  const references = response.data as ReferenceSchemaType[]

  // const references = mockReferences as ReferenceSchemaType[]  

  return (
    <section>
      <PageHeader title="References" >
        <Button asChild size='sm'>
          <Link href="/references/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        {references.length === 0 ? (
          <Card className='border-dashed text-center'>
            <CardHeader>
              <CardTitle>No Reference Added</CardTitle>
              <CardDescription>
                Click "+" to get started with your references
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <ReferencesSection references={references} />
        )}
      </PageContent>
    </section>
  )
}