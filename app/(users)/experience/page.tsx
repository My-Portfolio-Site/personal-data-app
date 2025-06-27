"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ExperienceSection } from "./_components/experience-section"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Experience } from "@/schemas/experience"

import { useIsMobile } from "@/hooks/use-mobile"
import { fetchAllExperience } from './actions'
import Loading from "./loading"
import ShowError from "./_components/experiance-show-error"


export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
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

  if (isLoading) {
    return <Loading />
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

      {error ? (
        <ShowError error={error} mainpage={true} />
      ) : (
        <ExperienceSection
          experiences={experiences}
          onDelete={handleDeleteExperience}
          onDuplicate={handleDuplicateExperience}
          onBulkDelete={handleBulkDelete}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
