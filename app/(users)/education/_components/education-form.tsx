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
import type { EducationSchemaType, EducationSchemaErrorType } from "@/schemas/education"
import { educationSchema } from "@/schemas/education"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { addEducation, updateEducation } from "@/app/(users)/education/actions"
import { toast } from "sonner"
import { redirect } from 'next/navigation'

interface EducationFormProps {
  initialData: EducationSchemaType
  mode: "add" | "edit"
}

export function EducationForm({
  initialData,
  mode
}: EducationFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(mode === 'add' ? addEducation : updateEducation, {
    data: {
      ...initialData
    },
    errors: { fieldErrors: [], formErrors: [] } as EducationSchemaErrorType,
    message: null
  })
  // console.log(state.errors)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWasSubmitted(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const validationResult = educationSchema.safeParse(data)
    if (!validationResult.success) {
      event.preventDefault()
    }
  }

  const [isCurrentEducation, setIsCurrentEducation] = useState(state.data?.endDate === null)

  if (state.message && !state.message?.success) {
    toast.error(state.message?.message)
  }

  if (state.message?.success && wasSubmitted) {
    toast.success(state.message?.message)
    setWasSubmitted(false)
    redirect('/education')
  }

  return (
    <Card className='gap-2'>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          <div>
            <CardTitle>{mode === "add" ? "Add Education" : "Edit Education"}</CardTitle>
            <CardDescription>
              {mode === "add"
                ? "Add your educational background and achievements"
                : "Update your educational details"}
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
                  isRequired={!(educationSchema.shape.company instanceof ZodOptional)}
                  fieldSchema={educationSchema.shape.company}
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
                  isRequired={!(educationSchema.shape.position instanceof ZodOptional)}
                  fieldSchema={educationSchema.shape.position}
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
                isRequired={!(educationSchema.shape.location instanceof ZodOptional)}
                fieldSchema={educationSchema.shape.location}
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
                  fieldSchema={educationSchema.shape.startDate}
                  wasSubmitted={wasSubmitted}
                  isRequired={true}
                  errors={state.errors?.fieldErrors.startDate}
                  className="w-fit"
                // disabled={isCurrentEducation}
                />

              </div>
              <div className="space-y-2">
                <ValidatedInput
                  id="endDate"
                  type='date'
                  name="endDate"
                  label="End Date"
                  defaultValue={state.data?.endDate}
                  fieldSchema={educationSchema.shape.endDate}
                  wasSubmitted={wasSubmitted}
                  isRequired={!isCurrentEducation}
                  errors={state.errors?.fieldErrors.endDate}
                  className="w-fit"
                  disabled={isCurrentEducation}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCurrentEducation"
                checked={isCurrentEducation}
                onCheckedChange={(checked) => {
                  // updateField("isCurrentEducation", checked)
                  setIsCurrentEducation(Boolean(checked))
                }}
              />
              <Label htmlFor="isCurrentEducation">I currently work here</Label>
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
                isRequired={!(educationSchema.shape.description instanceof ZodOptional)}
                fieldSchema={educationSchema.shape.description}
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

          {/* Honors */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Key Honors</h3>
              <p className="text-sm text-muted-foreground">List your major honors and recognitions in this role.</p>
            </div>
            <HonorsInput honorsString={state.data?.honors} />
          </div>

          <Separator />

          {/* Technologies */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Technologies & Skills</h3>
              <p className="text-sm text-muted-foreground">
                Add the onors, tools, and skills you used in this role.
              </p>
            </div>
            <div className="space-y-3">

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


const HonorsInput = ({ honorsString }: { honorsString: string | undefined }) => {
  // ==================== Honors
  const [honors, setHonors] = useState<string[]>(honorsString ? JSON.parse(honorsString) : [])
  const [newHonor, setNewHonor] = useState("")

  const addHonor = (honor: string) => {
    if (!honor.trim()) return
    if (honors.includes(honor.trim())) return
    setHonors((prev) => [...prev, honor])
    setNewHonor("")
  }

  const removeHonor = (index: number) => {
    setHonors(honors.filter((_, i) => i !== index))
  }
  return (
    <>
      <input name='honors' type='hidden' value={JSON.stringify(honors)} />
      <div className="flex gap-2">
        <Input
          value={newHonor}
          onChange={(e) => setNewHonor(e.target.value)}
          placeholder="e.g., React, Node.js, AWS..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addHonor(newHonor)
            }
          }}
        />
        <Button type="button" onClick={() => addHonor(newHonor)} disabled={!newHonor.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {honors.map((honor, index) => (
          <Badge key={honor} variant="secondary" className="flex items-center gap-1 py-1 pr-1">
            {honor}
            <ConfirmDialog
              title="Remove Honor"
              description={`Are you sure you want to remove "${honor}" honor? This action cannot be undone.`}
              confirmText="Remove"
              cancelText="Cancel"
              onConfirm={() => removeHonor(index)}
              variant="destructive"
            >
              <Button variant="ghost" size="icon" className="size-5 text-destructive hover:text-destructive">
                <X className="w-3 h-3" />
              </Button>
            </ConfirmDialog>
          </Badge>
        ))}
      </div>
    </>
  )
}