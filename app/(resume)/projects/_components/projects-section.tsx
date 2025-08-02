"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink, Github, FolderOpen } from "lucide-react"

const mockProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Built for scalability with microservices architecture.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS"],
    features: [
      "Real-time inventory tracking",
      "Multi-vendor support",
      "Advanced analytics dashboard",
      "Mobile-responsive design",
      "Payment gateway integration",
    ],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/johnsmith/ecommerce-platform",
    status: "Completed",
    duration: "6 months",
    role: "Full Stack Developer & Project Lead",
  },
  {
    id: 2,
    name: "Task Management SaaS",
    description:
      "Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.",
    technologies: ["React", "Express.js", "MongoDB", "Socket.io", "Docker"],
    features: [
      "Real-time collaboration",
      "Kanban board interface",
      "Time tracking",
      "Team analytics",
      "Custom workflows",
    ],
    liveUrl: "https://taskmanager-saas.com",
    githubUrl: "https://github.com/johnsmith/task-manager",
    status: "In Progress",
    duration: "4 months",
    role: "Lead Developer",
  },
  {
    id: 3,
    name: "AI-Powered Code Review Tool",
    description:
      "Machine learning tool that analyzes code quality, suggests improvements, and detects potential bugs using natural language processing.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React", "Docker"],
    features: [
      "Automated code analysis",
      "Bug detection",
      "Performance suggestions",
      "Integration with Git",
      "Custom rule sets",
    ],
    githubUrl: "https://github.com/johnsmith/ai-code-review",
    status: "Open Source",
    duration: "3 months",
    role: "Solo Developer",
  },
]

export function ProjectsSection() {
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    {project.name}
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
            <CardContent className="flex-1 space-y-4">
              <p className="text-sm text-muted-foreground">{project.description}</p>

              <div>
                <h4 className="font-medium mb-2">Role: {project.role}</h4>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, index) => (
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
                  {project.technologies.map((tech) => (
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
        ))}
      </div>

  )
}
