"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExperienceForm } from "@/app/(users)/experience/_components/experience-form"
import { ExperienceFormData } from "@/schemas/experience"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddExperiencePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveExperience = async (data: ExperienceFormData) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In real app, you would make an API call here
      console.log("Saving experience:", data)

      // Redirect back to experience list
      router.push("/experience")
    } catch (error) {
      console.error("Error saving experience:", error)
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/experience")
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
          onSave={handleSaveExperience}
          onCancel={handleCancel}
          mode="add"
          isLoading={isLoading}
          showCancel={true}
        />
      </div>
    </div>
  )
}
