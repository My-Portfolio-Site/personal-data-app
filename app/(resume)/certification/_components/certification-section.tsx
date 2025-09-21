"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Award, Calendar, ExternalLink } from "lucide-react"
import { CertificationSchemaType } from "@/schemas/certification"


export default function CertificationSection({ certification }: { certification: CertificationSchemaType }) {
  return (
    <Card key={certification.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              {certification.title}
            </CardTitle>
            <CardDescription className="font-medium">{certification.issuer}</CardDescription>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  certification.status === "Active"
                    ? "default"
                    : "destructive"
                }
              >
                {certification.status}
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
        <p className="text-sm text-muted-foreground">{certification.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Issue Date:</span>
            <p className="text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {certification.issueDate}
            </p>
          </div>
          <div>
            <span className="font-medium">Expiry Date:</span>
            <p className="text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {certification.expiryDate}
            </p>
          </div>
        </div>

        <div>
          <span className="font-medium text-sm">Credential ID:</span>
          <p className="text-sm text-muted-foreground font-mono">{certification.credentialId}</p>
        </div>

        {certification.credentialUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={certification.credentialUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Verify Credential
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
