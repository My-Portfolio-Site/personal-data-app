"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Award, Calendar, ExternalLink } from "lucide-react"

const mockCertifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    issueDate: "March 2023",
    expiryDate: "March 2026",
    credentialId: "AWS-PSA-12345",
    credentialUrl: "https://aws.amazon.com/verification",
    status: "Active",
    description:
      "Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform.",
  },
  {
    id: 2,
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "January 2023",
    expiryDate: "January 2026",
    credentialId: "CKA-67890",
    credentialUrl: "https://cncf.io/certification/verify",
    status: "Active",
    description:
      "Demonstrates skills in Kubernetes administration, including installation, configuration, and management of Kubernetes clusters.",
  },
  {
    id: 3,
    name: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    issueDate: "September 2022",
    expiryDate: "September 2024",
    credentialId: "GCP-PCA-11111",
    credentialUrl: "https://cloud.google.com/certification/verify",
    status: "Expiring Soon",
    description:
      "Validates ability to design, develop, and manage robust, secure, scalable, and dynamic solutions on Google Cloud Platform.",
  },
  {
    id: 4,
    name: "MongoDB Certified Developer Associate",
    issuer: "MongoDB Inc.",
    issueDate: "June 2022",
    expiryDate: "Never",
    credentialId: "MDB-DEV-22222",
    status: "Active",
    description:
      "Demonstrates proficiency in MongoDB development, including data modeling, indexing, and aggregation framework.",
  },
]

export function CertificationsSection() {
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCertifications.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {cert.name}
                  </CardTitle>
                  <CardDescription className="font-medium">{cert.issuer}</CardDescription>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        cert.status === "Active"
                          ? "default"
                          : cert.status === "Expiring Soon"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {cert.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{cert.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Issue Date:</span>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {cert.issueDate}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Expiry Date:</span>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {cert.expiryDate}
                  </p>
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Credential ID:</span>
                <p className="text-sm text-muted-foreground font-mono">{cert.credentialId}</p>
              </div>

              {cert.credentialUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Credential
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
  )
}
