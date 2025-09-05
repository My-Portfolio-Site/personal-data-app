import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Projects | Personal Data App',
  description: 'App and API for personal data management',
}

import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ProjectSchemaType } from "@/schemas/project"
import { ProjectSection } from "@/app/(resume)/projects/_components/project-section"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { fetchProjects } from '@/app/(resume)/projects/actions'

import { PageContent, PageHeader } from '@/components/page-formatter'

const mockProjects: ProjectSchemaType[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Built for scalability with microservices architecture.",
    technologies: JSON.stringify(["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS"]),
    features: JSON.stringify([
      "Real-time inventory tracking",
      "Multi-vendor support",
      "Advanced analytics dashboard",
      "Mobile-responsive design",
      "Payment gateway integration",
    ]),
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/johnsmith/ecommerce-platform",
    status: "Completed",
    duration: "6 months",
    role: "Full Stack Developer & Project Lead",
    year: "2022"
  },
  {
    id: "2",
    title: "Task Management SaaS",
    description:
      "Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.",
    technologies: JSON.stringify(["React", "Express.js", "MongoDB", "Socket.io", "Docker"]),
    features: JSON.stringify([
      "Real-time collaboration",
      "Kanban board interface",
      "Time tracking",
      "Team analytics",
      "Custom workflows",
    ]),
    liveUrl: "https://taskmanager-saas.com",
    githubUrl: "https://github.com/johnsmith/task-manager",
    status: "In Progress",
    duration: "4 months",
    role: "Lead Developer",
    year: "2021"
  },
  {
    id: "3",
    title: "AI-Powered Code Review Tool",
    description:
      "Machine learning tool that analyzes code quality, suggests improvements, and detects potential bugs using natural language processing.",
    technologies: JSON.stringify(["Python", "TensorFlow", "FastAPI", "React", "Docker"]),
    features: JSON.stringify([
      "Automated code analysis",
      "Bug detection",
      "Performance suggestions",
      "Integration with Git",
      "Custom rule sets",
    ]),
    githubUrl: "https://github.com/johnsmith/ai-code-review",
    status: "On Hold",
    duration: "3 months",
    role: "Solo Developer",
    year: "2020"
  },
]


export default async function ExperiencePage() {
  const response = await fetchProjects()
  if (!response.success) {
    // toast.error(response.message || 'Failed to fetch profile data')
    throw new Error(response.message || 'Failed to fetch profile data')
  }

  const projects = response.data as ProjectSchemaType[]
  // const projects = mockProjects

  return (
    <section>
      <PageHeader title="Projects" >
        <Button asChild size='sm'>
          <Link href="/projects/add">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        {projects.map((project) => (
          <ProjectSection key={project.id}
            project={project}
          />
        ))}
        {/* Empty State */}
        {projects.length === 0 && (
          <Card className='border-dashed text-center'>
            <CardHeader>
              <CardTitle>No Experience Added</CardTitle>
              <CardDescription>
                Click "+" to get started with your work history
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </PageContent>
    </section>
  )
}
