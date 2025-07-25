"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, X, Plus, Save, CalendarIcon } from "lucide-react"
import { Experience } from "@/schemas/experience"
import { DatePicker } from "@/components/date-picker"
import { createExperience, updateExperience } from "@/app/(users)/experience/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ExperienceFormProps {
  initialData?: Partial<Experience>
  mode?: "add" | "edit"
}

export function ExperienceForm({
  initialData = {},
  mode = "add"
}: ExperienceFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<Experience>({
    id: initialData.id || "",
    userId: initialData.userId || "",
    company: initialData.company || "",
    position: initialData.position || "",
    location: initialData.location || "",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || null,
    description: initialData.description || "",
    achievements: initialData.achievements || [""],
    technologies: initialData.technologies || [],
  })

  const [isCurrentRole, setIsCurrentRole] = useState(formData.endDate === null)

  const [newTechnology, setNewTechnology] = useState("")

  const router = useRouter()
  
  const handleCancel = () => {
    router.push("/experience")
  }

  const handleSaveExperience = async (data: Experience) => {
    setIsLoading(true)
    console.log("Updating experience data:", data)
    try {
      let result
      if (mode === "add") {
        result = await createExperience(data)
      } else {
        result = await updateExperience(data)
      }
      if ("error" in result) {
        console.log("Error updating experience:", result)
        toast.error(result.error)
      } else {
        toast.success("Experience updated successfully")
        console.log("Experience updated successfully:", result)
      }
      router.push("/experience")
    } catch (error) {
      console.error("Error updating experience:", error)
    } finally {
      setIsLoading(false)
    }
    return
  }

  const updateField = (field: keyof Experience, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }))
  }

  const updateAchievement = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }))
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }))
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleSave = () => {
    // Filter out empty achievements
    const cleanedData = {
      ...formData,
      achievements: formData.achievements.filter((achievement) => achievement.trim() !== ""),
      technologies: formData.technologies.filter((tech) => tech.trim() !== ""),
      endDate: isCurrentRole ? null : formData.endDate
    }
    handleSaveExperience(cleanedData)
  }

  const isFormValid = formData.company && formData.position && formData.startDate

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          <div>
            <CardTitle>{mode === "add" ? "Add Work Experience" : "Edit Work Experience"}</CardTitle>
            <CardDescription>
              {mode === "add"
                ? "Add your professional work experience and achievements"
                : "Update your work experience details"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="e.g., Google, Microsoft, Startup Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => updateField("position", e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="e.g., San Francisco, CA or Remote"
              required={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {/* <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="day"
                value={formData.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              /> */}
              <DatePicker
                label="Start Date *"
                date={formData.startDate ? new Date(formData.startDate) : undefined}
                onDateChange={(newDate) => {
                  updateField("startDate", newDate ? newDate.toISOString().split("T")[0] : "")
                }}
              />
            </div>
            <div className="space-y-2">
              {/* <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="day"
                value={formData.endDate ? formData.endDate : ""}
                onChange={(e) => updateField("endDate", e.target.value)}
                disabled={isCurrentRole}
              /> */}
              <DatePicker
                label="End Date"
                date={formData.endDate ? new Date(formData.endDate) : undefined}
                onDateChange={(newDate) => {
                  updateField("endDate", newDate ? newDate.toISOString().split("T")[0] : "")
                }}
                disabled={isCurrentRole}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isCurrentRole"
              checked={isCurrentRole}
              onCheckedChange={(checked) => {
                // updateField("isCurrentRole", checked)
                setIsCurrentRole(Boolean(checked))
                if (checked) {
                  updateField("endDate", "")
                }
              }}
            />
            <Label htmlFor="isCurrentRole">I currently work here</Label>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Job Description</h3>
            <p className="text-sm text-muted-foreground">Provide a brief overview of your role and responsibilities.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description ? formData.description : ""}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe your role, responsibilities, and key contributions..."
              className="resize-none"
            />
          </div>
        </div>

        <Separator />

        {/* Achievements */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Key Achievements</h3>
            <p className="text-sm text-muted-foreground">List your major accomplishments and impact in this role.</p>
          </div>
          <div className="space-y-3">
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Textarea
                    rows={2}
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    placeholder="e.g., Increased team productivity by 40% through process optimization..."
                    className="resize-none"
                  />
                </div>
                {formData.achievements.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeAchievement(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addAchievement} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </div>
        </div>

        <Separator />

        {/* Technologies */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Technologies & Skills</h3>
            <p className="text-sm text-muted-foreground">
              Add the technologies, tools, and skills you used in this role.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="e.g., React, Node.js, AWS..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTechnology()
                  }
                }}
              />
              <Button type="button" onClick={addTechnology} disabled={!newTechnology.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleSave} disabled={!isFormValid || isLoading} className="flex-1 sm:flex-none">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : mode === "add" ? "Add Experience" : "Update Experience"}
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="flex-1 sm:flex-none">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
