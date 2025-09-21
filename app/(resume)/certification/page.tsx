import { Metadata } from 'next'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { CertificationSchemaType } from "@/schemas/certification"
import CertificationSection from "@/app/(resume)/certification/_components/certification-section"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { PageHeader, PageContent } from "@/components/page-formatter";

import { fetchCertifications } from '@/server/services/certificationService'

export const metadata: Metadata = {
  title: 'Certification | Personal Data App',
  description: 'App and API for personal data management',
}

const mockCertifications = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    issueDate: "March 2023",
    expiryDate: "March 2026",
    credentialId: "AWS-PSA-12345",
    credentialUrl: "https://aws.amazon.com/verification",
    status: "Active",
    description:
      "Advanced certificationification demonstrating expertise in designing distributed applications and systems on AWS platform.",
  },
  {
    id: "2",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "January 2023",
    expiryDate: "January 2026",
    credentialId: "CKA-67890",
    credentialUrl: "https://cncf.io/certificationification/verify",
    status: "Active",
    description:
      "Demonstrates skills in Kubernetes administration, including installation, configuration, and management of Kubernetes clusters.",
  },
  {
    id: "3",
    title: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    issueDate: "September 2022",
    expiryDate: "September 2024",
    credentialId: "GCP-PCA-11111",
    credentialUrl: "https://cloud.google.com/certificationification/verify",
    status: "Expired",
    description:
      "Validates ability to design, develop, and manage robust, secure, scalable, and dynamic solutions on Google Cloud Platform.",
  },
  {
    id: "4",
    title: "MongoDB Certified Developer Associate",
    issuer: "MongoDB Inc.",
    issueDate: "June 2022",
    expiryDate: "Never",
    credentialId: "MDB-DEV-22222",
    status: "Active",
    description:
      "Demonstrates proficiency in MongoDB development, including data modeling, indexing, and aggregation framework.",
  },
]


export default async function Certification() {
  const response = await fetchCertifications()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch certification data')
  }


  // const certifications = response.data as CertificationSchemaType[]
  const certifications = mockCertifications as CertificationSchemaType[]

  return (
    <section>
      <PageHeader title="Certification" >
        <Button asChild size='sm' >
          <Link href="/certification/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        {certifications.map((certification) => (
          <CertificationSection key={certification.id}
            certification={certification}
          />
        ))}
        {/* Empty State */}
        {certifications.length === 0 && (
          <Card className='border-dashed text-center'>
            <CardHeader>
              <CardTitle>No Certification Added</CardTitle>
              <CardDescription>
                Click "+" to get started with your certification history and academic achievements
              </CardDescription>
            </CardHeader>
          </Card>
        )}

      </PageContent>
    </section>
  )
}