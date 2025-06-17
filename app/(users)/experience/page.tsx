"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ExperienceSection } from "./_components/experience-section"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
// import type { ExperienceFormData } from "@/app/(users)/experience/_components/experience-form"
import { Experience } from "@/schemas/experience"

import { useIsMobile } from "@/hooks/use-mobile"
import { fetchAllExperience } from './actions'
import ExperienceLoading from "./loading"

// Mock data - in real app this would come from API/database
// const initialExperiences: ExperienceFormData[] = [
//   {
//     id: "1",
//     company: "TechCorp Inc.",
//     position: "Senior Software Engineer",
//     location: "San Francisco, CA",
//     startDate: "2021-01",
//     endDate: null,
//     description:
//       "Lead development of microservices architecture serving 10M+ users. Mentored 5 junior developers and improved deployment efficiency by 40%.",
//     achievements: [
//       "Architected and implemented scalable microservices handling 10M+ daily requests",
//       "Led migration from monolith to microservices, reducing deployment time by 60%",
//       "Mentored 5 junior developers, with 3 receiving promotions within 18 months",
//       "Implemented CI/CD pipelines reducing bug reports by 35%",
//     ],
//     technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
//   },
//   {
//     id: "2",
//     company: "StartupXYZ",
//     position: "Full Stack Developer",
//     location: "Remote",
//     startDate: "2019-03",
//     endDate: "2020-12",
//     description:
//       "Built core platform features for B2B SaaS product. Collaborated with design and product teams to deliver user-centric solutions.",
//     achievements: [
//       "Developed responsive web application serving 50,000+ active users",
//       "Integrated payment processing system increasing revenue by 25%",
//       "Optimized database queries reducing page load times by 45%",
//       "Collaborated with UX team to improve user retention by 30%",
//     ],
//     technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Stripe API"],
//   },
// ]

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useIsMobile()


  // Delete experience
  const handleDeleteExperience = async (id: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
    setIsLoading(false)
  }

  // Bulk operations
  const handleBulkDelete = async (ids: string[]) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setExperiences((prev) => prev.filter((exp) => !ids.includes(exp.id!)))
    setIsLoading(false)
  }

  const handleDuplicateExperience = (experience: Experience) => {
    const duplicated = {
      ...experience,
      id: Date.now().toString(),
      company: `${experience.company} (Copy)`,
    }
    setExperiences((prev) => [duplicated, ...prev])
  }

  // Load experience data
  useEffect(() => {
    const loadExperience = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        console.log("Loading experiences");

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const result = await fetchAllExperience()
        if (!result || "error" in result) {
          setError("Experience not found")
          return
        } else {
          setExperiences(result)
        }
        console.log("Loaded experience:", result)

      } catch (err) {
        setError("Failed to load experience")
      } finally {
        setIsLoading(false)
      }
    }

    loadExperience()
  }, [])

  if(isLoading){
    return <ExperienceLoading />
  }

  return (
    <div className="px-6 py-2 space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage your work history and achievements</p>
        </div>
        <Button asChild>
          <Link href="/experience/add">
            <Plus className="w-4 h-4 md:mr-2" />
            {!isMobile && "Add Experience"}
          </Link>
        </Button>
      </div>

      <ExperienceSection
        experiences={experiences}
        onDelete={handleDeleteExperience}
        onDuplicate={handleDuplicateExperience}
        onBulkDelete={handleBulkDelete}
        isLoading={isLoading}
      />
    </div>
  )
}
