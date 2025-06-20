"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Experience } from "@/schemas/experience"
import { Button } from "@/components/ui/button"

import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"
import ShowError from "@/app/(users)/experience/_components/experiance-show-error"
import { FormSkeleton } from "@/components/form-skeleton"
import { fetchExperienceById } from "../../actions"
import { updateExperience } from "./actions"

export default function EditExperiencePage() {
  const { experienceId } = useParams<{ experienceId: string }>()

  const router = useRouter()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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
        setIsLoading(false)
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
  if (isLoading) {
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