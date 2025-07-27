"use client"

import { z, ZodOptional } from 'zod/v4'
import { useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ValidatedInput, ValidatedTextarea } from "@/components/validated-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, X, Plus, Save, Trash2, CalendarIcon } from "lucide-react"
import type { ExperienceSchemaType, ExperienceSchemaErrorType } from "@/schemas/experience"
import { experienceSchema } from "@/schemas/experience"
import { DatePicker } from "@/components/date-picker"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { addExperience, updateExperience } from "@/app/(users)/experience/actions"
import { toast } from "sonner"
import { redirect } from 'next/navigation'

interface ExperienceFormProps {
  initialData: ExperienceSchemaType
  mode: "add" | "edit"
}

export function ExperienceForm({
  initialData,
  mode
}: ExperienceFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(mode === 'add' ? addExperience : updateExperience, {
    data: {
      ...initialData
    },
    errors: { fieldErrors: [], formErrors: [] } as ExperienceSchemaErrorType,
    message: null
  })
  // console.log(state.errors)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const validationResult = experienceSchema.safeParse(data)
    if (!validationResult.success) {
      event.preventDefault()
    }
  }

  const [isCurrentRole, setIsCurrentRole] = useState(state.data?.endDate === null)

  // =============== Achievements
  const [achievements, setAchievements] = useState<string[]>(initialData.achievements ? JSON.parse(initialData.achievements) : [])
  const [newAchievement, setNewAchievement] = useState("")


  

  const addAchievement = (achievement: string) => {
    if (!achievement.trim()) return
    if (achievements.includes(achievement.trim())) return
    setAchievements((prev) => [...prev, achievement])
    setNewAchievement("")
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }
  const updateAhievement = (index: number, value: string) => {
    const updatedAchievements = [...achievements]
    updatedAchievements[index] = value
    setAchievements(updatedAchievements)
  }

  // ==================== Technologies
  const [technologies, setTechnologies] = useState<string[]>(initialData.technologies ? JSON.parse(initialData.technologies) : [])
  const [newTechnology, setNewTechnology] = useState("")

  const addTechnology = (technology: string) => {
    if (!technology.trim()) return
    if (technologies.includes(technology.trim())) return
    setTechnologies((prev) => [...prev, technology])
    setNewTechnology("")
  }

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index))
  }


  if (state.message && !state.message?.success) {
    toast.error(state.message?.message)
  }

  if (state.message?.success && wasSubmitted) {
    toast.success(state.message?.message)
    setWasSubmitted(false)
    redirect('/experience')
  }

  return (
    <Card className='gap-2'>
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
      <CardContent className="">
        <form action={formAction} onSubmit={handleSubmit} noValidate className='space-y-6'>
          <input type="hidden" name="id" value={state.data?.id || ''} />
          <input type="hidden" name="userId" value={state.data?.userId || ''} />
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <ValidatedInput
                  id="company"
                  type='text'
                  name="company"
                  label="Company"
                  isRequired={!(experienceSchema.shape.company instanceof ZodOptional)}
                  fieldSchema={experienceSchema.shape.company}
                  wasSubmitted={wasSubmitted}
                  defaultValue={state.data?.company}
                  errors={state.errors?.fieldErrors.company}
                  placeholder="e.g., Google, Microsoft, Startup Inc."
                />
              </div>
              <div className="space-y-2">
                <ValidatedInput
                  id="position"
                  type='text'
                  name="position"
                  label="Position"
                  isRequired={!(experienceSchema.shape.position instanceof ZodOptional)}
                  fieldSchema={experienceSchema.shape.position}
                  wasSubmitted={wasSubmitted}
                  defaultValue={state.data?.position}
                  errors={state.errors?.fieldErrors.position}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <ValidatedInput
                id="location"
                type='text'
                name="location"
                label="Location"
                isRequired={!(experienceSchema.shape.location instanceof ZodOptional)}
                fieldSchema={experienceSchema.shape.location}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.location}
                errors={state.errors?.fieldErrors.location}
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <ValidatedInput
                  id="startDate"
                  type='date'
                  name="startDate"
                  label="Start Date"
                  defaultValue={state.data?.startDate}
                  fieldSchema={experienceSchema.shape.startDate}
                  wasSubmitted={wasSubmitted}
                  isRequired={true}
                  errors={state.errors?.fieldErrors.startDate}
                  className="w-fit"
                // disabled={isCurrentRole}
                />

              </div>
              <div className="space-y-2">
                <ValidatedInput
                  id="endDate"
                  type='date'
                  name="endDate"
                  label="End Date"
                  defaultValue={state.data?.endDate}
                  fieldSchema={experienceSchema.shape.endDate}
                  wasSubmitted={wasSubmitted}
                  isRequired={!isCurrentRole}
                  errors={state.errors?.fieldErrors.endDate}
                  className="w-fit"
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
              <ValidatedTextarea
                name='description'
                label='Description'
                type='text'
                isRequired={!(experienceSchema.shape.description instanceof ZodOptional)}
                fieldSchema={experienceSchema.shape.description}
                wasSubmitted={wasSubmitted}
                defaultValue={state.data?.description}
                errors={state.errors?.fieldErrors.description}
                placeholder="e.g., San Francisco, CA or Remote"
                rows={4}
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
            <input name='achievements' type='hidden' value={JSON.stringify(achievements)} />
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <Textarea
                  value={newAchievement}
                  onChange={(e) => {
                    setNewAchievement(e.target.value)
                  }}
                  placeholder="Add a new achievement..."
                  className="flex-1 min-h-[40px] resize-none overflow-hidden"
                />
                <Button type="button" size="sm" onClick={() => addAchievement(newAchievement)} disabled={!newAchievement.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className='space-y-2'>
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Textarea
                      value={achievement}
                      onChange={(e) => {
                        updateAhievement(index, e.target.value)
                      }}
                      className="flex-1 min-h-[40px] resize-none overflow-hidden"
                    />
                    <ConfirmDialog
                      title="Delete Achievement"
                      description="Are you sure you want to delete this achievement? This action cannot be undone."
                      confirmText="Delete"
                      cancelText="Cancel"
                      onConfirm={() => removeAchievement(index)}
                      variant="destructive"
                    >
                      <Button size="sm" variant="destructive" className="">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </ConfirmDialog>
                  </div>

                ))}
              </div>

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
              <input name='technologies' type='hidden' value={JSON.stringify(technologies)} />
              <div className="flex gap-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="e.g., React, Node.js, AWS..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTechnology(newTechnology)
                    }
                  }}
                />
                <Button type="button" onClick={() => addTechnology(newTechnology)} disabled={!newTechnology.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1 py-1 pr-1">
                    {tech}
                    <ConfirmDialog
                      title="Remove Technology"
                      description={`Are you sure you want to remove "${tech}" technology? This action cannot be undone.`}
                      confirmText="Remove"
                      cancelText="Cancel"
                      onConfirm={() => removeTechnology(index)}
                      variant="destructive"
                    >
                      <Button variant="ghost" size="icon" className="size-5 text-destructive hover:text-destructive">
                        <X className="w-3 h-3" />
                      </Button>
                    </ConfirmDialog>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {state.message && !state.message?.success && (
            <div className={"p-3 rounded-md text-sm bg-red-50 text-red-700 border border-red-200"}>
              {state.message?.message}
            </div>
          )}
          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button disabled={isPending} type='submit' className="flex-1 sm:flex-none text-white">
              <Save className="w-4 h-4" />
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

