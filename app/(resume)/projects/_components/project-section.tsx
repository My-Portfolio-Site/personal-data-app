"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink, Github, FolderOpen } from "lucide-react"
import { ProjectSchemaType } from "@/schemas/project"
import DeleteProjectButton from '@/app/(resume)/projects/_components/delete-project-button'
import EditProjectButton from '@/app/(resume)/projects/_components/edit-project-button'



export function ProjectSection({
  project
}: {
  project: ProjectSchemaType
}) {
  const featuresList = JSON.parse(project.features || "[]") as string[];
  const technologiesList = JSON.parse(project.technologies || "[]") as string[];

  return (
    <Card key={project.id} className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              {project.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  project.status === "Completed"
                    ? "default"
                    : project.status === "In Progress"
                      ? "secondary"
                      : "outline"
                }
              >
                {project.status}
              </Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{project.duration}</span>
            </div>
          </div>
          <div className='flex gap-2'>
            {project.id && (
              <EditProjectButton projectId={project.id} />)}
            {project.id && (
              <DeleteProjectButton projectId={project.id} title={project.title} />)
            }
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground">{project.description}</p>

        <div>
          <h4 className="font-medium mb-2">Role: {project.role}</h4>
        </div>

        <div>
          <h4 className="font-medium mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {featuresList.map((feature, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {technologiesList.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
