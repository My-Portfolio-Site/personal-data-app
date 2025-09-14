"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Users, Mail, Phone, Linkedin, Building } from "lucide-react"
import { ReferenceSchemaType } from "@/schemas/reference"
import DeleteReferenceButton from "@/app/(resume)/references/_components/delete-reference-button"
import EditReferenceButton from "@/app/(resume)/references/_components/edit-reference-button"

export function ReferencesSection({ references }: { references: ReferenceSchemaType[] }) {
  return (
    <div className="">
      <div className="space-y-4">
        {references.map((ref) => (
          <Card key={ref.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {ref.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {ref.name}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{ref.designation}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {ref.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <Badge variant="outline">{ref.relationship}</Badge>
                        <span>Worked together: {ref.workingPeriod}</span>
                      </div>
                    </CardDescription>
                  </div>
                </div>
                <div className='flex gap-2'>
                  {ref.id && (
                    <EditReferenceButton referenceId={ref.id} />)}
                  {ref.id && (
                    <DeleteReferenceButton referenceId={ref.id} reference_provider={ref.name} />)
                  }
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm italic">"{ref.testimonial}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Contact Information</h4>
                  <div className="space-y-1 text-sm">
                    {ref.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{ref.email}</span>
                      </div>
                    )}
                    {ref.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{ref.phone}</span>
                      </div>
                    )}
                    {ref.linkedin && (
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        <a
                          href={ref.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Contact Preference</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={ref.canContact === "true" ? "default" : "secondary"}>
                      {ref.canContact === "true" ? "Available for Contact" : "Limited Contact"}
                    </Badge>
                  </div>
                  {/* {ref.note && <p className="text-xs text-muted-foreground">{ref.note}</p>} */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ReferenceGuidelines />
    </div>
  )
}


const ReferenceGuidelines = () => {
  return (
    <Card className="bg-muted/50 mt-6 gap-3">
      <CardHeader>
        <CardTitle className="text-sm">Reference Guidelines</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <p>• Always ask permission before adding someone as a reference</p>
        <p>• Provide context about the role you're applying for</p>
        <p>• Keep references updated about your job search progress</p>
        <p>• Thank your references after they've been contacted</p>
      </CardContent>
    </Card>
  )
}