"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"
import { Experience } from "@/schemas/experience"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FormSkeleton } from "@/components/form-skeleton"
import { fetchExperienceById } from "../../actions"
import { toast } from "sonner"
import { updateExperience } from "./actions"

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
    console.log("Updating experience data:", data)
    try {
      const result = await updateExperience(data)
      if ("error" in result) {
        console.log("Error updating experience:", result)
        toast.error(result.error)
      } else {
        toast.success("Experience updated successfully")
        console.log("Experience updated successfully:", result)
        router.push("/experience")
      }
    } catch (error) {
      console.error("Error updating experience:", error)
    } finally {
      setIsLoading(false)
    }
    return
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