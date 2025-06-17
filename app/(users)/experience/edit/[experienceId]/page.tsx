"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ExperienceForm} from "@/app/(users)/experience/_components/experience-form"
import { Experience } from "@/schemas/experience"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FormSkeleton } from "@/components/form-skeleton"
import { fetchExperienceById } from "../../actions"

// Mock data - in real app this would come from API
// const mockExperiences: Record<string, Experience> = {
//   "1": {
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
//   "2": {
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
// }

export default function EditExperiencePage() {
  const { experienceId } = useParams<{ experienceId: string }>()

  const router = useRouter()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load experience data
  useEffect(() => {
    const loadExperience = async () => {
      try {
        // Simulate API call
        console.log("Loading experience with ID:", experienceId);

        const experienceData = await fetchExperienceById(experienceId)
        console.log(experienceData);
        if (!experienceData || "error" in experienceData) {
          console.log(experienceData);
          
          setError("Experience not found")
          return
        }
        console.log("Loaded experience:", experienceData)
        
        setExperience(experienceData)
      } catch (err) {
        setError("Failed to load experience")
      } finally {
        setIsLoadingData(false)
      }
    }
    console.log(experienceId);

    loadExperience()
  }, [experienceId])

  const handleSaveExperience = async (data: Experience) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In real app, you would make an API call here
      console.log("Updating experience:", data)

      // Redirect back to experience list
      router.push("/experience")
    } catch (error) {
      console.error("Error updating experience:", error)
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/experience")
  }

  // Loading state
  if (isLoadingData) {
    return (<FormSkeleton />)
  }

  // Error state
  if (error) {
    return (
      <ShowError error={error} />
    )
  }

  return (

    <div className="p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/experience">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experience
          </Link>
        </Button>
      </div>

      {/* Form */}
      <div className="w-full">
        <ExperienceForm
          initialData={experience!}
          onSave={handleSaveExperience}
          onCancel={handleCancel}
          mode="edit"
          isLoading={isLoading}
          showCancel={true}
        />
      </div>
    </div>

  )
}

function ShowError({ error }: { error: string }) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/experience">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experience
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/experience">Return to Experience List</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}